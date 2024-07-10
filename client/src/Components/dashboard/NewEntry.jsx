import { useForm } from "react-hook-form";
import { cn } from "../../util/util";
import Input from "../Input";
import Select from "../Select";
import Wrapper from "../Wrapper";
import axios from "axios";
import { config } from "../../config/config";

const NewEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ roll, reg, name, tech, session, shift, active }) => {
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
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <Wrapper title={"Add Student:"}>
        <div>
          <div>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col mt-5 p-3"
            >
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
              <select
                {...register("active")}
                className=" outline-none border p-1 rounded mt-2 border-gray-300"
              >
                <option value="true">Active</option>
                <option value="false">Block</option>
              </select>
              <div className="gap-4 flex py-4">
                <button className="text-white w-28 rounded py-1 bg-sky-600 font-bold flex justify-center">
                  Submit
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
