import { useState, useEffect } from "react";
import { IndianRupee, DollarSign, Euro, Loader2, ArrowRight } from "lucide-react";
import { currencyApi } from "../services/api";
import type { CurrencyData } from "../types";

export default function CurrencyModule() {
  const [amount, setAmount] = useState("1000");
  const [currency, setCurrency] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertCurrency = async (value: string) => {
    const numValue = parseFloat(value);

    if (!value.trim() || isNaN(numValue) || numValue <= 0) {
      setError("Please enter a valid positive amount");
      setCurrency(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await currencyApi.convertCurrency(numValue);
      setCurrency(data);
    } catch {
      setError("Failed to convert currency. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency(amount);
  }, []);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value.trim()) {
      const timer = setTimeout(() => convertCurrency(value), 500);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Input Card */}
      <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/40 rounded-2xl p-6 shadow-lg border border-gray-200/30 dark:border-gray-700/30 transition-all hover:shadow-xl">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Amount in INR
        </label>
        <div className="relative">
          <IndianRupee
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="w-full pl-12 pr-4 py-3 border border-gray-300/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg bg-white/50 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 transition-all"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 text-gray-600 dark:text-gray-300">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
          <span className="ml-3 font-medium">Converting...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-100/60 dark:bg-red-900/40 border border-red-200/50 dark:border-red-700/50 rounded-xl text-red-800 dark:text-red-300 shadow-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {currency && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* USD Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign size={24} />
                <span className="text-lg font-semibold tracking-wide">US Dollar</span>
              </div>
              <ArrowRight className="text-white/70" size={20} />
            </div>
            <div className="text-4xl font-extrabold">${currency.usd}</div>
            <div className="text-sm text-white/80 mt-2">
              Rate: ₹1 = ${currency.rates.USD.toFixed(4)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none"></div>
          </div>

          {/* EUR Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white transition-transform hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Euro size={24} />
                <span className="text-lg font-semibold tracking-wide">Euro</span>
              </div>
              <ArrowRight className="text-white/70" size={20} />
            </div>
            <div className="text-4xl font-extrabold">€{currency.eur}</div>
            <div className="text-sm text-white/80 mt-2">
              Rate: ₹1 = €{currency.rates.EUR.toFixed(4)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* Mock Info */}
      {currency?.mock && (
        <div className="text-sm text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-3 shadow-sm text-center">
          Using fallback rates. Live rates from Frankfurter API.
        </div>
      )}
    </div>
  );
}
