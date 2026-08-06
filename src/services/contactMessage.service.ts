import { EMAIL_USER } from "../config/envs";
import transporter from "../config/nodemailer";
import { ContactMessageDto } from "../dto/contactMessage.dto";
import { ContactMessage } from "../entities/ContactMessage";
import redisClient from "../config/redisClient";
import ContactMessageRepository from "../repositories/contactMessage.repository";

export const getContactMessagesService = async (): Promise<ContactMessage[]> => {
    try {
        const contactMessages = await ContactMessageRepository.find();
        return contactMessages;
    } catch (error) {
        console.error("Error getting contact messages:", error);
        throw new Error("Unable to retrieve contact messages.");
    }
};

const isRateLimited = async (userIp: string): Promise<boolean> => {
    try {
        const messageCountKey = `contact_messages:${userIp}`;
        const currentCount = await redisClient.incr(messageCountKey);

        if (currentCount === 1) {
            await redisClient.expire(messageCountKey, 3600);
        }

        return currentCount > 3;
    } catch (error) {
        console.error("Error checking contact message rate limit, allowing message through:", error);
        return false;
    }
};

export const createContactMessageService = async (
    messageData: ContactMessageDto,
    userIp: string
): Promise<ContactMessage | null> => {
    if (await isRateLimited(userIp)) {
        return null;
    }

    try {
        const contactMessage = ContactMessageRepository.create(messageData);
        const result = await ContactMessageRepository.save(contactMessage);
        await transporter.sendMail({
            from: EMAIL_USER,
            to: EMAIL_USER,
            subject: "Nuevo mensaje de contacto recibido",
            text: `Has recibido un nuevo mensaje de contacto:\n\nNombre: ${messageData.name}\nEmail: ${messageData.email}\nMensaje: ${messageData.message}`,
        });

        return result;
    } catch (error) {
        console.error("Error creating contact message:", error);
        throw new Error("Unable to create contact message.");
    }
};
