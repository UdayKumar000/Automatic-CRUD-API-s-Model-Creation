// file handelling

import { addModelToSchema } from "./addModelToSchema.js";
import { exec } from 'child_process';
import { promisify } from "util";
import dotenv from 'dotenv';
dotenv.config();
import { createModelJson } from "./createModelJson.js";

const execAsync = promisify(exec);

interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}

export const migrateModel = async (newModel: Model) => {
    try {
        addModelToSchema(newModel);
        console.log('Running Prisma migration...');
        const { stdout, stderr } = await execAsync('npx prisma migrate dev --name add_' + newModel.name);
        createModelJson(newModel);
        console.log('Migration stdout:', stdout);
        console.error('Migration stderr:', stderr);
    }
    catch (err: any) {
        throw err;
    }
}