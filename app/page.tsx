import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Welcome to Capstone Web App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern web application for exploring and comparing AI models and their performance metrics.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/models">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
          <button className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
