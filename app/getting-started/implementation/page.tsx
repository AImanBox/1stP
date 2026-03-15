'use client';

import Link from 'next/link';

export default function Implementation() {
  const steps = [
    {
      num: 1,
      title: 'Model Training',
      description: 'Models trained on historical machine data with feature engineering',
    },
    {
      num: 2,
      title: 'Performance Validation',
      description: 'Evaluated using multiple metrics: ROC-AUC, Precision, Recall, F1-Score',
    },
    {
      num: 3,
      title: 'Integration',
      description: 'Models integrated into web application for real-time predictions',
    },
    {
      num: 4,
      title: 'Deployment',
      description: 'Deployed as REST API endpoints for seamless integration',
    },
  ];

  const models = [
    {
      name: 'XGBoost',
      rocAuc: '0.9969',
      precision: '1.0',
      recall: '0.9706',
      f1: '0.9851',
    },
    {
      name: 'LightGBM',
      rocAuc: '0.9916',
      precision: '1.0',
      recall: '0.9706',
      f1: '0.9851',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/getting-started" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Getting Started
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Model Implementation</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Implementation Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Implementation Pipeline</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-700 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Performance */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">ROC-AUC</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Precision</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Recall</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{model.name}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{model.rocAuc}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{model.precision}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{model.recall}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">{model.f1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Technology Stack</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Python 3.9+</li>
                <li>• XGBoost & LightGBM</li>
                <li>• scikit-learn</li>
                <li>• pandas & numpy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Frontend</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Next.js 15</li>
                <li>• React 19</li>
                <li>• TailwindCSS</li>
                <li>• Recharts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
