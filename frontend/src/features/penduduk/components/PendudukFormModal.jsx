import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPenduduk, editPenduduk } from "../pendudukSlice";

export default function PendudukFormModal({ isOpen, onClose, current }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    alamat: "",
    tglLahir: "",
    jenisKelamin: "Laki-laki",
    statusKeluarga: "Kepala Keluarga",
  });

  useEffect(() => {
    if (current) setForm(current);
    else
      setForm({
        nik: "",
        nama: "",
        alamat: "",
        tglLahir: "",
        jenisKelamin: "Laki-laki",
        statusKeluarga: "Kepala Keluarga",
      });
  }, [current]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current) dispatch(editPenduduk({ id: current._id, data: form }));
    else dispatch(addPenduduk(form));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">
          {current ? "Edit Penduduk" : "Tambah Penduduk"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="nik"
            placeholder="NIK"
            value={form.nik}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="tglLahir"
            value={form.tglLahir?.slice(0, 10) || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
