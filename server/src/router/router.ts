import { Router } from "express";
import {
  changePassword,
  createAdmin,
  deleteUser,
  getAccount,
  getAllAdmins,
  logout,
  userLogin,
} from "../controllers/adminController";
import asycHandler from "../util/asycHandler";
import Admin from "../models/adminModel";
import jwtVeriry from "../middlewares/jwtVerify";
import { addStudent, blockEntry, blockStudent, deleteStudent, getAllStudents, getStudent, unBlockStudent } from "../controllers/studentController";

const router = Router();

router.route("/login").post(userLogin);

router.route("/admin/user").post(jwtVeriry, createAdmin);
router.route("/admin/deleteUser/:id").delete(jwtVeriry, deleteUser);
router.route("/admin/get").get(jwtVeriry, getAccount);
router.route("/admin/logout").get(jwtVeriry, logout);
router.route("/admin/allAdmins").get(jwtVeriry, getAllAdmins);
router.route("/admin/changePass").post(jwtVeriry, changePassword);

router.route("/student/get").post(getStudent)

router.route("/student/newStudent").post(jwtVeriry, addStudent)
router.route("/student/deleteStudent").post(jwtVeriry, deleteStudent)
router.route("/student/blockStudent").patch(jwtVeriry, blockStudent)
router.route("/student/getAllStudents").get(jwtVeriry, getAllStudents);


router.route("/student/blockEntry").post(jwtVeriry,blockEntry)
router.route("/student/unBlockEntry").patch(jwtVeriry,unBlockStudent)

export default router;
