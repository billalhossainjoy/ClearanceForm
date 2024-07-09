import dotenv from "dotenv"
dotenv.config();

export const config = {
  mongoUrl: String(process.env.mongoLink),
  dbName: process.env.dbName,
  PORT: process.env.PORT,
  jwtSecret: String(process.env.SECRET_KEY),
  jwtExpiry: process.env.JWT_EXPIRATION_TIME || "24h",
};

