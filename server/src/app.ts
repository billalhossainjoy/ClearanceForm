import express, { Express } from "express";
import studentRouter from "./router/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import Admin from "./models/adminModel";

const app: Express = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin === "https://clearance-form-client.vercel.app" || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("../src/public"));

app.use("/api", studentRouter);

export default app;
