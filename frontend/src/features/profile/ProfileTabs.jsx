
import { User, MapPin, Package, Star } from 'lucide-react';

const iconMap = { User, MapPin, Package, Star };

export default function ProfileTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = iconMap[tab.icon];
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}