import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-error">403</h1>
      <p className="mt-2 text-lg">Kamu tidak punya akses ke halaman ini</p>
      <Link to="/" className="btn btn-primary mt-4">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
