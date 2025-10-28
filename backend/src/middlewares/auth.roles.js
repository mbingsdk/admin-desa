export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Akses ditolak: tidak memiliki izin" });
    }

    next();
  };
};
