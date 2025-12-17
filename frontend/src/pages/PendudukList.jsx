import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPenduduk } from "../features/penduduk/pendudukSlice";
import PendudukTable from "../features/penduduk/components/PendudukTable";
import PendudukFormModal from "../features/penduduk/components/PendudukFormModal";

export default function PendudukList() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((s) => s.penduduk);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchPenduduk());
  }, [dispatch]);

  const openAdd = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Data Penduduk</h1>
        <button className="btn btn-primary" onClick={openAdd}>
          + Tambah
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <PendudukTable data={items} onEdit={openEdit} />
      )}

      <PendudukFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        current={selected}
      />
    </Layout>
  );
}
