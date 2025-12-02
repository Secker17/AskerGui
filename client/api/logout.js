import { serialize } from 'cookie';

export default function handler(req, res) {
  // Overskriv cookien med en som utløper med en gang
  const cookie = serialize('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Dette sletter cookien
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true });
}