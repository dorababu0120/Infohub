import { useState, useEffect } from 'react';
import { RefreshCw, Quote as QuoteIcon, Loader2 } from 'lucide-react';
import { quoteApi } from '../services/api';
import type { QuoteData } from '../types';

export default function QuotesModule() {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await quoteApi.getQuote();
      setQuote(data);
    } catch (err) {
      setError('Failed to fetch quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      ) : quote ? (
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-8 shadow-xl">
          <QuoteIcon size={40} className="text-purple-200 mb-4" />
          <blockquote className="text-2xl font-medium leading-relaxed mb-6">
            "{quote.content}"
          </blockquote>
          <div className="flex items-center justify-between">
            <p className="text-lg text-purple-100">— {quote.author}</p>
            {quote.mock && (
              <span className="text-xs bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full">
                Offline Mode
              </span>
            )}
          </div>
        </div>
      ) : null}

      <button
        onClick={fetchQuote}
        disabled={loading}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
      >
        <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
        {loading ? 'Loading New Quote...' : 'Get New Quote'}
      </button>
    </div>
  );
}
