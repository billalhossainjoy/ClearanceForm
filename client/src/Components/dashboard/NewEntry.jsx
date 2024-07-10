import { useForm } from "react-hook-form";
import { cn } from "../../util/util";
import Input from "../Input";
import Select from "../Select";
import Wrapper from "../Wrapper";
import axios from "axios";
import { config } from "../../config/config";
import { useContext, useState } from "react";
import ErrorBox from "./../ErrorBox";
import { AdminContext } from "../../Context/AdminContext";
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
  const { state } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    roll,
    reg,
    name,
    tech,
    session,
    shift,
    active,
    Reason,
  }) => {
    setLoading(true);
    axios
      .post(
        config.server + "/api/student/newStudent",
        {
          Name: name,
          Technology: tech,
          Roll: roll,
          RegistrationNo: reg,
          Session: session,
          Shift: shift,
          Active: active,
          Reason: Reason,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setData([...data, res.data]);
        setValue("name", "");
        setValue("roll", "");
        setValue("reg", "");
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch((err) => {
        setError(err);
        setInterval(() => {
          setError(null);
        }, 3000);
        setLoading(false);
        console.log(err);
      });
  };
  if (state.user.role == "staff") {
    return (
      <Wrapper>
        <div>Only access for admin</div>
      </Wrapper>
    );
  }

  return (
    <div>
      <Wrapper title={"Add Student:"}>
        <div>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col mt-5 p-3"
            >
              {error?.response?.status === 409 && (
                <ErrorBox>This student already exists.</ErrorBox>
              )}
              {error && <ErrorBox>Invalid.</ErrorBox>}
              {success && (
                <div className="text-green-600 text-center bg-green-50 p-4 rounded">
                  Student added successfully!
                </div>
              )}
              <Input
                error={errors?.name?.message}
                label={"Name:"}
                {...register("name", {
                  required: "required",
                })}
              />
              <Input
                error={errors?.roll?.message}
                label={"Board Roll:"}
                {...register("roll", {
                  minLength: 6,
                  required: "required",
                })}
              />
              <Input
                error={errors?.reg?.message}
                label={"Registration No:"}
                {...register("reg", {
                  required: "required",
                })}
              />
              <Select
                {...register("tech")}
                options={[
                  "Computer Science and Technology",
                  "Printing",
                  "Graphic Design",
                ]}
                label={"Technology:"}
              />
              <Select
                {...register("session")}
                options={[
                  "2020-2021",
                  "2021-2022",
                  "2022-2023",
                  "2023-2024",
                  "2025-2026",
                  "2027-2027",
                  "2028-2029",
                ]}
                label={"Session:"}
              />
              <Select
                {...register("shift")}
                options={["First", "Second"]}
                label={"Shift:"}
              />
              <label className="text-gray-600 mt-2">Active Status:</label>
              <div className="flex gap-4 ">
                <select
                  {...register("active")}
                  className=" outline-none border px-4 rounded border-gray-300 py-2"
                >
                  <option value="true">Active</option>
                  <option value="false">Block</option>
                </select>
                {watch("active") == "false" && (
                  <input
                    className="border rounded w-full outline-none px-3 border-gray-300"
                    {...register("Reason")}
                  />
                )}
              </div>
              <div className="gap-4 flex py-4">
                <button
                  className={cn(
                    "text-white w-28 rounded py-1 bg-sky-600 font-bold flex justify-center",
                    { "bg-gray-400": loading }
                  )}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default NewEntry;
