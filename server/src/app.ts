import express, { Express } from "express";
import studentRouter from "./router/router";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://clearance-form-client.vercel.app",
      "*"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("../src/public"));

app.use("/api", studentRouter);

export default app;
