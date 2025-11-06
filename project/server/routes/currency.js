import express from 'express';
import axios from 'axios';

const router = express.Router();

const mockRates = {
  USD: 0.012,
  EUR: 0.011
};

router.get('/', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?from=INR&to=USD,EUR`
      );

      const rates = response.data.rates;
      res.json({
        inr: amount,
        usd: (amount * rates.USD).toFixed(2),
        eur: (amount * rates.EUR).toFixed(2),
        rates: {
          USD: rates.USD,
          EUR: rates.EUR
        },
        mock: false
      });
    } catch (apiError) {
      res.json({
        inr: amount,
        usd: (amount * mockRates.USD).toFixed(2),
        eur: (amount * mockRates.EUR).toFixed(2),
        rates: mockRates,
        mock: true
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

export default router;
