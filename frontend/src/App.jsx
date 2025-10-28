import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PendudukList from "./pages/PendudukList";
import SuratList from "./pages/SuratList";
import KeuanganList from "./pages/KeuanganList";
import ArsipList from "./pages/ArsipList";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/penduduk" element={<PendudukList />} />
            <Route path="/surat" element={<SuratList />} />
            <Route path="/keuangan" element={<KeuanganList />} />
            <Route path="/arsip" element={<ArsipList />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
