import prisma from "@/app/libs/prismadb";

async function getAllUserGroup(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true, // This will retrieve all users in the conversation
      },
    });
  
    if (!conversation) {
      throw new Error('Conversation not found');
    }
  
    return conversation.users;
  }

export default getAllUserGroup
