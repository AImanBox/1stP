'use client';

import Link from 'next/link';

export default function ProblemStatement() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/getting-started" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back to Getting Started
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Problem Statement</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Machine Failure Prediction Challenge</h2>
          <p className="text-gray-700 mb-4">
            The goal of this project is to predict machine failures in industrial equipment using machine learning models. 
            By identifying patterns that lead to equipment failure, we can implement preventive maintenance strategies to reduce downtime and operational costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Objectives</h3>
            <ul className="text-gray-700 space-y-2">
              <li>✓ Predict machine failures accurately</li>
              <li>✓ Identify risk factors</li>
              <li>✓ Enable preventive maintenance</li>
              <li>✓ Reduce operational downtime</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">Impact</h3>
            <ul className="text-gray-700 space-y-2">
              <li>💰 Cost savings through prevention</li>
              <li>⏱️ Reduced equipment downtime</li>
              <li>🔧 Optimized maintenance schedules</li>
              <li>📊 Data-driven decisions</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-yellow-900 mb-3">Dataset</h3>
          <p className="text-gray-700 mb-3">
            Our dataset contains 10,000 records of machine operational parameters including:
          </p>
          <ul className="grid grid-cols-2 gap-2 text-gray-700">
            <li>• Air temperature</li>
            <li>• Process temperature</li>
            <li>• Rotational speed</li>
            <li>• Torque</li>
            <li>• Tool wear</li>
            <li>• Various failure modes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
