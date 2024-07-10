import { CircleX, LogOut, MenuIcon } from "lucide-react";
import gaiLogo from "../../assets/gai.jpg";
import { useContext, useEffect } from "react";
import { cn } from "../../util/util";
import { Context } from "../../Context/Context";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import { config } from "../../config/config";

const Header = () => {
  const { isMenuActive, setIsMenuActive } = useContext(Context);
  const { dispatch } = useContext(AdminContext);
  const logouthandler = () => {
    axios.get(config.server + "/api/admin/logout", {
      withCredentials:true
    }).then(() => {
      dispatch({ type: "LOGOUT" });
    });
  };


  return (
    <header className="border-b py-3 px-5">
      <div className="container m-auto">
        <div className="Wrapper flex justify-between">
          <div className="logo flex gap-1 items-center">
            <img className="w-7" src={gaiLogo} alt="Gai" />
            <h1 className="font-semibold text-xl text-gray-500">
              Dash<span className={cn(" text-sky-500")}>Board </span>
            </h1>
          </div>
          <div
            onClick={logouthandler}
            className="hidden md:block menu bg-blue-100 rounded p-1 hover:bg-blue-200 duration-150"
          >
            <LogOut className={cn(" text-sky-500")} />
          </div>
          <div
            onClick={() => setIsMenuActive(!isMenuActive)}
            className="block md:hidden menu bg-blue-100 rounded p-1 hover:bg-blue-200 duration-150"
          >
            {isMenuActive ? (
              <CircleX className={cn(" text-sky-500")} />
            ) : (
              <MenuIcon className={cn(" text-sky-500")} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
