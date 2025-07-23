'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TrendingUp, ArrowUpRight, Bitcoin, Activity, BarChart2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MarketPage = () => {
  const [price, setPrice] = useState(27382);
  const [prices, setPrices] = useState(Array.from({ length: 12 }, (_, i) => price + i * 10));

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 100 - 50);
      setPrice((prev) => prev + fluctuation);
      setPrices((prev) => [...prev.slice(1), price + fluctuation]);
    }, 3000);
    return () => clearInterval(interval);
  }, [price]);

  const data = {
    labels: Array.from({ length: prices.length }, (_, i) => `T-${i}`),
    datasets: [
      {
        label: 'BTC/USDT',
        data: prices,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: '#00ff99',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a1a1a] text-white px-4 md:px-12 pt-20 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg')] bg-cover opacity-10 pointer-events-none"></div>

      {/* Hero */}
      <div className="text-center mb-16 z-10 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#00ff99]">
          Live Crypto Market
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
          Stay updated with the real-time prices and market trends across top cryptocurrencies.
        </p>
        <div className="mt-6 inline-block bg-[#00ff99]/10 px-6 py-2 rounded-full border border-[#00ff99] font-bold">
          BTC/USDT: <span className="text-[#00ff99]">${price.toLocaleString()}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#111] p-6 rounded-2xl shadow-xl backdrop-blur-md z-10 relative">
        <Line data={data} />
      </div>

      {/* Trending Coins */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10 relative">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] hover:border-[#00ff99] transition-all group shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-[#00ff99]">BTC</div>
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <div className="mt-2 text-gray-400">Bitcoin</div>
            <div className="mt-4 text-xl font-semibold">${(price + i * 120).toLocaleString()}</div>
            <div className="mt-1 flex items-center text-sm text-green-400">
              <ArrowUpRight className="w-4 h-4" /> +{(Math.random() * 5).toFixed(2)}%
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mt-24 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#00ff99]">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <TrendingUp />, title: "Live Updates", desc: "Real-time crypto data synced with APIs." },
            { icon: <Activity />, title: "Advanced Analytics", desc: "Interactive charts & watchlists." },
            { icon: <BarChart2 />, title: "Secure Trading", desc: "Encrypted trading with user-level access." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-[#1f1f1f] p-6 rounded-xl hover:border-[#00ff99] transition"
            >
              <div className="text-[#00ff99] mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MarketPage;
