import type { Response, Request, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token: string = authHeader.split(" ")[1]!;

    const secret: string = process.env.JWT_SECRET!;

    try {
        const { role, id } = jwt.verify(token, secret) as { role: string; id: number };
        (req as any).userId = id;
        (req as any).userRole = role;
        return next();
    } catch (err: unknown) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
    }


}