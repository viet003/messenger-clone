import { NextResponse } from "next/server";
import { pusherServer } from '@/app/libs/pusher';
import prisma from "@/app/libs/prismadb";
import Botconfig from "@/app/users/components/Botconfig";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store the OpenAI API key in environment variables
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    // Gửi yêu cầu đến API của OpenAI
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Kiểm tra phản hồi từ OpenAI
    if (!gptResponse || !gptResponse.choices || gptResponse.choices.length === 0) {
      return new NextResponse('Invalid response from ChatGPT', { status: 500 });
    }

    const gptMessage = gptResponse.choices[0].message.content;

    // Lưu thông điệp của ChatGPT vào cơ sở dữ liệu
    const chatGptMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: gptMessage ? gptMessage : "",
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: Botconfig.id },
        },
        seen: {
          connect: {
            id: Botconfig.id,
          },
        },
      },
    });

    // Cập nhật cuộc trò chuyện
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: chatGptMessage.id, // Liên kết tin nhắn của ChatGPT
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Kích hoạt sự kiện tin nhắn mới cho cuộc trò chuyện
    await pusherServer.trigger(conversationId, 'messages:new', chatGptMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    // Thông báo cho tất cả người dùng trong cuộc trò chuyện
    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    // Trả về phản hồi với tin nhắn của ChatGPT
    return NextResponse.json(chatGptMessage);
  } catch (error) {
    console.log(error, 'ERROR_CHATGPT');
    return new NextResponse('Error', { status: 500 });
  }
}
