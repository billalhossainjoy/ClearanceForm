/* eslint-disable react/prop-types */

import { cn } from "../util/util";

const Wrapper = ({ children, title, className }) => {
  return (
    <div className="">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      <div className={cn("border p-10 rounded-lg border-sky-500", className)}>{children}</div>
    </div>
  );
};

export default Wrapper;
