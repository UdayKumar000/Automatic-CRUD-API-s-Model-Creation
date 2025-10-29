import type { Response, Request, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const role = (req as any).userRole;
        if (role !== "admin") {
            return res.status(403).json({ error: "Forbidden: Admins only" });
        }
        return next();
    } catch (err: unknown) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
    }


}