import { cn } from "../util/util";

const Button = ({ className, children, onClick, disable }) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={cn(
        "bg-green-500 w-full rounded p-2 text-white font-bold",
        {" bg-gray-300":disable},
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
