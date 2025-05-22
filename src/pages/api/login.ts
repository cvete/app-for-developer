import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { username, password } = req.body;
  const validUser = process.env.AUTH_USERNAME;
  const validPass = process.env.AUTH_PASSWORD;
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !validUser ||
    !validPass ||
    username !== validUser ||
    password !== validPass
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  // Set a secure, httpOnly cookie
  const token = Buffer.from(`${username}:${password}`).toString("base64");
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    })
  );
  res.status(200).json({ ok: true });
}
