import type { Request, Response } from 'express';
import express from 'express';
import { migrateModel } from '../services/migrateModel.js';
import { createRoutes } from '../index.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import { loadModelFiles } from '../services/loadModels.js';

const prisma = new PrismaClient();

interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}


export const showModelsController = async (req: Request, res: Response) => {
    try {
        const modelFiles = loadModelFiles();
        let modelArray: { name: string, fields: Field[] }[] = [];
        modelFiles.forEach(model => modelArray.push({ name: model.name, fields: model.fields }));
        return res.status(200).json({ message: "Models fetched", models: modelArray });
    } catch (err) {
        console.error("Failed to fetch models:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const createModelController = async (req: Request, res: Response) => {
    try {
        const { model } = req.body;
        model.fields.push({ name: "id", type: "String", attributes: ["@unique", "@default(uuid())"] });
        let newModel: Model;
        if (typeof model !== 'object' || !model.name || !Array.isArray(model.fields)) {
            return res.status(400).json({ message: "Invalid model format" });

        }
        newModel = model as Model;
        await migrateModel(newModel);
        createRoutes();
        return res.status(200).json({ message: "Model received", model: newModel });

    }
    catch (err: any) {
        return res.status(400).json({ message: "Invalid model format", error: err.message });
    }



}