'use client';

import Link from 'next/link';

export default function EDA() {
  const features = [
    { name: 'Air Temperature [K]', type: 'Numeric', min: '295.3K', max: '304.5K' },
    { name: 'Process Temperature [K]', type: 'Numeric', min: '305.0K', max: '313.8K' },
    { name: 'Rotational Speed [rpm]', type: 'Numeric', min: '1168', max: '2886' },
    { name: 'Torque [Nm]', type: 'Numeric', min: '3.8', max: '76.6' },
    { name: 'Tool Wear [min]', type: 'Numeric', min: '0', max: '253' },
  ];

  const failureStats = [
    { label: 'Total Samples', value: '10,000' },
    { label: 'Failures', value: '339', percentage: '3.39%' },
    { label: 'Non-Failures', value: '9,661', percentage: '96.61%' },
  ];

  const digitizedFeatures = [
    {
      name: 'Product ID',
      description: 'Machine product type identifier',
      originalValue: 'L (Low), M (Medium), H (High)',
      digitizedValue: 'L=0, M=1, H=2',
      encoding: 'Ordinal Encoding',
    },
  ];

  const targetVariable = {
    name: 'Machine failure',
    description: 'Target variable indicating whether machine failed or not',
    originalValue: '0 (No Failure), 1 (Failure)',
    digitizedValue: '0 = No Failure, 1 = Failure',
    encoding: 'Binary Encoding',
    failureTypes: [
      'TWF (Tool Wear Failure)',
      'HDF (Heat Dissipation Failure)',
      'PWF (Power Failure)',
      'OSF (Overstress Failure)',
      'RNF (Random Nonfatal Failure)',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/getting-started" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Getting Started
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Exploratory Data Analysis (EDA)</h1>
          <Link href="/getting-started/eda/correlation">
            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
              <span className="text-lg">📊 View Correlation Matrix & Feature Importances</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Failure Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Failure Distribution</h2>
          <div className="grid grid-cols-3 gap-4">
            {failureStats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-700 font-semibold mt-2">{stat.label}</div>
                {stat.percentage && <div className="text-sm text-gray-600">{stat.percentage}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Min</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Max</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{feature.name}</td>
                    <td className="px-4 py-3 text-gray-700">{feature.type}</td>
                    <td className="px-4 py-3 text-gray-700">{feature.min}</td>
                    <td className="px-4 py-3 text-gray-700">{feature.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Digitized Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Digitization & Encoding</h2>

          {/* Product ID Encoding */}
          {digitizedFeatures.map((feature, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.name}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm font-semibold text-orange-900 mb-1">Original Value</p>
                  <p className="text-gray-700">{feature.originalValue}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">Digitized Value</p>
                  <p className="text-gray-700">{feature.digitizedValue}</p>
                </div>
              </div>
              <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm"><span className="font-semibold text-blue-900">Encoding Method:</span> <span className="text-gray-700">{feature.encoding}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Target Variable Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Variable: Machine Failure</h2>
          
          <p className="text-gray-600 mb-4">{targetVariable.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm font-semibold text-red-900 mb-1">Original Value</p>
              <p className="text-gray-700">{targetVariable.originalValue}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-900 mb-1">Digitized Value</p>
              <p className="text-gray-700">{targetVariable.digitizedValue}</p>
            </div>
          </div>

          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm"><span className="font-semibold text-blue-900">Encoding Method:</span> <span className="text-gray-700">{targetVariable.encoding}</span></p>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-3">Failure Types Categorization</h4>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {targetVariable.failureTypes.map((failureType, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span className="text-gray-700">{failureType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Key Insights</h2>
          <ul className="text-gray-700 space-y-3">
            <li>✓ Dataset is imbalanced with 96.61% non-failures</li>
            <li>✓ All numeric features with clear operational ranges</li>
            <li>✓ No missing values detected</li>
            <li>✓ Features show normal distributions</li>
            <li>✓ Strong correlation patterns between temperature variables</li>
            <li>✓ Product ID encoded as ordinal values (L=0, M=1, H=2)</li>
            <li>✓ Machine failure is binary target variable (0=No, 1=Yes)</li>
            <li>✓ Five distinct failure modes identified for analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
