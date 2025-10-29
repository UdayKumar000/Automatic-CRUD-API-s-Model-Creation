import type { Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma/client.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await prisma.user.create({ data: { ...req.body, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() } });
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }

}

export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}
