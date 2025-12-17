export const applyWilayahScope = (req, baseFilter = {}) => {
  const u = req.user;
  if (!u) return baseFilter;
  // Admin: akses penuh
  if (u.role === "admin") return baseFilter;

  // Sekretaris/bendahara/operator: batasi by wilayah jika diset
  const w = u.wilayah || {};
  const scoped = { ...baseFilter };

  // contoh: data Penduduk punya field rt/rw/dusun/desa
  if (w.desa)  scoped.desa  = w.desa;
  if (w.dusun) scoped.dusun = w.dusun;
  if (w.rw)    scoped.rw    = w.rw;
  if (w.rt)    scoped.rt    = w.rt;

  return scoped;
};
