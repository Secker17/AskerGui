import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export default function handler(req, res) {
  // 1. Hent cookies fra forespørselen
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.admin_token;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    // 2. Sjekk at cookien er ekte (signert av serveren)
    jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    // Hvis tokenet er falskt eller utløpt
    return res.status(401).json({ authenticated: false });
  }
}