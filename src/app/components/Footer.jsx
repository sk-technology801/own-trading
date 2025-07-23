"use client";
import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black text-white px-6 py-12 overflow-hidden">
      {/* Glowing animated background */}
      <div className="absolute inset-0 z-0 opacity-20 animate-pulse bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00f2ff44] via-transparent to-black blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">TradeProX</h2>
          <p className="text-gray-400 leading-relaxed">
            Elevate your crypto trading with real-time analytics, smart orders,
            and global insights.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="/trade" className="hover:text-cyan-400 transition">Trade</a></li>
            <li><a href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</a></li>
            <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
          <p className="flex items-center gap-2 text-gray-400">
            <Mail size={18} /> support@tradeprox.io
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <Phone size={18} /> +1 (555) 987-6543
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <Globe size={18} /> www.tradeprox.io
          </p>

          <div className="flex gap-4 mt-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-cyan-500/10 border border-cyan-500 rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-600 text-sm relative z-10">
        © {new Date().getFullYear()} TradeProX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
