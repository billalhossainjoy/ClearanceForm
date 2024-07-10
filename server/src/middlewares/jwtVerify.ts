import { NextFunction, Request, Response } from "express";
import ErrorApi from "../util/ErrorApi";
import asycHandler from "../util/asycHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import Admin, { AdminUser } from "../models/adminModel";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: AdminUser | null;
    }
  }
}

const jwtVeriry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(token)
    if (!token) throw new ErrorApi(401, "Unauthorized");

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    if (!decoded) throw new ErrorApi(401, "Unauthorized user");

    const user = await Admin.findById(decoded._id);

    req.user = user;
    next();
  } catch (error) {
    console.log("jwt error");
    console.log(error);
  }
};

export default jwtVeriry;
