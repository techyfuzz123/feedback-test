import { useState } from "react";
import Feedbacks from "./facultyComponents/Feedbacks";
import Dashboard from "./facultyComponents/Dashboard";
import Accounts from "./facultyComponents/Accounts";

const FacultyDashboard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("Feedbacks");
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Feedbacks", src: "Chat" },
    { title: "Accounts", src: "User" },
    { title: "Analytics", src: "Chart" },
    { title: "Files", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex   overflow-auto">
      {/* sideNavBar */}
      <aside
        className={`${open ? "w-72" : "w-20"}
         bg-dark-purple h-screen p-5 pt-6 sticky  top-0 duration-300`}
      >
        <img
          src="/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex  gap-x-4 items-center">
          <img
            src="/logo.png"
            className={`hidden md:block cursor-pointer  duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Feedback Faculty
          </h1>
        </div>
        {/* menu */}
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              onClick={(e) => {
                setCurrent(Menu.title);
              }}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer
               hover:bg-light-white text-gray-300 text-sm items-center
                gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                Menu.title === current && "bg-light-white"
              } `}
            >
              <img src={`/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </aside>
      {/* components */}
      <div className={`flex w-full h-screen `}>
        {current === "Dashboard" && <Dashboard />}
        {current === "Feedbacks" && <Feedbacks feedbacks={user.feedbacks} />}
        {current === "Accounts" && <Accounts />}
      </div>
    </div>
  );
};

export default FacultyDashboard;
