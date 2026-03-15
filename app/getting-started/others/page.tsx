'use client';

import Link from 'next/link';

export default function Others() {
  const resources = [
    {
      title: 'Documentation',
      description: 'Complete project documentation and technical guides',
      icon: '📖',
    },
    {
      title: 'API Reference',
      description: 'REST API endpoints and integration examples',
      icon: '🔌',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and troubleshooting',
      icon: '❓',
    },
    {
      title: 'Contact & Support',
      description: 'Get help from our team of experts',
      icon: '📧',
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
          <h1 className="text-4xl font-bold text-gray-900">Additional Resources</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="text-4xl mb-3">{resource.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/models" className="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition">
              <div className="font-semibold text-gray-900">View Current Models</div>
              <p className="text-sm text-gray-600 mt-1">Browse trained ML models and their metrics</p>
            </Link>

            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="font-semibold text-gray-900">Project Repository</div>
              <p className="text-sm text-gray-600 mt-1">GitHub repository coming soon</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="font-semibold text-gray-900">White Paper</div>
              <p className="text-sm text-gray-600 mt-1">Academic paper and research coming soon</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="font-semibold text-gray-900">Video Tutorials</div>
              <p className="text-sm text-gray-600 mt-1">Step-by-step video guides coming soon</p>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
          <p className="text-gray-700 mb-4">
            This is a comprehensive machine learning project focused on predicting equipment failures in industrial settings. 
            The project showcases modern ML practices including data preprocessing, model training, evaluation, and deployment.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <p className="text-sm text-gray-600 mt-1">ML Models</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5+</div>
              <p className="text-sm text-gray-600 mt-1">Sections</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">99%</div>
              <p className="text-sm text-gray-600 mt-1">Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
