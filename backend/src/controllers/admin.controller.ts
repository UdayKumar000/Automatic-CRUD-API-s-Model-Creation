import type { Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma/client.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const prisma = new PrismaClient();

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await prisma.admin.create({ data: { ...req.body, password: hashedPassword } });
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }

}

export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin.id, role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}
