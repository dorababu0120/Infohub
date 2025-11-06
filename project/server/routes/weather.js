import express from 'express';
import axios from 'axios';

const router = express.Router();

const mockWeatherData = {
  city: 'Mumbai',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 65,
  wind: 12
};

router.get('/', async (req, res) => {
  try {
    const city = req.query.city || 'Mumbai';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.json({
        ...mockWeatherData,
        city,
        mock: true
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    res.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      mock: false
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
