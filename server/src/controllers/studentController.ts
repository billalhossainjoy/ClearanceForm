import Student from "../models/studentModel";
import ApiResponse from "../util/ApiResponse";
import asycHandler from "../util/asycHandler";
import ErrorApi from "../util/ErrorApi";

interface StudentData {
  Name: string;
  Technology: string;
  Roll: string;
  RegistrationNo: string;
  Session: string;
  Semester: string;
  Shift: string;
  Active?: boolean;
}

const addStudent = asycHandler(async (req, res) => {
  const {
    Name,
    Technology,
    Roll,
    RegistrationNo,
    Session,
    Shift,
    Active,
    Reason,
  } = req.body;
  if (
    [Name, Technology, Roll, RegistrationNo, Session, Shift,Reason].some(
      (value) => value?.trim() == ""
    )
  )
    throw new ErrorApi(409, "All fields must be required");
  
  const existingStudent = await Student.findOne({ Roll });
  if (existingStudent) throw new ErrorApi(409, "Student already exists in database");

  const stu = await Student.create({
    Name,
    Technology,
    Roll,
    RegistrationNo,
    Session,
    Shift,
    Active,
    BlockReason: Reason,
  });

  if (!stu) throw new ErrorApi(404, "Student already exists in database");

  res.status(200).json(new ApiResponse(200, stu, "Student added successfully"));
});

const blockStudent = asycHandler(async (req, res) => {
  const { Roll } = req.body;
  if (!Roll) throw new ErrorApi(409, "Roll number is required");
  const user = await Student.findOneAndUpdate(
    { Roll },
    { $set: { Active: false } },
    { new: true }
  );
  if (!user) throw new ErrorApi(404, "Student not found in database");
  res
    .status(200)
    .json(new ApiResponse(200, user, "Student blocked successfully"));
});

const blockEntry = asycHandler(async (req, res) => {
  const {
    Name,
    Technology,
    Roll,
    RegistrationNo,
    Session,
    Shift,
    BlockReason,
  } = req.body;
  if (
    [Name, Technology, Roll, RegistrationNo, Session, Shift, BlockReason].some(
      (value) => value.trim() == ""
    )
  )
    throw new ErrorApi(409, "All fields must be required");

  const stu = await Student.create({
    Name,
    Technology,
    Roll,
    RegistrationNo,
    Session,
    Shift,
    Active: false,
    BlockReason,
  });

  if (!stu) throw new ErrorApi(404, "Student already exists in database");

  res.status(200).json(new ApiResponse(200, stu, "Student added successfully"));
});

const unBlockStudent = asycHandler(async (req, res) => {
  const { Roll } = req.body;
  if (!Roll) throw new ErrorApi(409, "Roll number is required");
  const user = await Student.findOneAndUpdate(
    { Roll },
    { $set: { Active: true } },
    { new: true }
  );
  if (!user) throw new ErrorApi(404, "Student not found in database");
  res
    .status(200)
    .json(new ApiResponse(200, user, "Student unblocked successfully"));
});

const deleteStudent = asycHandler(async (req, res) => {
  const { Roll } = req.body;
  if (!Roll) throw new ErrorApi(409, "Roll number is required");
  const user = await Student.findOneAndDelete({ Roll });
  if (!user) throw new ErrorApi(404, "Student not found in database");
  res
    .status(200)
    .json(new ApiResponse(200, user, "Student deleted successfully"));
});

const getStudent = asycHandler(async (req, res) => {
  const { Roll } = req.body;
  if (!Roll) throw new ErrorApi(409, "Roll number is required");
  const user = await Student.findOne({ Roll });
  if (!user) throw new ErrorApi(404, "Student not found in database");
  
  if (user.Active == false) throw new ErrorApi(408, "Student is blocked");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Student fetched successfully"));
});

const getAllStudents = asycHandler(async (req, res) => {
  const students = await Student.find();
  res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});

export {
  addStudent,
  deleteStudent,
  blockStudent,
  blockEntry,
  unBlockStudent,
  getStudent,
  getAllStudents,
};
