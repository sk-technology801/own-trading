"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wallet, Home, BarChart, DollarSign, Settings } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "Markets", href: "/markets", icon: <BarChart size={18} /> },
  { name: "Trade", href: "/trade", icon: <DollarSign size={18} /> },
  { name: "Settings", href: "/settings", icon: <Settings size={18} /> },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [coinPrice, setCoinPrice] = useState("Loading...");

  // Fake live price ticker (replace with real API)
  useEffect(() => {
    const interval = setInterval(() => {
      const price = (Math.random() * 100000).toFixed(2);
      setCoinPrice(`₿ ${price}`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Ticker */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-white font-black text-2xl tracking-wider neon-text">
            TRADEX
          </Link>
          <div className="hidden md:block text-green-400 animate-pulse text-sm font-mono">
            Live BTC Price: {coinPrice}
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 flex items-center space-x-2
                ${
                  pathname === item.href
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center gap-2">
            <Wallet size={18} />
            Connect Wallet
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 p-4 space-y-4 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              } flex items-center gap-2`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2">
            <Wallet size={18} />
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
