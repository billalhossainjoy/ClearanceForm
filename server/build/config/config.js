"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    mongoUrl: String(process.env.mongoLink),
    dbName: process.env.dbName,
    PORT: process.env.PORT || 2000,
    jwtSecret: String(process.env.SECRET_KEY),
    jwtExpiry: process.env.JWT_EXPIRATION_TIME || "24h",
};
