'use client';

import { useState } from 'react';
import { models } from '@/lib/models';
import ModelSidebar from '@/components/ModelSidebar';
import ModelDetails from '@/components/ModelDetails';

export default function ModelsPage() {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(
    models[0]?.id || null
  );

  const selectedModel = models.find((m) => m.id === selectedModelId) || null;

  return (
    <div className="flex h-screen bg-white">
      <ModelSidebar
        models={models}
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
      />
      <ModelDetails model={selectedModel} />
    </div>
  );
}
