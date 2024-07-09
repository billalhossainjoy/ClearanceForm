/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import Form from "../Components/Form";
import Input from "../Components/Input";
import Select from "../Components/Select";
import { depertment } from "../Components/tableData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { cn } from "../util/util";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [fetched, setFetched] = useState({});
  const [download, setDownload] = useState(false);
  const { register, watch, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigator = useNavigate()

  const data = {
    name: watch("name"),
    technology: watch("tech"),
    Roll: watch("roll"),
    RegistrationNo: watch("reg"),
    Session: watch("session"),
    Shift: watch("shift"),
  };

  const handleReset = () => {
    console.log("test");
    reset();
  };

  useEffect(() => {
    try {
      if (data.Roll && data.Roll.length >= 6) {
        setLoading(true);
        axios
          .post(import.meta.env.VITE_SERVER + "/api/student/get", {
            Roll: data.Roll,
          })
          .then((res) => {
            setError(false);
            setFetched(res.data.data);
            setValue("name", res.data.data.Name);
            setValue("tech", res.data.data.Technology);
            setValue("reg", res.data.data.RegistrationNo);
            setValue("session", res.data.data.Session);
            setValue("shift", res.data.data.Shift);
            setDownload(true);
          })
          .catch((err) => {
            setError(err);
            setDownload(false);
            setLoading(false);
            setValue("name", "");
            setValue("tech", "");
            setValue("reg", "");
            setValue("session", "");
            setValue("shift", "");
          });
      } else {
        setDownload(false);
        setLoading(false);
        setFetched(null);
        setValue("name", "");
        setValue("tech", "");
        setValue("reg", "");
        setValue("session", "");
        setValue("shift", "");
      }
    } catch (error) {
      console.log(error);
    }
  }, [setValue, data.Roll, reset]);

  console.log(error?.response?.status);

  console.log(fetched)

  return (
    <div className="flex justify-center h-screen">
      {/* <Form info={info} depertment={depertment} /> */}
      <div className=" w-full bg-gray-200 h-full">
        <div className="">
          <h1 className="text-4xl p-2">Exemption Form </h1>
          <div></div>
        </div>
        <div className="h-[1px] bg-black"></div>
        <hr />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col mt-5 p-3"
        >
          <Input label={"Board Roll:"} {...register("roll")} />
          {error?.response?.status == 408 && (
            <p className="text-sm text-red-500">This roll number is blocked</p>
          )}
          {error?.response?.status == 404 && (
            <p className="text-sm text-blue-500">This roll number is not found</p>
          )}
          <Input label={"Registration No:"} {...register("reg")} />
          <Input label={"Name:"} {...register("name")} disabled={true} />
          <Select
            disabled={true}
            {...register("tech")}
            options={[
              "Computer Science and Technology",
              "Printing",
              "Graphic Design",
            ]}
            label={"Technology:"}
          />
          <Select
            disabled={true}
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
            disabled={true}
            {...register("shift")}
            options={["First", "Second"]}
            label={"Shift:"}
          />

          <div className="gap-4 flex py-4">
            {download ? (
              <PDFDownloadLink
                document={<Form depertment={depertment} info={fetched} />}
                fileName="GAI-form.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading document..."
                  ) : (
                    <p
                      className={cn(
                        "bg-white w-28 rounded py-1 text-sky-600 font-bold flex justify-center"
                      )}
                    >
                      Download
                    </p>
                  )
                }
              </PDFDownloadLink>
            ) : (
              <p
                className={cn(
                  " w-28 rounded py-1 font-bold flex justify-center bg-gray-100 text-blue-300 cursor-not-allowed"
                )}
              >
                Download
              </p>
            )}
            <button
              onClick={() => handleReset()}
              className="text-white w-28 rounded py-1 bg-sky-600 font-bold flex justify-center"
            >
              Reset
            </button>
            <button
              onClick={() => navigator('/admin/dashboard')}
              className="text-white w-28 rounded py-1 bg-sky-600 font-bold flex justify-center"
            >
              Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
