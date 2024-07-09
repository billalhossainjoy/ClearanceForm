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
exports.getAllAdmins = exports.deleteUser = exports.getAccount = exports.logout = exports.changePassword = exports.createAdmin = exports.userLogin = void 0;
const ErrorApi_1 = __importDefault(require("../util/ErrorApi"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const ApiResponse_1 = __importDefault(require("../util/ApiResponse"));
const asycHandler_1 = __importDefault(require("../util/asycHandler"));
const options = {
    httpOnly: true,
    maxAge: 12 * 60 * 60 * 1000,
    secure: true,
};
const createAdmin = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if ([email, password, role].some((value) => (value === null || value === void 0 ? void 0 : value.trim()) == ""))
        throw new ErrorApi_1.default(409, "Email and password are required");
    const existingUser = yield adminModel_1.default.findOne({ email });
    if (existingUser)
        throw new ErrorApi_1.default(409, "Email already exists");
    const user = yield adminModel_1.default.create({
        email,
        password,
        role,
        isActive: true,
    });
    res
        .status(201)
        .json(new ApiResponse_1.default(201, user, "Admin created successfully"));
}));
exports.createAdmin = createAdmin;
const userLogin = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if ([email, password].some((value) => value.trim() == ""))
        throw new ErrorApi_1.default(409, "Email and password are required");
    const user = yield adminModel_1.default.findOne({ email });
    if (!user)
        throw new ErrorApi_1.default(401, "Invalid email or password.");
    const isMatch = user.isValidPassword(password);
    if (!isMatch)
        throw new ErrorApi_1.default(401, "Invalid email or password");
    const response = yield adminModel_1.default.findById(user._id).select("-_id -password");
    const token = user.generateAccessToken();
    res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse_1.default(200, response, "logged in successfully"));
}));
exports.userLogin = userLogin;
const logout = (0, asycHandler_1.default)((req, res) => {
    res
        .status(200)
        .clearCookie("accessToken")
        .json(new ApiResponse_1.default(200, null, "logout success"));
});
exports.logout = logout;
const getAccount = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield adminModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password");
    res.json(new ApiResponse_1.default(200, user, "User account details"));
}));
exports.getAccount = getAccount;
const changePassword = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { oldPass, newPass } = req.body;
    const matched = (_a = req.user) === null || _a === void 0 ? void 0 : _a.isValidPassword(oldPass);
    if (!matched)
        throw new ErrorApi_1.default(401, "Invalid old password");
    yield ((_b = req.user) === null || _b === void 0 ? void 0 : _b.updateOne({ password: newPass }));
    res
        .status(200)
        .json(new ApiResponse_1.default(200, null, "password changed successfully"));
}));
exports.changePassword = changePassword;
const deleteUser = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new ErrorApi_1.default(409, "Email is required");
    const user = yield adminModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new ErrorApi_1.default(404, "User not found");
    res.json(new ApiResponse_1.default(200, user, "User deleted successfully"));
}));
exports.deleteUser = deleteUser;
const getAllAdmins = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield adminModel_1.default.find().select("-password");
    res.json(new ApiResponse_1.default(200, users, "All users get successfully"));
}));
exports.getAllAdmins = getAllAdmins;
