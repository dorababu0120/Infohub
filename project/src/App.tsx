import { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import WeatherModule from './components/WeatherModule';
import CurrencyModule from './components/CurrencyModule';
import QuotesModule from './components/QuotesModule';
import type { Tab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('weather');

  const renderContent = () => {
    switch (activeTab) {
      case 'weather':
        return <WeatherModule />;
      case 'currency':
        return <CurrencyModule />;
      case 'quotes':
        return <QuotesModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            InfoHub
          </h1>
          <p className="text-gray-600 text-lg">
            Your daily utility dashboard for weather, currency, and inspiration
          </p>
        </header>

        <div className="mb-8 flex justify-center">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <main className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {renderContent()}
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Built with React, Express, and real-time APIs</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
