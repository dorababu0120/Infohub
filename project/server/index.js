import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';
import currencyRoutes from './routes/currency.js';
import quoteRoutes from './routes/quote.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
const corsOptions = {
  origin: [
<<<<<<< HEAD
    'https://infohub-nu.vercel.app',  // Your Vercel URL
=======
    'https://infohub-z3mj.vercel.app/',  // Your Vercel URL
>>>>>>> 7d197f52a2a5d6984bda3c9e2fb367b35cb27e0f
    'http://localhost:5173',           // Vite dev server
    'http://localhost:3000'            // Common React dev server
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
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