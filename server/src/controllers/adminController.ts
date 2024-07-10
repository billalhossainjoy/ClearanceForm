import { Request, Response } from "express";
import ErrorApi from "../util/ErrorApi";
import Admin from "../models/adminModel";
import ApiResponse from "../util/ApiResponse";
import asycHandler from "../util/asycHandler";

const options = {
  httpOnly: true,
  maxAge: 12 * 60 * 60 * 1000,
  sameSite: "none",
};

const createAdmin = asycHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if ([email, password, role].some((value) => value?.trim() == ""))
    throw new ErrorApi(409, "Email and password are required");

  const existingUser = await Admin.findOne({ email });
  if (existingUser) throw new ErrorApi(409, "Email already exists");

  const user = await Admin.create({
    email,
    password,
    role,
    isActive: true,
  });

  res
    .status(201)
    .json(new ApiResponse(201, user, "Admin created successfully"));
});

const userLogin = asycHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if ([email, password].some((value) => value.trim() == ""))
    throw new ErrorApi(409, "Email and password are required");

  const user = await Admin.findOne({ email });
  if (!user) throw new ErrorApi(401, "Invalid email or password.");

  const isMatch = user.isValidPassword(password);
  if (!isMatch) throw new ErrorApi(401, "Invalid email or password");

  const response = await Admin.findById(user._id).select("-_id -password");

  const token = user.generateAccessToken();

  res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
      secure:true,
      sameSite: "none",
    })
    .json(new ApiResponse(200, response, "logged in successfully"));
});

const logout = asycHandler((req, res) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, null, "logout success"));
});

const getAccount = asycHandler(async (req, res) => {
  const user = await Admin.findById(req.user?._id).select("-password");
  res.json(new ApiResponse(200, user, "User account details"));
});

const changePassword = asycHandler(async (req, res) => {
  const { oldPass, newPass } = req.body;
  const matched = req.user?.isValidPassword(oldPass);
  if (!matched) throw new ErrorApi(401, "Invalid old password");

  await req.user?.updateOne({ password: newPass });

  res
    .status(200)
    .json(new ApiResponse(200, null, "password changed successfully"));
});

const deleteUser = asycHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ErrorApi(409, "Email is required");
  const user = await Admin.findByIdAndDelete(id);
  if (!user) throw new ErrorApi(404, "User not found");
  res.json(new ApiResponse(200, user, "User deleted successfully"));
});

const getAllAdmins = asycHandler(async (req, res) => {
  const users = await Admin.find().select("-password");
  res.json(new ApiResponse(200, users, "All users get successfully"));
});

export {
  userLogin,
  createAdmin,
  changePassword,
  logout,
  getAccount,
  deleteUser,
  getAllAdmins,
};
