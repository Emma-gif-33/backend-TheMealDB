import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mealRoutes from "./mealService/mealRoutes.js";
import searchRoutes from "./searchService/searchRoutes.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/meals', mealRoutes)
app.use('/api/search', searchRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});