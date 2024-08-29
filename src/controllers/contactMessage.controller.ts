import { Request, Response } from "express";
import { getContactMessagesService, createContactMessageService } from "../services/contactMessage.service";
import { ContactMessage } from "../entities/ContactMessage";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages: ContactMessage[] = await getContactMessagesService();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ message: "Error retrieving messages", error });
    }
};

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body;
        const newMessage: ContactMessage = await createContactMessageService({ name, email, message });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Error creating message", error });
    }
};
