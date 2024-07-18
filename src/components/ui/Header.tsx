import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    { to: "/forecast", text: "FORECAST" },
    { to: "/simulator", text: "SIMULATOR" },
    { to: "/methodology", text: "METHODOLOGY" },
  ];

  return (
    <header className="bg-white">
      <div className="container mx-auto px-24">
        <div className="flex items-center justify-between h-20">
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
            <nav className="ml-6">
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200 block"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium uppercase font-mono transition-colors duration-200 block"
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
