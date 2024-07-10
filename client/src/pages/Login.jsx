import { ArrowRight } from "lucide-react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useForm } from "react-hook-form";

import gaiLogo from "../assets/gai.jpg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import ErrorBox from "../Components/ErrorBox";
import { config } from "../config/config";

const Login = () => {
  const { dispatch } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, [errors]);

  const submitHandler = async ({ email, password }) => {
    try {
      const res = await axios.post(`${config.server}/api/login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: res.data.data });
      navigator("/admin/dashboard/students");
    } catch (err) {
      console.log(err);
      setError(err);
      dispatch({ type: "LOGOUT" });
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <>
      <div className=" h-screen bg-white cursor-default selection:not-sr-only">
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-[400px] flex flex-col items-center h-[600px]"
          >
            <div className="flex flex-col items-center space-y-2 text-center gap-3 mb-8">
              <div className="h-28 w-28 text-primary text-green-500">
                <img className="w-full" src={gaiLogo} alt="" />
              </div>
              <h1 className="text-2xl font-bold ">Login Account</h1>
              <p className="flex items-center gap-2 text-sky-500">
                Login with email and password to go dashboard
                <ArrowRight className="w-4 h-4 " />
              </p>
            </div>
            <Input
              label="Email"
              error={errors?.email?.message}
              type="text"
              {...register("email", {
                required: "Please enter a valid email address",
                // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            <Input
              label="Password"
              error={errors?.password?.message}
              type="password"
              {...register("password", {
                required: "Please enter your password",
                minLength: 8,
              })}
            />
            {error && <ErrorBox>Invalid email or password.</ErrorBox>}
            <Button className="bg-sky-600">Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
