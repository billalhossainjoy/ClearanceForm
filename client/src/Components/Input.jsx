import { forwardRef } from "react";
import { cn } from "../util/util";

function Input({ label, className, type, error, ...props }, ref) {
  return (
    <div className="flex flex-col mb-2 w-full">
      {label && <label className=" text-sm font-semibold">{label}</label>}
      <input
        type={type}
        className={cn(
          "rounded py-1 px-2 w-full outline-none border border-gray-300", className,
          {"border-red-500": error}
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default forwardRef(Input);
