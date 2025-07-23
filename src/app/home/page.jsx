
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, ShieldCheck, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Tilt } from '@jdion/tilt-react';

const features = [
  {
    icon: <TrendingUp size={32} />,
    title: "Live Market Data",
    desc: "Access real-time crypto price updates from top exchanges.",
    risk: "Low",
  },
  {
    icon: <Wallet size={32} />,
    title: "Connect Wallet",
    desc: "Securely connect your wallet to start trading in seconds.",
    risk: "Medium",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Trading",
    desc: "End-to-end encrypted transactions with multi-layer security.",
    risk: "Low",
  },
];

const marketData = [
  { symbol: "BTC", price: 57210, change: 2.34 },
  { symbol: "ETH", price: 3620, change: -1.45 },
  { symbol: "XRP", price: 0.59, change: 0.78 },
  { symbol: "ADA", price: 1.25, change: 1.12 },
  { symbol: "SOL", price: 112, change: -0.65 },
  { symbol: "DOT", price: 8.52, change: 0.45 },
];

export default function HomePage() {
  const [particles, setParticles] = useState([]);
  const [market, setMarket] = useState(marketData);
  const [sentiment, setSentiment] = useState("Bullish");
  const [lensFlare, setLensFlare] = useState({ x: 0, y: 0, intensity: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Simulate real-time market updates and particles
  useEffect(() => {
    const marketInterval = setInterval(() => {
      setMarket((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * (item.symbol === "BTC" || item.symbol === "ETH" ? 10 : 0.1),
          change: (Math.random() - 0.5) * 5,
        }))
      );
      setSentiment(Math.random() > 0.5 ? "Bullish" : "Bearish");
    }, 3000);

    const particleInterval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          x: mouseRef.current.x + (Math.random() - 0.5) * 100,
          y: mouseRef.current.y + (Math.random() - 0.5) * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        },
      ]);
    }, 2000);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setLensFlare({
        x: e.clientX,
        y: e.clientY,
        intensity: Math.sin(Date.now() * 0.001) * 0.3 + 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(marketInterval);
      clearInterval(particleInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Play sound effect with pitch variation
  const playSound = (type = "click") => {
    if (typeof Audio !== "undefined") {
      const soundUrl =
        type === "hover"
          ? "https://assets.mixkit.co/sfx/preview/mixkit-ui-hover-2640.mp3"
          : type === "click"
          ? "https://assets.mixkit.co/sfx/preview/mixkit-click-ui-1254.mp3"
          : "https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-interface-1244.mp3";
      const sound = new Audio(soundUrl);
      sound.playbackRate = type === "hover" ? 1.2 : type === "click" ? 1 : 0.8;
      sound.play().catch(() => {});
    }
  };

  // Haptic feedback simulation
  const triggerHaptic = () => {
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(50);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background with Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?_gl=1*1db2dvu*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTMzMDM4ODUkbzQwJGcxJHQxNzUzMzAzOTU0JGo1OSRsMCRoMA.."
          alt="Crypto Trading Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-blue/30 via-neon-purple/30 to-neon-blue/30 animate-pulse-quantum" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 bg-repeat" />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-neon-blue/30 rounded-full"
            style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size, opacity: particle.opacity }}
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        ))}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-neon-blue/30 animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-3xl"
          style={{ left: lensFlare.x - 128, top: lensFlare.y - 128 }}
          animate={{ opacity: lensFlare.intensity }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Overlay */}
      <div className="relative z-10 px-6 py-16 lg:px-24 flex flex-col items-center text-center">
        {/* Hero */}
        <Tilt max={30} scale={1.3}>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent drop-shadow-quantum-glow"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            onMouseEnter={() => playSound("hover")}
            onClick={() => {
              playSound("click");
              triggerHaptic();
            }}
            aria-label="TradeXpert Pro Hero Title"
          >
            Trade Smarter. Faster. Safer.
          </motion.h1>
        </Tilt>
        <motion.p
          className="mt-6 max-w-xl text-lg text-gray-300 drop-shadow-quantum-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to your next-gen crypto trading platform. Get started with real-time prices and blazing-fast execution.
        </motion.p>
        <Tilt max={25} scale={1.2}>
          <motion.button
            className="mt-8 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3 px-8 rounded-xl shadow-quantum-glow hover:shadow-lens-flare transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound("click");
              triggerHaptic();
            }}
            onMouseEnter={() => playSound("hover")}
            aria-label="Start Trading Button"
          >
            Start Trading
          </motion.button>
        </Tilt>

        {/* Ticker */}
        <motion.div
          className="mt-12 w-full overflow-x-auto whitespace-nowrap border-t border-b py-2 border-neon-purple/50 bg-gray-900/50 backdrop-blur-sm shadow-quantum-glow"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="animate-marquee inline-block space-x-12 text-sm">
            {market.map((item) => (
              <motion.span
                key={item.symbol}
                className="inline-flex items-center space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-bold text-gray-300 uppercase">{item.symbol}</span>
                <span>${item.price.toLocaleString()}</span>
                <span className={`flex items-center ${item.change >= 0 ? "text-green-400" : "text-neon-red"}`}>
                  {item.change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(item.change).toFixed(2)}%
                </span>
              </motion.span>
            ))}
            <motion.span
              className={`ml-12 font-semibold ${sentiment === "Bullish" ? "text-green-400" : "text-neon-red"} drop-shadow-quantum-glow`}
              animate={{ scale: sentiment === "Bullish" ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Sentiment: {sentiment}
            </motion.span>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {features.map((item, index) => (
            <Tilt key={index} max={25} scale={1.2}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
                }}
                className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-2xl border border-neon-purple/30 shadow-quantum-glow hover:shadow-lens-flare transition duration-300"
                onMouseEnter={() => playSound("hover")}
                onClick={() => {
                  playSound("click");
                  triggerHaptic();
                }}
                aria-label={`Feature: ${item.title}`}
              >
                <div className="text-neon-blue mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-quantum-glow">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
                <div className="mt-4 text-xs">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold ${
                      item.risk === "Low"
                        ? "bg-green-500/20 text-green-400"
                        : item.risk === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-neon-red/20 text-neon-red"
                    }`}
                  >
                    Risk: {item.risk}
                  </span>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
