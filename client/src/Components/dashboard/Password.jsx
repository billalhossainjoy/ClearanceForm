import { useForm } from "react-hook-form";
import Button from "../Button";
import Wrapper from "../Wrapper";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircleAlertIcon } from "lucide-react";
import { config } from "../../config/config";

const Password = () => {
  const navigator = useNavigate();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ oldPassword, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios
      .post(config.server + "/api/admin/changePass", {
        oldPass: oldPassword,
        newPass: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) navigator("/admin/dashboard");
      })
      .catch((err) => {
        setError(err.response.status);
        console.log(err);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };
  return (
    <>
      <div>
        <Wrapper title={"Change password"}>
          <div className="gap-5 w-full lg:w-[50%]">
            {/* Add form for changing password */}
            {error === 401 && (
              <div className="bg-red-500 w-full p-3 rounded flex justify-between mb-3">
                <p className="text-white text-sm">
                  Old password is not matched
                </p>
                <p className="text-white ">
                  <CircleAlertIcon />
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className=" flex flex-col gap-2">
                <div className="flex justify-between ">
                  <label>Current password:</label>
                  <div>
                    <input
                      type="password"
                      className=" bg-gray-100 rounded py-1 px-2 outline-none"
                      {...register("oldPassword", {
                        required: "old password must be at least 8 characters",
                        minLength: 8,
                      })}
                    />
                    {errors?.oldPassword && (
                      <p className=" text-red-500 text-sm">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between ">
                  <label>New password:</label>
                  <div className="">
                    <input
                      type="password"
                      className=" bg-gray-100 rounded py-1 px-2 outline-none"
                      {...register("password", {
                        required: "new password must be at least 8 characters",
                        minLength: 8,
                      })}
                    />
                    {errors?.password && (
                      <p className=" text-red-500 text-sm">
                        {errors?.password?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between ">
                  <label>Confirm new password:</label>
                  <div>
                    <input
                      type="password"
                      className=" bg-gray-100 rounded py-1 px-2 outline-none"
                      {...register("confirmPassword", {
                        required: "comform password required",
                        validate: (value) =>
                          value == watch("password") || "Password not matched",
                      })}
                    />
                    {errors?.confirmPassword && (
                      <p className=" text-red-500 text-sm">
                        {errors?.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  className="w-20"
                  type="submit"
                  disable={!watch("password")}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Password;
