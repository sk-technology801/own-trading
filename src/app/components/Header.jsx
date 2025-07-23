"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, stagger } from 'framer-motion';
import Link from 'next/link';
import { Sun, Moon, User, Menu, X, BarChart3, Wallet, Settings, Bell, Search, ChevronDown, Eye, EyeOff, Globe, Zap, Mic } from 'lucide-react';
import { Tilt } from '@jdion/tilt-react';

// Custom Trading Chart SVG Icon (Animated)
const PortfolioIcon = ({ isHovered }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h18v18H3z" />
    <motion.path
      d="M7 16l3-6 3 4 4-5"
      animate={{ y: isHovered ? -2 : 0 }}
      transition={{ duration: 0.3 }}
    />
    <path d="M7 16h10" />
    <path d="M17 11v5" />
  </svg>
);

// Header component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [balance, setBalance] = useState(125847.32);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [marketStatus, setMarketStatus] = useState('open');
  const [notifications, setNotifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  // Market data simulation
  const [marketData, setMarketData] = useState([
    { symbol: 'BTC', price: 43250.12, change: 2.34 },
    { symbol: 'ETH', price: 2834.56, change: -1.23 },
    { symbol: 'AAPL', price: 185.92, change: 0.78 },
  ]);

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());

    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Simulate market data updates
    const marketInterval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 5,
        }))
      );
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(timeInterval);
      clearInterval(marketInterval);
    };
  }, []);

  // Play sound effect
  const playSound = (type = 'click') => {
    if (typeof Audio !== 'undefined') {
      const soundUrl =
        type === 'hover'
          ? 'https://assets.mixkit.co/sfx/preview/mixkit-ui-hover-2640.mp3'
          : 'https://assets.mixkit.co/sfx/preview/mixkit-click-ui-1254.mp3';
      const sound = new Audio(soundUrl);
      sound.play().catch(() => {});
    }
  };

  // Haptic feedback simulation
  const triggerHaptic = () => {
    if (typeof navigator.vibrate === 'function') {
      navigator.vibrate(50);
    }
  };

  // Navigation links
  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/trading', label: 'Trading', icon: Zap },
    { href: '/portfolio', label: 'Portfolio', icon: PortfolioIcon },
    { href: '/markets', label: 'Markets', icon: Globe },
    { href: '/analytics', label: 'Analytics', icon: Settings },
  ];

  // Profile dropdown items
  const profileItems = [
    { label: 'Account Settings', href: '/settings', icon: Settings },
    { label: 'Preferences', href: '/preferences', icon: User },
    { label: 'Sign Out', href: '/logout', icon: null },
  ];

  // Animation for gradient background
  const gradientAnimation = {
    background: [
      'linear-gradient(90deg, #00ddeb, #d946ef, #00ddeb)',
      'linear-gradient(90deg, #d946ef, #00ddeb, #d946ef)',
      'linear-gradient(90deg, #00ddeb, #d946ef, #00ddeb)',
    ],
  };

  // Stagger animation for nav links
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 10 } },
  };

  return (
    <motion.header
      animate={gradientAnimation}
      transition={{ duration: 3, repeat: Infinity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-neon-purple/50 shadow-holo-glow'
          : 'bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,221,235,0.2),transparent)] animate-pulse-holo" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.15),transparent)] animate-pulse-holo" />
      </div>

      {/* Top Status Bar */}
      <div className="bg-gradient-to-r from-holo-blue to-holo-purple px-4 py-1 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-2 h-2 rounded-full mr-2 ${
                  marketStatus === 'open' ? 'bg-green-400' : 'bg-neon-red'
                }`}
              />
              Market {marketStatus === 'open' ? 'Open' : 'Closed'}
            </span>
            <div className="hidden md:flex items-center space-x-6">
              {marketData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex items-center space-x-1"
                >
                  <span className="font-semibold drop-shadow-holo-glow">{item.symbol}</span>
                  <span>${item.price.toFixed(2)}</span>
                  <motion.span
                    animate={{ y: item.change >= 0 ? -3 : 3 }}
                    transition={{ duration: 0.3 }}
                    className={`${item.change >= 0 ? 'text-green-300' : 'text-neon-red'} drop-shadow-holo-glow`}
                  >
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-right drop-shadow-holo-glow">Server Time: {currentTime}</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center space-x-4"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <Tilt max={25} scale={1.2}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-holo-glow"
                  >
                    <Zap className="w-6 h-6 text-white drop-shadow-holo-glow" />
                  </motion.div>
                </Tilt>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-black bg-gradient-to-r from-white to-neon-blue bg-clip-text text-transparent drop-shadow-holo-glow">
                    TradeRiser
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">Quantum Trading</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center space-x-1"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              {navigationItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Tilt key={idx} max={20} scale={1.1} speed={300}>
                    <motion.div variants={linkVariants}>
                      <Link
                        href={item.href}
                        className="relative px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-all duration-200 group border border-neon-purple/30 hover:border-neon-purple/80 shadow-holo-glow"
                        onMouseEnter={() => {
                          triggerHaptic();
                          playSound('hover');
                        }}
                        onClick={() => playSound('click')}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform drop-shadow-holo-glow" isHovered={true} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    </motion.div>
                  </Tilt>
                );
              })}
            </motion.nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Balance Display */}
              <Tilt max={25} scale={1.2}>
                <motion.div
                  className="hidden md:flex items-center space-x-2 bg-gray-900/50 rounded-xl px-4 py-2 border border-neon-purple/50 shadow-holo-glow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Wallet className="w-4 h-4 text-neon-blue drop-shadow-holo-glow" />
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">Balance</span>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setIsBalanceVisible(!isBalanceVisible);
                          playSound('click');
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                        onMouseEnter={() => playSound('hover')}
                      >
                        {isBalanceVisible ? <Eye className="w-3 h-3 drop-shadow-holo-glow" /> : <EyeOff className="w-3 h-3 drop-shadow-holo-glow" />}
                      </motion.button>
                    </div>
                    <motion.div
                      animate={{ opacity: isBalanceVisible ? 1 : 0.5 }}
                      className="text-sm font-bold text-white drop-shadow-holo-glow"
                    >
                      {isBalanceVisible ? `$${balance.toLocaleString()}` : '••••••'}
                    </motion.div>
                  </div>
                </motion.div>
              </Tilt>

              {/* Voice Command Toggle */}
              <Tilt max={25} scale={1.2}>
                <motion.button
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsVoiceActive(!isVoiceActive);
                    playSound('click');
                  }}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isVoiceActive
                      ? 'bg-neon-blue text-white shadow-holo-glow'
                      : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border-neon-purple/50 hover:border-neon-purple'
                  } border`}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Mic className="w-5 h-5 drop-shadow-holo-glow" />
                </motion.button>
              </Tilt>

              {/* Search */}
              <div ref={searchRef} className="relative">
                <Tilt max={25} scale={1.2}>
                  <motion.button
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsSearchOpen(!isSearchOpen);
                      playSound('click');
                    }}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isSearchOpen
                        ? 'bg-neon-blue text-white shadow-holo-glow'
                        : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 border-neon-purple/50 hover:border-neon-purple'
                    } border`}
                    onMouseEnter={() => playSound('hover')}
                  >
                    <Search className="w-5 h-5 drop-shadow-holo-glow" />
                  </motion.button>
                </Tilt>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                      className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-neon-purple/50 shadow-holo-glow"
                    >
                      <div className="p-4">
                        <input
                          type="text"
                          placeholder="Search stocks, crypto, forex..."
                          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-neon-purple/50 focus:border-neon-blue focus:outline-none transition-colors drop-shadow-holo-glow"
                          autoFocus
                        />
                        <div className="mt-3 space-y-2">
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold drop-shadow-holo-glow">
                            AI-Powered Suggestions
                          </div>
                          {['AAPL', 'TSLA', 'BTC/USD', 'ETH/USD'].map((symbol, idx) => (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.1 }}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-neon-blue transition-colors"
                              onClick={() => playSound('click')}
                              onMouseEnter={() => playSound('hover')}
                            >
                              {symbol}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <Tilt max={25} scale={1.2}>
                <motion.button
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl border border-neon-purple/50 hover:border-neon-purple transition-all duration-200 shadow-holo-glow"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                >
                  <Bell className="w-5 h-5 drop-shadow-holo-glow" />
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-neon-red text-white text-xs rounded-full flex items-center justify-center animate-pulse-holo shadow-holo-glow"
                    >
                      {notifications}
                    </motion.span>
                  )}
                </motion.button>
              </Tilt>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative">
                <Tilt max={25} scale={1.2}>
                  <motion.button
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      playSound('click');
                    }}
                    className="flex items-center space-x-2 p-2 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl border border-neon-purple/50 hover:border-neon-purple transition-all duration-200 group shadow-holo-glow"
                    onMouseEnter={() => playSound('hover')}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center shadow-holo-glow">
                      <User className="w-4 h-4 text-white drop-shadow-holo-glow" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-200 ${
                        isProfileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>
                </Tilt>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                      className="absolute right-0 top-12 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-neon-purple/50 shadow-holo-glow"
                    >
                      <div className="p-4 border-b border-neon-purple/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-holo-glow">
                            <User className="w-6 h-6 text-white drop-shadow-holo-glow" />
                          </div>
                          <div>
                            <div className="font-semibold text-white drop-shadow-holo-glow">John Trader</div>
                            <div className="text-sm text-gray-400">Quantum Account</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {profileItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-neon-blue transition-colors ${
                              item.label === 'Sign Out' ? 'hover:bg-neon-red/20 hover:text-neon-red' : ''
                            }`}
                            onClick={() => {
                              setIsProfileOpen(false);
                              playSound('click');
                            }}
                            onMouseEnter={() => playSound('hover')}
                          >
                            {item.icon && <item.icon className="w-4 h-4 drop-shadow-holo-glow" />}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <Tilt max={25} scale={1.2}>
                <motion.button
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    playSound('click');
                  }}
                  className="lg:hidden p-2 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl border border-neon-purple/50 hover:border-neon-purple transition-all duration-200 shadow-holo-glow"
                  onMouseEnter={() => playSound('hover')}
                >
                  {isMenuOpen ? <X className="w-5 h-5 drop-shadow-holo-glow" /> : <Menu className="w-5 h-5 drop-shadow-holo-glow" />}
                </motion.button>
              </Tilt>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-t border-neon-purple/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-neon-blue hover:bg-gray-800/50 transition-all duration-200 border border-neon-purple/30 hover:border-neon-purple shadow-holo-glow"
                    onClick={() => {
                      setIsMenuOpen(false);
                      playSound('click');
                    }}
                    onMouseEnter={() => playSound('hover')}
                  >
                    <Icon className="w-5 h-5 drop-shadow-holo-glow" isHovered={true} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              {/* Mobile Balance */}
              <Tilt max={25} scale={1.2}>
                <motion.div
                  className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-neon-purple/50 shadow-holo-glow"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Account Balance</div>
                      <motion.div
                        animate={{ opacity: isBalanceVisible ? 1 : 0.5 }}
                        className="text-lg font-bold text-white drop-shadow-holo-glow"
                      >
                        {isBalanceVisible ? `$${balance.toLocaleString()}` : '••••••••'}
                      </motion.div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setIsBalanceVisible(!isBalanceVisible);
                        playSound('click');
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      onMouseEnter={() => playSound('hover')}
                    >
                      {isBalanceVisible ? <Eye className="w-4 h-4 drop-shadow-holo-glow" /> : <EyeOff className="w-4 h-4 drop-shadow-holo-glow" />}
                    </motion.button>
                  </div>
                </motion.div>
              </Tilt>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
