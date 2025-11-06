import { Cloud, DollarSign, Quote } from 'lucide-react';
import type { Tab } from '../types';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'weather' as Tab, label: 'Weather', icon: Cloud },
    { id: 'currency' as Tab, label: 'Currency', icon: DollarSign },
    { id: 'quotes' as Tab, label: 'Quotes', icon: Quote }
  ];

  return (
    <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
