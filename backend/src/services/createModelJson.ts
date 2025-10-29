import fs from 'fs';
import path from 'path';
import { json } from 'stream/consumers';

const __dirname = path.resolve();

interface Field {
    name: string;
    type: string;
    attributes?: string[] | [""];
}

interface Model {
    name: string;
    fields: Field[];
}


export const createModelJson = (newModel: Model) => {
    try {

        const modelJsonPath = path.join(__dirname, '../models');
        console.log(modelJsonPath)
        if (!fs.existsSync(modelJsonPath)) {
            fs.mkdirSync(modelJsonPath);
        }
        console.log(newModel.fields)
        const jsonFile = {
            name: newModel.name,
            fields: newModel.fields.map(field => ({ name: field.name, type: field.type })),
            ownerField: "",
            rbac: { Admin: ["all"], Manager: ["create", "read", "update"], Viewer: ["read"] }
        };

        const modelJsonFilePath = path.join(modelJsonPath, `${newModel.name.toLowerCase()}.json`);
        fs.writeFileSync(modelJsonFilePath, JSON.stringify(jsonFile, null, 2));
        console.log(`Model JSON file created at: ${modelJsonFilePath}`);
    }
    catch (error) {
        throw error
    }
}