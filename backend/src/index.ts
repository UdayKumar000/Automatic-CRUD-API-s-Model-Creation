import express from "express";
import type { Request, Response, Express, Router } from "express";
import modelRoutes from './routes/modelRoutes.js';
import cors from 'cors';
import { loadModelFiles } from "./services/loadModels.js";
import { generateCrudRouter } from "./services/crudGenerator.js";
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js';
dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export function createRoutes() {
  const models = loadModelFiles();
  models.forEach(model => {
    const routePath = `/api/${model.name.toLowerCase()}`;
    app.use(routePath, generateCrudRouter(model.name));
    console.log(`✅ Registered ${routePath}`);
  });
}

createRoutes();

app.use('/user', userRouter);
app.use('/', modelRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Server running successfully!");
});

const PORT = 3000;


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
