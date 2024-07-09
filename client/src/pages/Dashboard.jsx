import { Outlet } from "react-router-dom";
import Header from "../Components/header/Header";
import SideMenu from "../Components/header/SideMenu";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="container m-auto mt-10 w-full h-full">
        <div className="flex h-full gap-0 md:gap-10">
          <SideMenu />
          <div className="pt-14 sm:pt-2 w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
