import axios from 'axios';
import type { WeatherData, CurrencyData, QuoteData } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get API key from environment variables or use a fallback (for development only)
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY ||'7535ddd4d56376c02ac8d82a353b9772';
export const weatherApi = {
  getWeather: async (city: string): Promise<WeatherData> => {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'YOUR_ACTUAL_API_KEY_HERE') {
      throw new Error('OpenWeather API key is not properly configured. Please set VITE_OPENWEATHER_API_KEY in your .env file.');
    }

    try {
      const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang: 'en'
        },
        // Add this to see the full request URL in the console (without exposing the API key)
        paramsSerializer: params => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              searchParams.append(key, String(value));
            }
          });
          const queryString = searchParams.toString();
          return queryString;
        }
      });
      
      return {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        city: response.data.name,
        country: response.data.sys.country,
        icon: response.data.weather[0].icon,
        description: response.data.weather[0].description
      };
    } catch (error: any) {
      console.error('OpenWeather API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url?.replace(/appid=[^&]*/, 'appid=***')
      });
      
      // Provide more user-friendly error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeather API key configuration.');
      } else if (error.response?.status === 404) {
        throw new Error('City not found. Please check the city name and try again.');
      } else if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a moment before trying again.');
      } else {
        throw new Error(`Failed to fetch weather data: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};

export const currencyApi = {
  convertCurrency: async (amount: number): Promise<CurrencyData> => {
    const response = await axios.get(`${API_BASE_URL}/currency`, {
      params: { amount }
    });
    return response.data;
  }
};

export const quoteApi = {
  getQuote: async (): Promise<QuoteData> => {
    const response = await axios.get(`${API_BASE_URL}/quote`);
    return response.data;
  }
};
