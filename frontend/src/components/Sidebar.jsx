import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaFileAlt, FaMoneyBill, FaArchive, FaChartPie } from "react-icons/fa";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaChartPie /> },
    { name: "Penduduk", path: "/penduduk", icon: <FaUsers /> },
    { name: "Surat", path: "/surat", icon: <FaFileAlt /> },
    { name: "Keuangan", path: "/keuangan", icon: <FaMoneyBill /> },
    { name: "Arsip", path: "/arsip", icon: <FaArchive /> },
  ];

  return (
    <div className="w-64 bg-base-200 h-screen p-4 flex flex-col border-r">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Desa</h2>
      <ul className="menu flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "active font-bold" : ""}`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="text-center text-sm opacity-70 mt-auto">
        © {new Date().getFullYear()} Kantor Desa
      </div>
    </div>
  );
}
