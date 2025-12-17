import React from "react";
import arsipApi from "../arsipService";

export default function ArsipTable({ data, onDelete }) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Tipe</th>
            <th>Ukuran</th>
            <th>Upload</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan="6" className="text-center p-4">Tidak ada dokumen</td></tr>
          ) : (
            data.map((f) => (
              <tr key={f._id}>
                <td>{f.title}</td>
                <td>{f.category}</td>
                <td>{f.fileType}</td>
                <td>{(f.size / 1024).toFixed(1)} KB</td>
                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <a href={arsipApi.download(f._id)} className="btn btn-xs" target="_blank">📄 View</a>
                  <button className="btn btn-xs btn-error" onClick={() => onDelete(f._id)}>Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
