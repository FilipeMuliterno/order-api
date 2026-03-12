import express from "express";
import { userRoutes } from "../infrastructure/http/routes/user.routes";
import { errorMiddleware } from "../infrastructure/http/middlewares/errorMiddleware";

export const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorMiddleware); //caso de erro cai nesse
