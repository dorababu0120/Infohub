import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';
import currencyRoutes from './routes/currency.js';
import quoteRoutes from './routes/quote.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS setup (added)
const allowedOrigins = [
  'https://infohub-z3mj.vercel.app', // your Vercel frontend
  'http://localhost:5173',           // for local dev
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: This origin is not allowed.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/quote', quoteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'InfoHub API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
