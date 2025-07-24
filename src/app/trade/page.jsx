'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TrendingUp, Bitcoin, ArrowUpRight, DollarSign, ShoppingCart, Sun, Moon } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const TradePage = () => {
  const [price, setPrice] = useState(27382);
  const [prices, setPrices] = useState(Array.from({ length: 12 }, (_, i) => price + i * 10));
  const [orderType, setOrderType] = useState('buy');
  const [tradeType, setTradeType] = useState('market');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [tradingPair, setTradingPair] = useState('BTC/USDT');
  const [balance, setBalance] = useState({ btc: 1.5, usdt: 50000 });
  const [orderBook, setOrderBook] = useState({
    bids: Array.from({ length: 10 }, (_, i) => ({ price: price - i * 10, amount: Math.random() * 10 })),
    asks: Array.from({ length: 10 }, (_, i) => ({ price: price + i * 10, amount: Math.random() * 10 }))
  });
  const [recentTrades, setRecentTrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 100 - 50);
      const newPrice = tradingPair === 'BTC/USDT' ? price + fluctuation : price + fluctuation * 0.1;
      setPrice(newPrice);
      setPrices((prev) => [...prev.slice(1), newPrice]);
      setOrderBook({
        bids: Array.from({ length: 10 }, (_, i) => ({ price: newPrice - i * 10, amount: Math.random() * 10 })),
        asks: Array.from({ length: 10 }, (_, i) => ({ price: newPrice + i * 10, amount: Math.random() * 10 }))
      });
      setRecentTrades((prev) => [
        {
          id: Math.random(),
          type: Math.random() > 0.5 ? 'buy' : 'sell',
          price: newPrice,
          amount: Math.random() * 5,
          time: new Date().toLocaleTimeString(),
          pair: tradingPair
        },
        ...prev.slice(0, 9)
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [price, tradingPair]);

  const data = {
    labels: Array.from({ length: prices.length }, (_, i) => `T-${i}`),
    datasets: [
      {
        label: tradingPair,
        data: prices,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: '#00ff99',
        tension: 0.3
      }
    ]
  };

  const depthData = {
    labels: [...orderBook.bids.map(b => b.price).reverse(), ...orderBook.asks.map(a => a.price)],
    datasets: [
      {
        label: 'Bids',
        data: orderBook.bids.map(b => ({ x: b.price, y: b.amount })).reverse(),
        backgroundColor: 'rgba(0, 255, 153, 0.4)',
        borderColor: '#00ff99',
        type: 'bar'
      },
      {
        label: 'Asks',
        data: orderBook.asks.map(a => ({ x: a.price, y: a.amount })),
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: '#ff3366',
        type: 'bar'
      }
    ]
  };

  const handleTrade = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (tradeType === 'limit' && (!limitPrice || isNaN(limitPrice) || limitPrice <= 0)) {
      alert('Please enter a valid limit price');
      return;
    }
    const tradePrice = tradeType === 'market' ? price : parseFloat(limitPrice);
    const cost = tradePrice * parseFloat(amount);
    if (orderType === 'buy' && cost > balance.usdt) {
      alert('Insufficient USDT balance');
      return;
    }
    if (orderType === 'sell' && parseFloat(amount) > balance.btc) {
      alert('Insufficient BTC balance');
      return;
    }
    setShowModal(true);
  };

  const confirmTrade = () => {
    const tradePrice = tradeType === 'market' ? price : parseFloat(limitPrice);
    const cost = tradePrice * parseFloat(amount);
    setBalance((prev) => ({
      btc: orderType === 'buy' ? prev.btc + parseFloat(amount) : prev.btc - parseFloat(amount),
      usdt: orderType === 'buy' ? prev.usdt - cost : prev.usdt + cost
    }));
    setRecentTrades((prev) => [
      {
        id: Math.random(),
        type: orderType,
        price: tradePrice,
        amount: parseFloat(amount),
        time: new Date().toLocaleTimeString(),
        pair: tradingPair
      },
      ...prev.slice(0, 9)
    ]);
    setAmount('');
    setLimitPrice('');
    setShowModal(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
          Trade {tradingPair}
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-4 text-lg max-w-2xl mx-auto`}>
          Execute trades with real-time market data and secure transactions.
        </p>
        <div className="mt-6 inline-block bg-[#00ff99]/10 px-6 py-2 rounded-full border border-[#00ff99] font-bold">
          {tradingPair}: <span className="text-[#00ff99]">${price.toLocaleString()}</span>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-[#111] rounded-xl p-6 mb-8 z-10 relative border border-[#222]">
        <h2 className="text-xl font-bold text-[#00ff99] mb-4">Wallet Balance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400">{tradingPair.split('/')[0]}:</span> <span>{balance.btc.toFixed(4)}</span>
          </div>
          <div>
            <span className="text-gray-400">USDT:</span> <span>{balance.usdt.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 relative">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#111] p-6 rounded-2xl shadow-xl backdrop-blur-md">
          <select
            className="mb-4 bg-[#1a1a1a] text-white border border-[#222] rounded-lg p-2"
            value={tradingPair}
            onChange={(e) => setTradingPair(e.target.value)}
          >
            <option>BTC/USDT</option>
            <option>ETH/USDT</option>
          </select>
          <Line data={data} />
        </div>

        {/* Order Form */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] shadow-md">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4">Place Order</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${orderType === 'buy' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setOrderType('buy')}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${orderType === 'sell' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setOrderType('sell')}
            >
              Sell
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${tradeType === 'market' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setTradeType('market')}
            >
              Market
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${tradeType === 'limit' ? 'bg-[#00ff99] text-black' : 'bg-[#111] text-white'}`}
              onClick={() => setTradeType('limit')}
            >
              Limit
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Amount ({tradingPair.split('/')[0]})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
              placeholder="0.00"
            />
          </div>
          {tradeType === 'limit' && (
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Limit Price (USDT)</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
                placeholder="0.00"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Price (USDT)</label>
            <input
              type="text"
              value={tradeType === 'market' ? price.toLocaleString() : limitPrice}
              readOnly
              className="w-full bg-[#111] border border-[#222] rounded-lg p-2 text-white"
            />
          </div>
          <button
            className="w-full bg-[#00ff99] text-black py-2 rounded-lg font-semibold hover:bg-[#00cc77] transition"
            onClick={handleTrade}
          >
            {orderType === 'buy' ? `Buy ${tradingPair.split('/')[0]}` : `Sell ${tradingPair.split('/')[0]}`}
          </button>
        </div>
      </div>

      {/* Order Book & Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 z-10 relative">
        {/* Order Book */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] shadow-md">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4">Order Book</h2>
          <div className="mb-4">
            <Line
              data={depthData}
              options={{
                scales: {
                  x: { title: { display: true, text: 'Price (USDT)' } },
                  y: { title: { display: true, text: `Amount (${tradingPair.split('/')[0]})` } }
                }
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-400 mb-2">
            <span>Price (USDT)</span>
            <span>Amount ({tradingPair.split('/')[0]})</span>
            <span>Total (USDT)</span>
          </div>
          <div className="mb-4">
            <h3 className="text-green-400 font-semibold">Bids</h3>
            {orderBook.bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-green-400">{bid.price.toLocaleString()}</span>
                <span>{bid.amount.toFixed(4)}</span>
                <span>{(bid.price * bid.amount).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-red-400 font-semibold">Asks</h3>
            {orderBook.asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-red-400">{ask.price.toLocaleString()}</span>
                <span>{ask.amount.toFixed(4)}</span>
                <span>{(ask.price * ask.amount).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] shadow-md">
          <h2 className="text-xl font-bold text-[#00ff99] mb-4">Recent Trades</h2>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-400 mb-2">
            <span>Price (USDT)</span>
            <span>Amount ({tradingPair.split('/')[0]})</span>
            <span>Type</span>
            <span>Time</span>
          </div>
          {recentTrades.map((trade) => (
            <div key={trade.id} className="grid grid-cols-4 gap-2 text-sm">
              <span className={trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}>{trade.price.toLocaleString()}</span>
              <span>{trade.amount.toFixed(4)}</span>
              <span className={trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}>{trade.type.toUpperCase()}</span>
              <span>{trade.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] max-w-md w-full">
            <h2 className="text-xl font-bold text-[#00ff99] mb-4">Confirm Trade</h2>
            <p className="text-gray-400 mb-4">
              {orderType.toUpperCase()} {amount} {tradingPair.split('/')[0]} at {tradeType === 'market' ? 'market price' : `limit price ${limitPrice} USDT`}
            </p>
            <p className="text-gray-400 mb-4">
              Total: {(tradeType === 'market' ? price * parseFloat(amount) : parseFloat(limitPrice) * parseFloat(amount)).toLocaleString()} USDT
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-[#00ff99] text-black py-2 rounded-lg font-semibold hover:bg-[#00cc77]"
                onClick={confirmTrade}
              >
                Confirm
              </button>
              <button
                className="flex-1 bg-[#111] text-white py-2 rounded-lg font-semibold hover:bg-[#222]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <section className="mt-24 z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#00ff99]">Why Trade With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <TrendingUp />, title: "Real-Time Trading", desc: "Execute trades with live market data." },
            { icon: <DollarSign />, title: "Low Fees", desc: "Competitive trading fees for maximum value." },
            { icon: <ShoppingCart />, title: "Instant Execution", desc: "Fast and secure trade execution." },
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

export default TradePage;