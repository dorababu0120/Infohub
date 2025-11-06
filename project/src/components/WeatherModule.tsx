import { useState } from "react";
import { Search, Cloud, Droplets, Wind, Loader2 } from "lucide-react";
import { weatherApi } from "../services/api";
import type { WeatherData } from "../types";

export default function WeatherModule() {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getWeather(city);
      setWeather(data);
    } catch {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Enter city name"
          className="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900 dark:text-gray-100 text-lg shadow-sm transition-all"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100/70 border border-red-300 text-red-800 rounded-xl shadow-sm">
          {error}
        </div>
      )}

      {/* Weather Display */}
      {weather && !error && (
        <div className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 transition-transform hover:scale-[1.01]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20 pointer-events-none" />

          {/* City and Description */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight">{weather.city}</h3>
              <p className="text-blue-100 text-lg capitalize">
                {weather.description || weather.condition}
              </p>
            </div>
            <Cloud size={56} className="text-blue-100" />
          </div>

          {/* Temperature */}
          <div className="text-7xl font-bold mb-8 drop-shadow-md">
            {weather.temperature}°C
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4 backdrop-blur-md shadow-sm hover:bg-white/25 transition">
              <Droplets size={28} />
              <div>
                <p className="text-sm text-blue-100 uppercase tracking-wide">Humidity</p>
                <p className="text-2xl font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/20 rounded-xl p-4 backdrop-blur-md shadow-sm hover:bg-white/25 transition">
              <Wind size={28} />
              <div>
                <p className="text-sm text-blue-100 uppercase tracking-wide">Wind Speed</p>
                <p className="text-2xl font-semibold">{weather.wind} km/h</p>
              </div>
            </div>
          </div>

          {/* Mock Data Info */}
          {weather.mock && (
            <div className="mt-6 text-sm text-blue-100 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-3 text-center">
              Using mock data — add <span className="font-semibold">OPENWEATHER_API_KEY</span> to enable live data.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
