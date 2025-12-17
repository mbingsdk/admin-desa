import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchArsip, deleteArsip } from "../features/arsip/arsipSlice";
import ArsipTable from "../features/arsip/components/ArsipTable";
import ArsipUploadModal from "../features/arsip/components/ArsipUploadModal";

export default function ArsipList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.arsip);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchArsip({ q: search }));
  }, [dispatch, search]);

  const onDelete = (id) => {
    if (confirm("Yakin hapus dokumen ini?")) dispatch(deleteArsip(id));
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Arsip Dokumen</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Upload
        </button>
      </div>

      <input
        type="text"
        className="input input-bordered w-full mb-4"
        placeholder="Cari dokumen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? <div>Loading...</div> : <ArsipTable data={items} onDelete={onDelete} />}

      <ArsipUploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Layout>
  );
}
