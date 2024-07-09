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
exports.getAllStudents = exports.getStudent = exports.unBlockStudent = exports.blockEntry = exports.blockStudent = exports.deleteStudent = exports.addStudent = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const ApiResponse_1 = __importDefault(require("../util/ApiResponse"));
const asycHandler_1 = __importDefault(require("../util/asycHandler"));
const ErrorApi_1 = __importDefault(require("../util/ErrorApi"));
const addStudent = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Technology, Roll, RegistrationNo, Session, Shift, Active, Reason, } = req.body;
    if ([Name, Technology, Roll, RegistrationNo, Session, Shift].some((value) => value.trim() == ""))
        throw new ErrorApi_1.default(409, "All fields must be required");
    const stu = yield studentModel_1.default.create({
        Name,
        Technology,
        Roll,
        RegistrationNo,
        Session,
        Shift,
        Active,
        BlockReason: Reason,
    });
    if (!stu)
        throw new ErrorApi_1.default(404, "Student already exists in database");
    res.status(200).json(new ApiResponse_1.default(200, stu, "Student added successfully"));
}));
exports.addStudent = addStudent;
const blockStudent = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Roll } = req.body;
    if (!Roll)
        throw new ErrorApi_1.default(409, "Roll number is required");
    const user = yield studentModel_1.default.findOneAndUpdate({ Roll }, { $set: { Active: false } }, { new: true });
    if (!user)
        throw new ErrorApi_1.default(404, "Student not found in database");
    res
        .status(200)
        .json(new ApiResponse_1.default(200, user, "Student blocked successfully"));
}));
exports.blockStudent = blockStudent;
const blockEntry = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Technology, Roll, RegistrationNo, Session, Shift, BlockReason, } = req.body;
    if ([Name, Technology, Roll, RegistrationNo, Session, Shift, BlockReason].some((value) => value.trim() == ""))
        throw new ErrorApi_1.default(409, "All fields must be required");
    const stu = yield studentModel_1.default.create({
        Name,
        Technology,
        Roll,
        RegistrationNo,
        Session,
        Shift,
        Active: false,
        BlockReason,
    });
    if (!stu)
        throw new ErrorApi_1.default(404, "Student already exists in database");
    res.status(200).json(new ApiResponse_1.default(200, stu, "Student added successfully"));
}));
exports.blockEntry = blockEntry;
const unBlockStudent = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Roll } = req.body;
    if (!Roll)
        throw new ErrorApi_1.default(409, "Roll number is required");
    const user = yield studentModel_1.default.findOneAndUpdate({ Roll }, { $set: { Active: true } }, { new: true });
    if (!user)
        throw new ErrorApi_1.default(404, "Student not found in database");
    res
        .status(200)
        .json(new ApiResponse_1.default(200, user, "Student unblocked successfully"));
}));
exports.unBlockStudent = unBlockStudent;
const deleteStudent = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Roll } = req.body;
    if (!Roll)
        throw new ErrorApi_1.default(409, "Roll number is required");
    const user = yield studentModel_1.default.findOneAndDelete({ Roll });
    if (!user)
        throw new ErrorApi_1.default(404, "Student not found in database");
    res
        .status(200)
        .json(new ApiResponse_1.default(200, user, "Student deleted successfully"));
}));
exports.deleteStudent = deleteStudent;
const getStudent = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Roll } = req.body;
    if (!Roll)
        throw new ErrorApi_1.default(409, "Roll number is required");
    const user = yield studentModel_1.default.findOne({ Roll });
    if (!user)
        throw new ErrorApi_1.default(404, "Student not found in database");
    res
        .status(200)
        .json(new ApiResponse_1.default(200, user, "Student fetched successfully"));
}));
exports.getStudent = getStudent;
const getAllStudents = (0, asycHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield studentModel_1.default.find();
    res
        .status(200)
        .json(new ApiResponse_1.default(200, students, "Students fetched successfully"));
}));
exports.getAllStudents = getAllStudents;
