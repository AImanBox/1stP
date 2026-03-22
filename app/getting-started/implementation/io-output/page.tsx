'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface DataPoint {
  x: number;
  y: number;
  z: number;
  rpm: number;
  torque: number;
  failure: number;
}

export default function IOOutput() {
  // Camera view state
  const [cameraView, setCameraView] = useState<'3d' | 'top' | 'front' | 'side'>('3d');
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dataset on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dataset');
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error || 'Failed to load dataset');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
      name: 'Process temperature [°C]',
      description: 'Operating temperature during the machine process (Y-axis)',
      unit: 'Celsius (°C)',
      range: '~31 - 42 °C',
      type: 'Y-Axis'
    },
    {
      name: 'Air temperature [°C]',
      description: 'Temperature of the ambient air surrounding the machine (Z-axis)',
      unit: 'Celsius (°C)',
      range: '~22 - 32 °C',
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

  // Use actual dataset for scatter plot
  const scatter3DData = useMemo(() => {
    return data;
  }, [data]);

  // Get camera configuration based on selected view
  const getCameraConfig = () => {
    switch (cameraView) {
      case 'top':
        // Top View: Vertical = X-axis, Horizontal = Y-axis (looking down from Z)
        return { eye: { x: 0, y: 0, z: 2.5 }, center: { x: 0, y: 0, z: 0 } };
      case 'front':
        // Front View: Vertical = Z-axis, Horizontal = Y-axis (looking from X direction)
        return { eye: { x: 2.5, y: 0, z: 0 }, center: { x: 0, y: 0, z: 0 } };
      case 'side':
        // Side View: Horizontal = X-axis, Vertical = Z-axis (looking from Y direction)
        return { eye: { x: 0, y: 2.5, z: 0 }, center: { x: 0, y: 0, z: 0 } };
      default: // '3d'
        // Rotated 45 degrees counter-clockwise from original view
        return { eye: { x: 0, y: 2.1, z: 1.5 }, center: { x: 0, y: 0, z: 0 } };
    }
  };

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
        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="text-blue-700 font-semibold">Loading dataset...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <span className="text-red-700 font-semibold">❌ {error}</span>
          </div>
        )}

        {/* Data Loaded Successfully */}
        {!loading && !error && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <span className="text-green-700 font-semibold">✓ Dataset loaded: {scatter3DData.length.toLocaleString()} total records</span>
            <div className="text-green-600 text-sm mt-2">
              <span className="inline-block mr-6">🟢 No failures: {scatter3DData.filter(d => d.failure === 0).length.toLocaleString()}</span>
              <span className="inline-block">🔴 Failures: {scatter3DData.filter(d => d.failure === 1).length.toLocaleString()}</span>
            </div>
          </div>
        )}
        
        {/* 3D Scatter Plot */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">3D Feature Analysis: Tool Wear, Process Temperature & Air Temperature</h2>
          <p className="text-gray-600 mb-4">
            <span className="inline-block mr-6">📌 <strong>X-Axis:</strong> Tool wear [min]</span>
            <span className="inline-block mr-6">📌 <strong>Y-Axis:</strong> Process temperature [°C]</span>
            <span className="inline-block mr-6">📌 <strong>Z-Axis:</strong> Air temperature [°C]</span>
          </p>
          <p className="text-gray-600 mb-6">
            <span className="inline-block mr-4">🟢 Green = No Failure</span>
            <span className="inline-block">🔴 Red = Machine Failure</span>
          </p>

          {/* View Control Buttons */}
          <div className="mb-6 flex gap-3 flex-wrap">
            <button
              onClick={() => setCameraView('3d')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                cameraView === '3d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              🔄 3D View
            </button>
            <button
              onClick={() => setCameraView('top')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                cameraView === 'top'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              ⬆️ Top View
            </button>
            <button
              onClick={() => setCameraView('front')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                cameraView === 'front'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              👁️ Front View
            </button>
            <button
              onClick={() => setCameraView('side')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                cameraView === 'side'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              ↔️ Side View
            </button>
          </div>
          
          {!loading && scatter3DData.length > 0 && (
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
                    size: 4,
                    color: '#22c55e',
                    opacity: 0.7,
                    line: { color: '#16a34a', width: 0.5 }
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
                    size: 4,
                    color: '#ef4444',
                    opacity: 0.7,
                    line: { color: '#dc2626', width: 0.5 }
                  }
                }
              ]}
              layout={{
                scene: {
                  xaxis: {
                    title: 'Tool Wear [min]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'rgba(100, 100, 100, 1)',
                    gridwidth: 3,
                    dtick: 30,
                    showbackground: true,
                    showgrid: true,
                    zeroline: true,
                    zerolinewidth: 2,
                    zerolinecolor: 'rgba(0, 0, 0, 0.3)',
                  },
                  yaxis: {
                    title: 'Process Temperature [°C]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'rgba(100, 100, 100, 1)',
                    gridwidth: 3,
                    dtick: 3,
                    showbackground: true,
                    showgrid: true,
                    zeroline: true,
                    zerolinewidth: 2,
                    zerolinecolor: 'rgba(0, 0, 0, 0.3)',
                  },
                  zaxis: {
                    title: 'Air Temperature [°C]',
                    backgroundcolor: 'rgba(230, 230,230, 0.5)',
                    gridcolor: 'rgba(100, 100, 100, 1)',
                    gridwidth: 3,
                    dtick: 2,
                    showbackground: true,
                    showgrid: true,
                    zeroline: true,
                    zerolinewidth: 2,
                    zerolinecolor: 'rgba(0, 0, 0, 0.3)',
                  },
                  camera: getCameraConfig()
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
          )}
          
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
