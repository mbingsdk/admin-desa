import React from "react";
import { useDispatch } from "react-redux";
import { deletePenduduk } from "../pendudukSlice";

export default function PendudukTable({ data, onEdit }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      dispatch(deletePenduduk(id));
    }
  };

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>NIK</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Tgl Lahir</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Tidak ada data</td>
            </tr>
          ) : (
            data.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.nik}</td>
                <td>{p.nama}</td>
                <td>{p.alamat}</td>
                <td>{new Date(p.tglLahir).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-xs btn-warning mr-2" onClick={() => onEdit(p)}>Edit</button>
                  <button className="btn btn-xs btn-error" onClick={() => handleDelete(p._id)}>Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
