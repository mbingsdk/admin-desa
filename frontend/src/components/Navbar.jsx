import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar bg-base-100 border-b shadow-sm px-4 flex justify-between">
      <div className="text-lg font-semibold">💼 Sistem Informasi Kantor Desa</div>
      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.name || "User"}</span>
        <button className="btn btn-sm btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
