import { timingSafeEqual, randomBytes, createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handler(req, res) {
  // 1. Kun tillat POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body;
  
  // Hent hemmeligheter fra Vercel Environment Variables
  // MERK: Bruk navnet ADMIN_PIN (uten REACT_APP_) på serveren
  const CORRECT_PIN = process.env.ADMIN_PIN; 
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!CORRECT_PIN || !JWT_SECRET) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  // 2. Sikker sammenligning (Timing Safe)
  // Dette hindrer hackere i å gjette koden basert på hvor lang tid serveren bruker
  const pinBuffer = Buffer.from(pin || '');
  const correctBuffer = Buffer.from(CORRECT_PIN);

  // Sjekk lengde først for å unngå feil, men gjør det på en måte som ikke lekker info
  if (pinBuffer.length !== correctBuffer.length) {
    return createArtificialDelay(res);
  }

  const match = timingSafeEqual(pinBuffer, correctBuffer);

  if (match) {
    // 3. Lag en sikker token (JWT)
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });

    // 4. Sett en HTTP-Only cookie (Sikrere enn localStorage)
    const cookie = serialize('admin_token', token, {
      httpOnly: true, // JavaScript kan ikke lese denne (hindrer XSS)
      secure: process.env.NODE_ENV === 'production', // Kun HTTPS i prod
      sameSite: 'strict',
      maxAge: 7200, // 2 timer
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true });
  } else {
    return createArtificialDelay(res);
  }
}

// Hjelpefunksjon for å returnere feil med en liten forsinkelse
// Dette gjør "Brute Force" angrep mye tregere
const createArtificialDelay = (res) => {
  setTimeout(() => {
    return res.status(401).json({ error: 'Invalid PIN' });
  }, Math.random() * 100 + 200); // 200-300ms delay
};