// file handling
import fs from 'fs';
import path from 'path';
import { generateModel } from './generateModel.js';

import { fileURLToPath } from 'url';

// 🔧 ESM equivalent of __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}

const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');

export const addModelToSchema = (newModel: Model) => {
    const modelString = generateModel(newModel);
    try {
        let schema = fs.readFileSync(schemaPath, 'utf-8');
        const pattern = new RegExp(`model\\s+${newModel.name}`, 'i'); // "i" = case insensitive
        if (pattern.test(schema)) {
            throw new Error(`Model with name ${newModel.name} already exists in schema.`);
        }
        schema += `\n\n${modelString}`;
        fs.writeFileSync(schemaPath, schema, 'utf-8');
        console.log(schema)
    }
    catch (err) {
        throw err;
    }
}