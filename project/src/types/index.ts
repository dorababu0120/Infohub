export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  city: string;
  country: string;
  icon: string;
  description: string;
  mock?: boolean;
}


export interface CurrencyData {
  inr: number;
  usd: string;
  eur: string;
  rates: {
    USD: number;
    EUR: number;
  };
  mock?: boolean;
}

export interface QuoteData {
  content: string;
  author: string;
  mock?: boolean;
}

export type Tab = 'weather' | 'currency' | 'quotes';
