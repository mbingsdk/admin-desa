import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { bootstrapAuth } from "./features/auth/authSlice";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import { appRoutes } from "./config/appRoutes.jsx";

export default function App() {
  const dispatch = useDispatch();
  const bootstrapped = useRef(false);
  const { isLoading } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!bootstrapped.current) {
      bootstrapped.current = true;
      dispatch(bootstrapAuth());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<Forbidden />} />

        {/* Protected dynamic routes */}
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute roles={route.roles}>
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
