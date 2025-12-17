export default function TemplateTable({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded shadow">
      <table className="table">
        <thead><tr><th>Nama</th><th>Kode</th><th>Variabel</th><th>Aksi</th></tr></thead>
        <tbody>
          {data.map(t=>(
            <tr key={t._id}>
              <td>{t.name}</td><td>{t.code}</td>
              <td>{t.variables.join(", ")}</td>
              <td className="flex gap-2">
                <button className="btn btn-xs btn-warning" onClick={()=>onEdit(t)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={()=>onDelete(t._id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
