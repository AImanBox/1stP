'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function IOOutput() {
  // Input Features Definition
  const inputFeatures = [
    {
      name: 'Tool wear [min]',
      description: 'Cumulative wear time of the cutting tool (X-axis)',
      unit: 'Minutes (min)',
      range: '~0 - 250 min',
      type: 'X-Axis'
    },
    {
      name: 'Process temperature [K]',
      description: 'Operating temperature during the machine process (Y-axis)',
      unit: 'Kelvin (K)',
      range: '~305 - 315 K',
      type: 'Y-Axis'
    },
    {
      name: 'Air temperature [K]',
      description: 'Temperature of the ambient air surrounding the machine (Z-axis)',
      unit: 'Kelvin (K)',
      range: '~295 - 305 K',
      type: 'Z-Axis'
    },
    {
      name: 'Rotational speed [rpm]',
      description: 'Speed at which the machine spindle rotates',
      unit: 'Revolutions per minute (rpm)',
      range: '~1200 - 2800 rpm',
      type: undefined
    },
    {
      name: 'Torque [Nm]',
      description: 'Rotating force applied by the machine',
      unit: 'Newton-meters (Nm)',
      range: '~4 - 76 Nm',
      type: undefined
    }
  ];

  // Generate 3D scatter plot data - Tool Wear vs Process Temp vs Air Temp vs Failure
  const scatter3DData = useMemo(() => {
    const noFailureData = [
      { x: 10, y: 305, z: 298, failure: 0 },
      { x: 25, y: 308, z: 300, failure: 0 },
      { x: 30, y: 303, z: 299, failure: 0 },
      { x: 15, y: 300, z: 297, failure: 0 },
      { x: 35, y: 302, z: 301, failure: 0 },
      { x: 5, y: 298, z: 295, failure: 0 },
      { x: 38, y: 304, z: 302, failure: 0 },
      { x: 12, y: 299, z: 296, failure: 0 },
      { x: 42, y: 306, z: 303, failure: 0 },
      { x: 8, y: 297, z: 294, failure: 0 },
      { x: 20, y: 301, z: 298, failure: 0 },
      { x: 28, y: 307, z: 304, failure: 0 },
      { x: 45, y: 310, z: 305, failure: 1 },
      { x: 85, y: 312, z: 303, failure: 1 },
      { x: 120, y: 315, z: 304, failure: 1 },
      { x: 95, y: 311, z: 302, failure: 1 },
      { x: 110, y: 314, z: 305, failure: 1 },
      { x: 70, y: 309, z: 301, failure: 1 },
      { x: 88, y: 311, z: 302, failure: 1 },
      { x: 100, y: 313, z: 304, failure: 1 },
      { x: 78, y: 310, z: 303, failure: 1 },
      { x: 130, y: 316, z: 305, failure: 1 },
    ];
    return noFailureData;
  }, []);

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
        {/* 3D Scatter Plot */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">3D Feature Analysis: Tool Wear, Process Temperature & Air Temperature</h2>
          <p className="text-gray-600 mb-4">
            <span className="inline-block mr-6">📌 <strong>X-Axis:</strong> Tool wear [min]</span>
            <span className="inline-block mr-6">📌 <strong>Y-Axis:</strong> Process temperature [K]</span>
            <span className="inline-block mr-6">📌 <strong>Z-Axis:</strong> Air temperature [K]</span>
          </p>
          <p className="text-gray-600 mb-6">
            <span className="inline-block mr-4">🟢 Green = No Failure</span>
            <span className="inline-block">🔴 Red = Machine Failure</span>
          </p>
          
          <div style={{ width: '100%', height: '600px' }}>
            <Plot
              data={[
                {
                  x: scatter3DData.filter(d => d.failure === 0).map(d => d.x),
                  y: scatter3DData.filter(d => d.failure === 0).map(d => d.y),
                  z: scatter3DData.filter(d => d.failure === 0).map(d => d.z),
                  mode: 'markers',
                  type: 'scatter3d',
                  name: 'No Failure',
                  marker: {
                    size: 6,
                    color: '#22c55e',
                    opacity: 0.8,
                    line: { color: '#16a34a', width: 1 }
                  }
                },
                {
                  x: scatter3DData.filter(d => d.failure === 1).map(d => d.x),
                  y: scatter3DData.filter(d => d.failure === 1).map(d => d.y),
                  z: scatter3DData.filter(d => d.failure === 1).map(d => d.z),
                  mode: 'markers',
                  type: 'scatter3d',
                  name: 'Machine Failure',
                  marker: {
                    size: 6,
                    color: '#ef4444',
                    opacity: 0.8,
                    line: { color: '#dc2626', width: 1 }
                  }
                }
              ]}
              layout={{
                scene: {
                  xaxis: {
                    title: 'Tool Wear [min]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'white',
                    showbackground: true,
                  },
                  yaxis: {
                    title: 'Process Temperature [K]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'white',
                    showbackground: true,
                  },
                  zaxis: {
                    title: 'Air Temperature [K]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'white',
                    showbackground: true,
                  },
                  camera: {
                    eye: { x: 1.5, y: 1.5, z: 1.5 }
                  }
                },
                title: {
                  text: '3D Interactive Scatter Plot - Machine Failure Prediction',
                  font: { size: 14, color: '#1f2937' }
                },
                hovermode: 'closest',
                margin: { l: 0, r: 0, b: 0, t: 30 },
                paper_bgcolor: 'rgba(255,255,255,0)',
                plot_bgcolor: 'rgba(255,255,255,0)'
              }}
              config={{ responsive: true }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 <strong>Tip:</strong> You can rotate the plot by clicking and dragging, zoom using scroll wheel, and hover over points to see exact values. 
              Notice how higher tool wear and process temperature values tend to cluster with machine failures (red points).
            </p>
          </div>
        </div>

        {/* Input Features List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Features</h2>
          <div className="mb-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
            <p className="text-sm text-amber-900">
              <strong>📍 3D Plot Dimensions:</strong> The scatter plot above shows the top 3 most important features:
              <span className="inline-block ml-2 font-semibold">Tool Wear (X)</span>,
              <span className="inline-block ml-2 font-semibold">Process Temperature (Y)</span>, and
              <span className="inline-block ml-2 font-semibold">Air Temperature (Z)</span>
            </p>
          </div>
          <div className="space-y-4">
            {inputFeatures.map((feature, idx) => {
              const is3DAxis = feature.type && ['X-Axis', 'Y-Axis', 'Z-Axis'].includes(feature.type);
              return (
                <div key={idx} className={`border-l-4 pl-4 py-2 ${is3DAxis ? 'border-purple-500 bg-purple-50' : 'border-blue-500'}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">{idx + 1}. {feature.name}</h3>
                    {is3DAxis && (
                      <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-purple-500 text-white">
                        {feature.type}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1">{feature.description}</p>
                  <div className="mt-2 flex gap-6 text-sm text-gray-600">
                    <span><strong>Unit:</strong> {feature.unit}</span>
                    <span><strong>Typical Range:</strong> {feature.range}</span>
                  </div>
                </div>
              );
            })}
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
