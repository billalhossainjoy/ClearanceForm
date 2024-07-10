import { useForm } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Wrapper from "../Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "../../util/util";
import { config } from "../../config/config";

const Accounts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(config.server + "/api/admin/allAdmins", {
        withCredentials: true,
      })
      .then((res) => {
        setAdmins(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = ({ email, role }) => {
    axios
      .post(
        config.server + "/api/admin/user",
        {
          email: email.toLowerCase(),
          password: email,
          role,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setError(null);
        fetchData();
      })
      .catch((err) => setError(err.response.status));
  };

  const deleteUserHandler = (email) => {
    axios
      .delete(config.server + "/api/admin/deleteUser/" + email, {
        withCredentials: true,
      })
      .then((res) => {
        fetchData();
      });
  };

  return (
    <>
      <div>
        <Wrapper title={"Add User"}>
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col gap-2">
                <label htmlFor="Role" className=" text-sm font-semibold">
                  Type admin or staff email addres
                </label>
                <div className="flex items-center gap-2 outline-none ">
                  <input
                    label=""
                    className=" bg-gray-100 p-2 rounded w-full outline-none"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <select
                    name="Role"
                    id=""
                    className="bg-gray-200 rounded p-2.5 h-full"
                    {...register("role")}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <p className="text-sm text-red-500">{errors?.email?.message}</p>
                {error == 409 && (
                  <p className="text-sm text-red-500">Email already exists</p>
                )}
                <div className="flex justify-start">
                  <Button className="inline-block w-20">Add</Button>
                </div>
              </div>
            </form>
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              <div className="flex flex-col gap-5">
                <h1 className="font-semibold text-lg border-b">
                  Current admins and staffs
                </h1>
                <div className="flex flex-col gap-2 justify-center">
                  {admins?.map((admin, index) => (
                    <div
                      key={index}
                      className={cn(
                        "px-2 py-1 rounded",
                        index % 2 == 0 ? "bg-sky-100" : ""
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          {admin.email} ({admin.role})
                        </p>
                        <div>
                          <Button
                            onClick={() => deleteUserHandler(admin._id)}
                            className="inline-block w-20 bg-red-500"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Accounts;
