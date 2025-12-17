import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadArsip } from "../arsipSlice";

export default function ArsipUploadModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: "", category: "Lainnya" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih file!");
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("file", file);
    dispatch(uploadArsip(fd));
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-3">Upload Dokumen</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input input-bordered w-full"
            placeholder="Judul Dokumen"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            className="select select-bordered w-full"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="Surat">Surat</option>
            <option value="Keuangan">Keuangan</option>
            <option value="Laporan">Laporan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
