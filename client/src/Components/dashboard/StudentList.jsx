import { useContext, useEffect, useState } from "react";
import { cn } from "../../util/util";
import axios from "axios";
import { config } from "../../config/config";
import { AdminContext } from "../../Context/AdminContext";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useContext(AdminContext);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(config.server + "/api/student/getAllStudents", {
        withCredentials: true,
      })
      .then((res) => {
        setStudents(res.data.data);
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

  const formatTech = (name) => {
    return name?.split(" ")[0];
  };

  const styleTable = {
    tr: "text-left",
    th: "text-lg px-2 py-2", // Adding padding to th
    td: "px-2 py-2 ",
  };

  const deleteHandler = (Roll) => {
    axios
      .post(
        config.server + "/api/student/deleteStudent",
        {
          Roll,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        fetchData();
      });
  };
  const blockHandler = (Roll) => {
    axios
      .patch(
        config.server + "/api/student/blockStudent",
        {
          Roll,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        fetchData();
      });
  };

  return (
    <div className="flex flex-col h-full pb-5">
      <h1 className="text-4xl font-semibold w-full">Students List</h1>
      <div className="w-full bg-sky-50 rounded p-4 h-full">
        <div className="p-2 bg-white rounded h-full">
          <div className="hidden">
            <div>Show</div>
            <div>Search:</div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className={cn("border-b-2 border-black", styleTable.tr)}>
                  <th className={cn(styleTable.th)}>Name</th>
                  <th className={cn(styleTable.th)}>Technology</th>
                  <th className={cn(styleTable.th)}>Roll</th>
                  <th className={cn(styleTable.th, "hidden md:table-cell")}>
                    Registration
                  </th>
                  <th className={cn(styleTable.th)}>Shift</th>
                  <th className={cn(styleTable.th, "hidden md:table-cell")}>
                    Session
                  </th>
                  <th
                    className={cn(styleTable.th, "hidden md:table-cell", {
                      "md:hidden": state.user.role == "staff",
                    })}
                  >
                    Delete
                  </th>
                  <th className={cn(styleTable.th)}>Block</th>
                </tr>
              </thead>
              <tbody className="">
                {students?.map(
                  (student, index) =>
                    student.Active && (
                      <tr
                        key={index}
                        className={cn(
                          styleTable.tr,
                          "",
                          index % 2 === 0 ? "bg-sky-200 " : "bg-sky-50"
                        )}
                      >
                        <td className={cn(styleTable.td, "py-1.5 pl-1.5")}>
                          {student.Name}
                        </td>
                        <td className={cn(styleTable.td, "py-1.5 ")}>
                          {formatTech(student.Technology)}
                        </td>
                        <td className={cn(styleTable.td, "py-1.5 ")}>
                          {student.Roll}
                        </td>
                        <td
                          className={cn(
                            styleTable.td,
                            "py-1.5 hidden md:table-cell "
                          )}
                        >
                          {student.RegistrationNo}
                        </td>
                        <td className={cn(styleTable.td, "py-1.5 ")}>
                          {student.Shift}
                        </td>
                        <td
                          className={cn(
                            styleTable.td,
                            "py-1.5 hidden md:table-cell "
                          )}
                        >
                          {student.Session}
                        </td>
                        <td
                          className={cn(
                            styleTable.td,
                            "py-1.5 hidden md:table-cell",
                            { "md:hidden": state.user.role == "staff" }
                          )}
                        >
                          <button
                            onClick={() => deleteHandler(student.Roll)}
                            className="bg-red-600 rounded text-white py-1 px-2"
                          >
                            Delete
                          </button>
                        </td>
                        <td className={cn(styleTable.td, "py-1.5 ")}>
                          <button
                            onClick={() => blockHandler(student.Roll)}
                            className="bg-blue-600 rounded text-white py-1 px-2"
                          >
                            Block
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
