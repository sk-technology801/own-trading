
'use client';
import React, { useState } from 'react';
import { User, Palette, Bell, DollarSign, Save, X, Sun, Moon } from 'lucide-react';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark');
  const [username, setUsername] = useState('CryptoTrader');
  const [email, setEmail] = useState('trader@example.com');
  const [defaultPair, setDefaultPair] = useState('BTC/USDT');
  const [defaultOrderType, setDefaultOrderType] = useState('market');
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
  });
  const [isSaved, setIsSaved] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSave = () => {
    // Simulate saving settings to a backend or local storage
    console.log('Saving settings:', { username, email, defaultPair, defaultOrderType, notifications });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3 seconds
  };

  const handleCancel = () => {
    // Reset to default values
    setUsername('CryptoTrader');
    setEmail('trader@example.com');
    setDefaultPair('BTC/USDT');
    setDefaultOrderType('market');
    setNotifications({ email: true, inApp: true });
    setIsSaved(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-black via-[#0c0c0c] to-[#1a1a1a] text-white' : 'bg-gradient-to-br from-gray-100 to-gray-300 text-black'} px-4 md:px-12 pt-20 pb-32 relative overflow-hidden`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg')] bg-cover opacity-10 pointer-events-none"></div>
      )}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-[#00ff99]/20 text-[#00ff99]"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>

      {/* Hero */}
      <div className="text-center mb-16 z-10 relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#00ff99]">
          Settings
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-4 text-lg max-w-2xl mx-auto`}>
          Customize your trading experience and manage your account preferences.
        </p>
      </div>

      {/* Settings Form */}
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl p-8 border border-[#222] shadow-md z-10 relative">
        {/* Profile Settings */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4 flex items-center">
            <User className="w-6 h-6 mr-2" /> Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
                placeholder="Enter email"
              />
            </div>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4 flex items-center">
            <Palette className="w-6 h-6 mr-2" /> Theme
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Theme Mode:</span>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${theme === 'dark' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setTheme('dark')}
            >
              Dark
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${theme === 'light' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setTheme('light')}
            >
              Light
            </button>
          </div>
        </section>

        {/* Trading Preferences */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" /> Trading Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-1">Default Trading Pair</label>
              <select
                value={defaultPair}
                onChange={(e) => setDefaultPair(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
              >
                <option>BTC/USDT</option>
                <option>ETH/USDT</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Default Order Type</label>
              <select
                value={defaultOrderType}
                onChange={(e) => setDefaultOrderType(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
              >
                <option value="market">Market</option>
                <option value="limit">Limit</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4 flex items-center">
            <Bell className="w-6 h-6 mr-2" /> Notifications
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="w-4 h-4 bg-[#111] border-[#222] text-[#00ff99] rounded"
              />
              <span className="text-gray-400">Email Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.inApp}
                onChange={(e) => setNotifications({ ...notifications, inApp: e.target.checked })}
                className="w-4 h-4 bg-[#111] border-[#222] text-[#00ff99] rounded"
              />
              <span className="text-gray-400">In-App Notifications</span>
            </label>
          </div>
        </section>

        {/* Save/Cancel Buttons */}
        <div className="flex gap-4">
          <button
            className="flex-1 bg-[#00ff99] text-black py-2 rounded-lg font-semibold hover:bg-[#00cc77] transition flex items-center justify-center"
            onClick={handleSave}
          >
            <Save className="w-5 h-5 mr-2" /> Save Changes
          </button>
          <button
            className="flex-1 bg-[#111] text-white py-2 rounded-lg font-semibold hover:bg-[#222] transition flex items-center justify-center"
            onClick={handleCancel}
          >
            <X className="w-5 h-5 mr-2" /> Cancel
          </button>
        </div>

        {/* Success Message */}
        {isSaved && (
          <div className="mt-4 text-center text-[#00ff99] font-semibold">
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
