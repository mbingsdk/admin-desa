import Dashboard from "../pages/Dashboard";
import PendudukList from "../pages/PendudukList";
import SuratList from "../pages/SuratList";
import TemplateSuratList from "../pages/TemplateSuratList";
import KeuanganList from "../pages/KeuanganList";
import ArsipList from "../pages/ArsipList";

import {
  FaUsers,
  FaFileAlt,
  FaMoneyBill,
  FaArchive,
  FaChartPie,
  FaFileSignature,
} from "react-icons/fa";

export const appRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaChartPie />,
    element: <Dashboard />,
    roles: ["admin", "sekretaris", "bendahara"],
    sidebar: true,
  },
  {
    path: "/penduduk",
    name: "Penduduk",
    icon: <FaUsers />,
    element: <PendudukList />,
    roles: ["admin", "sekretaris"],
    sidebar: true,
  },
  {
    path: "/surat",
    name: "Surat",
    icon: <FaFileAlt />,
    element: <SuratList />,
    roles: ["admin", "sekretaris"],
    sidebar: true,
  },
  {
    path: "/template",
    name: "Template Surat",
    icon: <FaFileSignature />,
    element: <TemplateSuratList />,
    roles: ["admin", "sekretaris"],
    sidebar: true,
  },
  {
    path: "/keuangan",
    name: "Keuangan",
    icon: <FaMoneyBill />,
    element: <KeuanganList />,
    roles: ["admin", "bendahara"],
    sidebar: true,
  },
  {
    path: "/arsip",
    name: "Arsip",
    icon: <FaArchive />,
    element: <ArsipList />,
    roles: ["admin", "sekretaris", "bendahara"],
    sidebar: true,
  },
];
