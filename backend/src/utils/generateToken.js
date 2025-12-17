import jwt from "jsonwebtoken";

export const generateTokens = (userOrPayload) => {
  const id = userOrPayload._id || userOrPayload.id;
  const role = userOrPayload.role;

  const payload = { id, role };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "60m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
