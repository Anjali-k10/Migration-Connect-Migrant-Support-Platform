const isProd = process.env.NODE_ENV === "production";

export const migrantCookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  path: "/"
};
