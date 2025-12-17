import React from "react";
import suratApi from "../suratService";

export default function SuratTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th><th>No Surat</th><th>Jenis</th><th>Template</th><th>Dibuat</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length===0 ? (
            <tr><td colSpan="6" className="text-center">Tidak ada data</td></tr>
          ): data.map((s,i)=>(
            <tr key={s._id}>
              <td>{i+1}</td>
              <td>{s.noSurat}</td>
              <td>{s.jenis}</td>
              <td>{s.templateCode}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              <td className="flex gap-2">
                <a className="btn btn-xs" href={suratApi.printPdf(s._id)} target="_blank">PDF</a>
                <button className="btn btn-xs btn-warning" onClick={()=>onEdit(s)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={()=>onDelete(s._id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
