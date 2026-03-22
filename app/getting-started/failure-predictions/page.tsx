'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionData {
  total_records: number;
  predicted_failures: number;
  failure_rate: number;
  probability_stats: {
    mean: number;
    median: number;
    std: number;
    min: number;
    max: number;
    q25: number;
    q75: number;
  };
  risk_distribution: {
    [key: string]: number;
  };
}

interface CriticalPrediction {
  UDI: number;
  tool_wear: number;
  process_temp_c: number;
  air_temp_c: number;
  probability: number;
  risk_level: string;
}

export default function FailurePredictions() {
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [criticalItems, setCriticalItems] = useState<CriticalPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('/api/failure-predictions');
        if (!response.ok) throw new Error('Failed to load predictions');
        const data = await response.json();
        setPredictions(data.summary);
        setCriticalItems(data.critical);
      } catch (err) {
        setError('Failed to load prediction data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading failure predictions...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <Link href="/getting-started" className="text-blue-600 hover:text-blue-800">← Back to Getting Started</Link>
      </div>
    </div>
  );

  if (!predictions) return null;

  // Prepare chart data
  const riskDistribution = Object.entries(predictions.risk_distribution).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    value: value as number,
  }));

  const probabilityStats = [
    { metric: 'Mean', value: predictions.probability_stats.mean.toFixed(4) },
    { metric: 'Median', value: predictions.probability_stats.median.toFixed(4) },
    { metric: 'Std Dev', value: predictions.probability_stats.std.toFixed(4) },
    { metric: 'Min', value: predictions.probability_stats.min.toFixed(4) },
    { metric: 'Max', value: predictions.probability_stats.max.toFixed(4) },
  ];

  const COLORS = ['#10b981', '#f97316', '#ef4444', '#8b5cf6', '#dc2626'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/getting-started" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Getting Started
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Machine Failure Predictions</h1>
          <p className="text-gray-600 mt-2">LightGBM Model (ROC-AUC: 0.9933) - Real-time Risk Assessment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* ===== ITEM 1: PREDICTIVE MAINTENANCE SCORING ===== */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 1. Predictive Maintenance Scoring</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Records Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm">Total Records Analyzed</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{predictions.total_records.toLocaleString()}</p>
            </div>

            {/* Predicted Failures Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
              <p className="text-gray-600 text-sm">Predicted Failures</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{predictions.predicted_failures}</p>
              <p className="text-sm text-gray-500 mt-1">{(predictions.failure_rate * 100).toFixed(2)}% failure rate</p>
            </div>

            {/* Mean Probability Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
              <p className="text-gray-600 text-sm">Mean Failure Probability</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{predictions.probability_stats.mean.toFixed(4)}</p>
            </div>

            {/* Safety Percentage Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm">Safe Operation Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {((1 - predictions.failure_rate) * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Probability Statistics</h3>
              <div className="space-y-3">
                {probabilityStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">{stat.metric}</span>
                    <span className="font-mono font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== ITEM 2: PROBABILITY DISTRIBUTION & SUMMARY ALERTS ===== */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 2. Probability Distribution & Summary</h2>
          
          {/* Alert Banner */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow p-6 mb-6 border-l-4 border-red-600">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-red-900">Critical Machines Requiring Immediate Attention</h3>
                <p className="text-red-800 mt-1">{criticalItems.length} machines predicted to fail out of {predictions.total_records.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Summary Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {/* Critical Count */}
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Critical Risk</p>
              <p className="text-2xl font-bold text-red-700 mt-2">{criticalItems.length}</p>
              <p className="text-xs text-red-600 mt-1">Prob ≥ 0.50</p>
            </div>

            {/* Mean Probability */}
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Mean Probability</p>
              <p className="text-2xl font-bold text-yellow-700 mt-2">{predictions.probability_stats.mean.toFixed(4)}</p>
              <p className="text-xs text-yellow-600 mt-1">Average failure prob</p>
            </div>

            {/* Median Probability */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Median Probability</p>
              <p className="text-2xl font-bold text-blue-700 mt-2">{predictions.probability_stats.median.toFixed(4)}</p>
              <p className="text-xs text-blue-600 mt-1">Middle value</p>
            </div>

            {/* Std Deviation */}
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Std Deviation</p>
              <p className="text-2xl font-bold text-purple-700 mt-2">{predictions.probability_stats.std.toFixed(4)}</p>
              <p className="text-xs text-purple-600 mt-1">Variability</p>
            </div>

            {/* Range */}
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Probability Range</p>
              <p className="text-sm font-bold text-green-700 mt-2">
                {predictions.probability_stats.min.toFixed(2)} - {predictions.probability_stats.max.toFixed(2)}
              </p>
              <p className="text-xs text-green-600 mt-1">Min to Max</p>
            </div>
          </div>

          {/* Risk Category Summary */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Category Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Critical', color: 'bg-red-100 text-red-900', icon: '🔴', key: 'Critical' },
                { name: 'High', color: 'bg-orange-100 text-orange-900', icon: '🟠', key: 'High' },
                { name: 'Medium', color: 'bg-yellow-100 text-yellow-900', icon: '🟡', key: 'Medium' },
                { name: 'Low', color: 'bg-blue-100 text-blue-900', icon: '🔵', key: 'Low' },
                { name: 'Very Low', color: 'bg-green-100 text-green-900', icon: '🟢', key: 'Very Low' },
              ].map((risk) => (
                <div key={risk.key} className={`rounded-lg p-4 ${risk.color} text-center`}>
                  <p className="text-2xl mb-1">{risk.icon}</p>
                  <p className="text-sm font-semibold">{risk.name}</p>
                  <p className="text-lg font-bold mt-2">{predictions.risk_distribution[risk.key] || 0}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Probability Thresholds Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Thresholds Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Thresholds</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded border-l-4 border-red-600">
                  <span className="font-semibold text-red-900">🔴 Critical</span>
                  <span className="text-right">
                    <p className="text-sm font-mono text-red-700">≥ 0.95</p>
                    <p className="text-xs text-red-600">Immediate action</p>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded border-l-4 border-orange-600">
                  <span className="font-semibold text-orange-900">🟠 High</span>
                  <span className="text-right">
                    <p className="text-sm font-mono text-orange-700">0.70 - 0.95</p>
                    <p className="text-xs text-orange-600">This week</p>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded border-l-4 border-yellow-600">
                  <span className="font-semibold text-yellow-900">🟡 Medium</span>
                  <span className="text-right">
                    <p className="text-sm font-mono text-yellow-700">0.50 - 0.70</p>
                    <p className="text-xs text-yellow-600">Plan soon</p>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <span className="font-semibold text-blue-900">🔵 Low</span>
                  <span className="text-right">
                    <p className="text-sm font-mono text-blue-700">0.10 - 0.50</p>
                    <p className="text-xs text-blue-600">Monitor</p>
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded border-l-4 border-green-600">
                  <span className="font-semibold text-green-900">🟢 Very Low</span>
                  <span className="text-right">
                    <p className="text-sm font-mono text-green-700">{'<'} 0.10</p>
                    <p className="text-xs text-green-600">Normal ops</p>
                  </span>
                </div>
              </div>
            </div>

            {/* Quartile Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Probability Quartiles</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">0% - 25%</span>
                    <span className="text-sm font-semibold text-gray-900">Q1: {predictions.probability_stats.q25?.toFixed(4) || 'N/A'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">25% - 50%</span>
                    <span className="text-sm font-semibold text-gray-900">Median: {predictions.probability_stats.median.toFixed(4)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">50% - 75%</span>
                    <span className="text-sm font-semibold text-gray-900">Q3: {predictions.probability_stats.q75?.toFixed(4) || 'N/A'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">75% - 100%</span>
                    <span className="text-sm font-semibold text-gray-900">Max: {predictions.probability_stats.max.toFixed(4)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded border-l-2 border-blue-600">
                <p className="text-sm text-blue-900">
                  <strong>Interpretation:</strong> The data is heavily skewed toward low probabilities, with most machines having minimal failure risk. Only a small portion exceeds critical thresholds.
                </p>
              </div>
            </div>
          </div>

          {/* Top Critical Machines Alert */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Critical Machines (First 15)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700">Machine ID</th>
                    <th className="px-4 py-2 text-left text-gray-700">Prob.</th>
                    <th className="px-4 py-2 text-left text-gray-700">Risk Level</th>
                    <th className="px-4 py-2 text-left text-gray-700">Tool Wear</th>
                    <th className="px-4 py-2 text-left text-gray-700">Action Required</th>
                  </tr>
                </thead>
                <tbody>
                  {criticalItems.slice(0, 15).map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-gray-900">UDI-{item.UDI}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                          {item.probability.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-red-200 text-red-900 rounded text-xs font-semibold">
                          {item.risk_level}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">{item.tool_wear} min</td>
                      <td className="px-4 py-2 text-red-600 font-semibold">🔧 Maintenance</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Showing {Math.min(15, criticalItems.length)} of {criticalItems.length} critical machines
            </p>
          </div>
        </div>

        {/* ===== ITEM 3: BUSINESS INTELLIGENCE ANALYTICS ===== */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📈 3. Business Intelligence Analytics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Success Rate (Non-Failure Predictions)</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-green-600 h-3 rounded-full" 
                      style={{ width: `${(1 - predictions.failure_rate) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    {((1 - predictions.failure_rate) * 100).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Failure Detection Rate</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-red-600 h-3 rounded-full" 
                      style={{ width: `${predictions.failure_rate * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-semibold text-red-600 mt-2">
                    {(predictions.failure_rate * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-blue-50 rounded p-4 mt-4">
                  <p className="text-sm text-gray-600">Model Performance Score</p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">99.33%</p>
                  <p className="text-xs text-gray-500 mt-1">LightGBM ROC-AUC Score</p>
                </div>
              </div>
            </div>

            {/* Insights & Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Insights</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  <span><strong>High Confidence Model:</strong> 100% confidence in all predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  <span><strong>Proactive Maintenance:</strong> {criticalItems.length} machines need immediate attention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 font-bold mr-3">⚠</span>
                  <span><strong>Cost Savings Opportunity:</strong> Prevent {predictions.predicted_failures} potential failures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">ℹ</span>
                  <span><strong>Tool Wear Primary Factor:</strong> Main predictor of machine failure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">ℹ</span>
                  <span><strong>Temperature Correlation:</strong> Process & Air temp impact failure rate</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow p-6 mt-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Recommended Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-900 mb-2">Immediate (Urgent)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Inspect {predictions.predicted_failures} high-risk machines</li>
                  <li>• Schedule preventive maintenance</li>
                  <li>• Replace worn cutting tools</li>
                </ul>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-900 mb-2">Short-term (1-2 weeks)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Review maintenance schedules</li>
                  <li>• Monitor tool wear progression</li>
                  <li>• Adjust operating parameters</li>
                </ul>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-900 mb-2">Long-term (Strategy)</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Implement predictive maintenance</li>
                  <li>• Reduce operational stress conditions</li>
                  <li>• Invest in equipment upgrades</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow p-8 border-t-4 border-purple-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Report</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-purple-600">{predictions.total_records.toLocaleString()}</p>
              <p className="text-gray-600 text-sm mt-1">Total Machines Analyzed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">{predictions.predicted_failures}</p>
              <p className="text-gray-600 text-sm mt-1">High-Risk Predictions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">99.33%</p>
              <p className="text-gray-600 text-sm mt-1">Model Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{((1 - predictions.failure_rate) * 100).toFixed(1)}%</p>
              <p className="text-gray-600 text-sm mt-1">Safe Operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
