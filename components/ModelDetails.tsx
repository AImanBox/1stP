import { Model } from '@/lib/models';

interface ModelDetailsProps {
  model: Model | null;
}

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percentage = (value * 100).toFixed(1);
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="text-2xl font-bold text-blue-600 mb-2">
        {percentage}%
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function ModelDetails({ model }: ModelDetailsProps) {
  if (!model) {
    return (
      <main className="flex-1 p-8 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-2xl text-gray-500 font-semibold">
            Select a model to view details
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {model.type}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {model.name}
          </h1>
          <p className="text-lg text-gray-600">{model.description}</p>
        </div>

        {/* Performance Metrics */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ScoreCard label="Accuracy" value={model.accuracy} />
            <ScoreCard label="Precision" value={model.precision} />
            <ScoreCard label="Recall" value={model.recall} />
            <ScoreCard label="F1 Score" value={model.f1Score} />
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            How This Model Works
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {model.explanation}
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Key Advantages
          </h3>
          <ul className="space-y-2 text-gray-700">
            {model.id === 'model-1' && (
              <>
                <li>✓ Handles both numerical and categorical data</li>
                <li>✓ Reduces overfitting through ensemble methods</li>
                <li>✓ Provides feature importance rankings</li>
              </>
            )}
            {model.id === 'model-2' && (
              <>
                <li>✓ Captures complex non-linear relationships</li>
                <li>✓ Best performance on this dataset (96% accuracy)</li>
                <li>✓ Scalable to larger datasets</li>
              </>
            )}
            {model.id === 'model-3' && (
              <>
                <li>✓ Excellent for binary classification</li>
                <li>✓ Works well with high-dimensional data</li>
                <li>✓ Memory efficient with kernel trick</li>
              </>
            )}
            {model.id === 'model-4' && (
              <>
                <li>✓ Superior performance on tabular data</li>
                <li>✓ Automatically handles feature interactions</li>
                <li>✓ Built-in regularization prevents overfitting</li>
              </>
            )}
            {model.id === 'model-5' && (
              <>
                <li>✓ Highly interpretable model</li>
                <li>✓ Fast training and prediction</li>
                <li>✓ Provides probability estimates</li>
              </>
            )}
            {model.id === 'model-6' && (
              <>
                <li>✓ No training phase required</li>
                <li>✓ Intuitive and easy to understand</li>
                <li>✓ Naturally handles non-linear data</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
