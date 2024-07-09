"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorApi_1 = __importDefault(require("../util/ErrorApi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const adminModel_1 = __importDefault(require("../models/adminModel"));
const jwtVeriry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token)
            throw new ErrorApi_1.default(401, "Unauthorized");
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        if (!decoded)
            throw new ErrorApi_1.default(401, "Unauthorized user");
        const user = yield adminModel_1.default.findById(decoded._id);
        req.user = user;
        next();
    }
    catch (error) {
        console.log("jwt error");
        console.log(error);
    }
});
exports.default = jwtVeriry;
