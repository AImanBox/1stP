'use client';

import Link from 'next/link';

export default function GettingStarted() {
  const sections = [
    {
      id: 1,
      title: 'Problem Statement',
      description: 'Understand the machine failure prediction problem and objectives',
      icon: '📋',
      href: '/getting-started/problem-statement',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Exploratory Data Analysis (EDA)',
      description: 'Dive deep into data exploration and visualization',
      icon: '📊',
      href: '/getting-started/eda',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 3,
      title: 'Modeling (Current Models)',
      description: 'Review trained models and their performance',
      icon: '🤖',
      href: '/models',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 4,
      title: 'Model Implementation',
      description: 'Learn about model deployment and integration',
      icon: '⚙️',
      href: '/getting-started/implementation',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 5,
      title: 'Failure Predictions',
      description: 'Real-time risk assessment and maintenance alerts',
      icon: '⚠️',
      href: '/getting-started/failure-predictions',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 6,
      title: 'Others',
      description: 'Additional resources and documentation',
      icon: '📚',
      href: '/getting-started/others',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
            ← Back Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Getting Started</h1>
          <p className="text-lg text-gray-600">
            Explore the machine failure prediction project step by step
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.id} href={section.href}>
              <div className="group h-full cursor-pointer">
                <div className={`bg-gradient-to-br ${section.color} rounded-lg shadow-lg p-8 h-full transform transition hover:shadow-xl hover:scale-105`}>
                  <div className="text-5xl mb-4">{section.icon}</div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                    <p className="text-white/90">{section.description}</p>
                    <div className="mt-4 flex items-center text-white/75 group-hover:text-white transition">
                      <span>Explore</span>
                      <span className="ml-2 transform group-hover:translate-x-1 transition">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
