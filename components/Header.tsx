import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600">
              Machine Failure Predictions
            </h1>
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/models" className="text-gray-600 hover:text-gray-900">
                Models
              </Link>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
