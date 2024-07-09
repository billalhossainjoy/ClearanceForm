import { Document, model, ObjectId, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AdminUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  role: "admin" | "staff";
  isActive: boolean;
  accessToken: string;
  isValidPassword(password: string): boolean;
  generateAccessToken(): string;
}

const adminSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

adminSchema.methods.isValidPassword = function (password: string) {
  return password === this.password;
};

adminSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiry,
  });
  this.accessToken = token;
  return token;
};

const Admin = model<AdminUser>("Admin", adminSchema);

export default Admin;
