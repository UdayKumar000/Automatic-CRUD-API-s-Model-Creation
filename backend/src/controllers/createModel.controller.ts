import type { Request, Response } from 'express';
import express from 'express';
import { migrateModel } from '../services/migrateModel.js';
import { createRoutes } from '../index.js';
import { error } from 'console';



interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}


export const createModelController = async (req: Request, res: Response) => {
    try {
        const { model } = req.body;
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