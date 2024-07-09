import { NavLink } from "react-router-dom";
import { cn } from "../../util/util";
import { useContext } from "react";
import { Context } from "../../Context/Context";
const SideMenu = () => {
  const { isMenuActive, setIsMenuActive } = useContext(Context);

  const menu = [
    {
      title: "Lists",
      items: [
        {
          name: "Home",
          path: "/admin/dashboard/students",
        },
        {
          name: "New Entry",
          path: "/admin/dashboard/newEntry",
        },
        {
          name: "Block List",
          path: "/admin/dashboard/blockList",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          name: "Accounts",
          path: "/admin/dashboard/accounts",
        },
        {
          name: "Password",
          path: "/admin/dashboard/password",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="hidden md:block min-h-full w-40 mx-2">
        <div>
          <h1 className="font-semibold text-gray-800 text-4xl">Admin</h1>
          {menu.map((i) => (
            <div key={i.title}>
              <h1 className=" text-xl font-semibold my-3 ">{i.title}</h1>
              <ul>
                {i.items.map((item) => (
                  <li key={item.name} className="relative">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "font-medium text-gray-600 py-1 px-4 before:content-[''] before:bg-gray-300 before:h-[100%] before:w-0.5 before:absolute before:left-0",
                          {
                            "text-sky-500 before:bg-sky-500 before:h-[90%]":
                              isActive,
                          }
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

        <div className="">
          <div
            className={cn(
              "absolute bg-blue-400 h-screen -left-full top-0 w-80 md:hidden transition-all duration-150",
              { "-left-0": isMenuActive }
            )}
          >
            <div className="sm:block min-h-full w-40 mx-2 text-white pt-10 pl-4">
              <div>
                <h1 className="font-semibold text-4xl text-white">Admin</h1>
                {menu.map((i) => (
                  <div key={i.title}>
                    <h1 className=" text-xl font-semibold my-3 ">{i.title}</h1>
                    <ul>
                      {i.items.map((item) => (
                        <li key={item.name} className="relative">
                          <NavLink
                            to={item.path}
                            onClick={() => setIsMenuActive(false)}
                            className={({ isActive }) =>
                              cn(
                                "font-medium text-gray-200 py-1 px-4 before:content-[''] before:bg-gray-300 before:h-[100%] before:w-0.5 before:absolute before:left-0",
                                {
                                  "text-white before:bg-white before:h-[90%]":
                                    isActive,
                                }
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default SideMenu;
