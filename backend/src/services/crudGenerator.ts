// crudGenerator.ts
import express from "express";
// import type { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaClient } from '../../generated/prisma/client.js';

const prisma = new PrismaClient();
export function generateCrudRouter(modelName: string) {
    const router = express.Router();
    const table = modelName.toLowerCase(); // Prisma model name

    // helper to safely extract message from an unknown error
    function getErrorMessage(err: unknown): string {
        if (err instanceof Error) return err.message;
        try {
            return JSON.stringify(err);
        } catch {
            return String(err);
        }
    }

    // helper to access a model client from Prisma safely while satisfying TS
    function getModelClient(tableName: string): any {
        // PrismaClient does not expose an index signature, so narrow via `any`.
        const model = (prisma as any)[tableName];
        if (!model) throw new Error(`Prisma model '${tableName}' not found`);
        return model;
    }

    // CREATE
    router.post("/", async (req, res) => {
        try {
            const result = await getModelClient(table).create({ data: req.body });
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: getErrorMessage(err) });
        }
    });

    // READ all
    router.get("/", async (req, res) => {
        try {
            const result = await getModelClient(table).findMany();
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: getErrorMessage(err) });
        }
    });

    // READ one
    router.get("/:id", async (req, res) => {
        try {
            const result = await getModelClient(table).findUnique({
                where: { id: String(req.params.id) },
            });
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: getErrorMessage(err) });
        }
    });

    // UPDATE
    router.put("/:id", async (req, res) => {
        try {
            const result = await getModelClient(table).update({
                where: { id: String(req.params.id) },
                data: req.body,
            });
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: getErrorMessage(err) });
        }
    });

    // DELETE
    router.delete("/:id", async (req, res) => {
        try {
            await getModelClient(table).delete({
                where: { id: String(req.params.id) },
            });
            res.json({ message: `${modelName} deleted successfully` });
        } catch (err) {
            res.status(400).json({ error: getErrorMessage(err) });
        }
    });

    return router;
}
