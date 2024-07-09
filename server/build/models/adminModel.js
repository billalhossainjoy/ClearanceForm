"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
adminSchema.methods.isValidPassword = function (password) {
    return password === this.password;
};
adminSchema.methods.generateAccessToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id, role: this.role }, config_1.config.jwtSecret, {
        expiresIn: config_1.config.jwtExpiry,
    });
    this.accessToken = token;
    return token;
};
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
