import { model, Schema } from "mongoose";

interface UserData {
  Name: string;
  Technology: string;
  Roll: string;
  RegistrationNo: string;
  Session: string;
  Shift: string;
  Active?: boolean;
}

const adminSchema = new Schema(
  {
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
      index:true,
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
  },
  {
    timestamps: true,
  }
);

const Student = model<UserData>("Student", adminSchema);

export default Student;
