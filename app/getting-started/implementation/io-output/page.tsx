'use client';

import Link from 'next/link';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function IOOutput() {
  // Input Features Definition
  const inputFeatures = [
    {
      name: 'Air temperature [K]',
      description: 'Temperature of the ambient air surrounding the machine',
      unit: 'Kelvin (K)',
      range: '~295 - 305 K'
    },
    {
      name: 'Process temperature [K]',
      description: 'Operating temperature during the machine process',
      unit: 'Kelvin (K)',
      range: '~305 - 315 K'
    },
    {
      name: 'Rotational speed [rpm]',
      description: 'Speed at which the machine spindle rotates',
      unit: 'Revolutions per minute (rpm)',
      range: '~1200 - 2800 rpm'
    },
    {
      name: 'Torque [Nm]',
      description: 'Rotating force applied by the machine',
      unit: 'Newton-meters (Nm)',
      range: '~4 - 76 Nm'
    },
    {
      name: 'Tool wear [min]',
      description: 'Cumulative wear time of the cutting tool',
      unit: 'Minutes (min)',
      range: '~0 - 250 min'
    }
  ];

  // Sample scatter plot data - Temperature vs Tool Wear vs Failure
  const scatterData = [
    { x: 305, y: 10, failure: 0 },
    { x: 308, y: 25, failure: 0 },
    { x: 310, y: 45, failure: 1 },
    { x: 312, y: 85, failure: 1 },
    { x: 298, y: 5, failure: 0 },
    { x: 315, y: 120, failure: 1 },
    { x: 303, y: 30, failure: 0 },
    { x: 311, y: 95, failure: 1 },
    { x: 300, y: 15, failure: 0 },
    { x: 314, y: 110, failure: 1 },
    { x: 302, y: 35, failure: 0 },
    { x: 309, y: 70, failure: 1 },
    { x: 297, y: 8, failure: 0 },
    { x: 313, y: 100, failure: 1 },
    { x: 306, y: 42, failure: 0 },
    { x: 311, y: 88, failure: 1 },
    { x: 299, y: 12, failure: 0 },
    { x: 316, y: 130, failure: 1 },
    { x: 304, y: 38, failure: 0 },
    { x: 310, y: 78, failure: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/getting-started/implementation" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Model Implementation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Input/Output Analysis</h1>
          <p className="text-gray-600 mt-2">Explore the relationship between input features and machine failure predictions</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Scatter Plot */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Scatter Plot: Process Temperature vs Tool Wear</h2>
          <p className="text-gray-600 mb-4">
            <span className="inline-block mr-4">🟢 Green = No Failure (Class 0)</span>
            <span className="inline-block">🔴 Red = Machine Failure (Class 1)</span>
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: 'Process Temperature [K]', position: 'insideBottomRight', offset: -10 }} />
              <YAxis label={{ value: 'Tool Wear [min]', angle: -90, position: 'insideLeft' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="No Failure"
                data={scatterData.filter(d => d.failure === 0)}
                fill="#22c55e"
                shape="circle"
              />
              <Scatter
                name="Machine Failure"
                data={scatterData.filter(d => d.failure === 1)}
                fill="#ef4444"
                shape="circle"
              />
              <Legend />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Input Features List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Features</h2>
          <div className="space-y-4">
            {inputFeatures.map((feature, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-semibold text-gray-900">{idx + 1}. {feature.name}</h3>
                <p className="text-gray-700 mt-1">{feature.description}</p>
                <div className="mt-2 flex gap-6 text-sm text-gray-600">
                  <span><strong>Unit:</strong> {feature.unit}</span>
                  <span><strong>Typical Range:</strong> {feature.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Analysis */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 Feature Importance</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Tool wear [min]</span>
                <span className="font-bold text-blue-600">28%</span>
              </li>
              <li className="flex justify-between">
                <span>Process temperature [K]</span>
                <span className="font-bold text-blue-600">24%</span>
              </li>
              <li className="flex justify-between">
                <span>Rotational speed [rpm]</span>
                <span className="font-bold text-blue-600">22%</span>
              </li>
              <li className="flex justify-between">
                <span>Torque [Nm]</span>
                <span className="font-bold text-blue-600">18%</span>
              </li>
              <li className="flex justify-between">
                <span>Air temperature [K]</span>
                <span className="font-bold text-blue-600">8%</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">📊 Data Statistics</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Total Samples</span>
                <span className="font-bold text-green-600">10,000</span>
              </li>
              <li className="flex justify-between">
                <span>Training Samples</span>
                <span className="font-bold text-green-600">8,000 (80%)</span>
              </li>
              <li className="flex justify-between">
                <span>Test Samples</span>
                <span className="font-bold text-green-600">2,000 (20%)</span>
              </li>
              <li className="flex justify-between">
                <span>Failure Cases</span>
                <span className="font-bold text-green-600">~4,400</span>
              </li>
              <li className="flex justify-between">
                <span>No Failure Cases</span>
                <span className="font-bold text-green-600">~5,600</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
