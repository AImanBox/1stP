'use client';

import { Model } from '@/lib/models';

interface ModelSidebarProps {
  models: Model[];
  selectedModelId: string | null;
  onSelectModel: (modelId: string) => void;
}

export default function ModelSidebar({
  models,
  selectedModelId,
  onSelectModel,
}: ModelSidebarProps) {
  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Models</h2>
        <div className="space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedModelId === model.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="font-semibold">{model.name}</div>
              <div
                className={`text-sm ${
                  selectedModelId === model.id
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}
              >
                {model.type}
              </div>
              <div
                className={`text-xs mt-2 font-medium ${
                  selectedModelId === model.id
                    ? 'text-blue-100'
                    : 'text-blue-600'
                }`}
              >
                Accuracy: {(model.accuracy * 100).toFixed(1)}%
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
