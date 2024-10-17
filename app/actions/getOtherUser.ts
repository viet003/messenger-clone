import prisma from "@/app/libs/prismadb";

const getOtherUser = async (conversationId: any) => {
    try {
        const conversationWithUsers = await prisma.conversation.findUnique({
            where: {
                id: conversationId as string,  // Tìm dựa trên conversationId
            },
            include: {
                users: true,  // Bao gồm toàn bộ người dùng trong cuộc trò chuyện này
            }
        });

        console.log(conversationWithUsers)

        return conversationWithUsers?.users;
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

export default getOtherUser;
