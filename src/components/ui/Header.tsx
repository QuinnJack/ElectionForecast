import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="relative group inline-block overflow-hidden">
                <img
                  src="/black.png"
                  alt="Logo"
                  className="h-10 w-auto transition-all duration-700 ease-in-out transform group-hover:opacity-0 group-hover:scale-105"
                />
                <img
                  src="/color.png"
                  alt="Colored Logo"
                  className="absolute inset-0 h-10 w-auto opacity-0 transition-all duration-700 ease-in-out transform group-hover:opacity-100 group-hover:scale-105"
                />
              </span>
            </div>
            <nav className="ml-10">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/forecast"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200"
                  >
                    FORECAST
                  </Link>
                </li>
                <li>
                  <Link
                    to="/methodology"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200"
                  >
                    METHODOLOGY
                  </Link>
                </li>
                <li>
                  <Link
                    to="/simulator"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200"
                  >
                    SIMULATOR
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200"
            >
              ABOUT
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </header>
  );
};

export default Header;
