import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { appRoutes } from "../config/appRoutes.jsx";

export default function Sidebar() {
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="w-64 bg-base-200 h-screen p-4 flex flex-col border-r">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Desa</h2>

      <ul className="menu flex-1">
        {appRoutes
          .filter((r) => r.sidebar)
          .filter((r) => !r.roles || r.roles.includes(user?.role))
          .map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive ? "active font-bold bg-base-300 rounded" : ""
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
      </ul>

      <div className="text-center text-sm opacity-70 mt-auto">
        © {new Date().getFullYear()} SDK-Dev
      </div>
    </div>
  );
}
