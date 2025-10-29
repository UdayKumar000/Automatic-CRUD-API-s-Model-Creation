// loadModels.ts
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export function loadModelFiles(): any[] {
    const modelsDir = path.join(__dirname, "../models");
    if (!fs.existsSync(modelsDir)) return [];

    const modelFiles = fs.readdirSync(modelsDir);
    return modelFiles.map(file => {
        const raw = fs.readFileSync(path.join(modelsDir, file), "utf-8");
        return JSON.parse(raw);
    });
}
