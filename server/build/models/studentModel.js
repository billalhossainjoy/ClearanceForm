"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    Technology: {
        type: String,
        required: true,
        trim: true,
    },
    Roll: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    RegistrationNo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    Session: {
        type: String,
        required: true,
        trim: true,
    },
    Shift: {
        type: String,
        required: true,
        trim: true,
    },
    Active: {
        type: Boolean,
        required: true,
    },
    BlockReason: {
        type: String,
        default: "not specified",
    }
}, {
    timestamps: true,
});
const Student = (0, mongoose_1.model)("Student", adminSchema);
exports.default = Student;
