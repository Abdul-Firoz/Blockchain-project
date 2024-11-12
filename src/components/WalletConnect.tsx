import React, { useState } from 'react';
import { Wallet, ChevronDown, LogOut } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
  balance?: string;
}

export default function WalletConnect({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  balance
}: WalletConnectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isConnected) {
    return (
      <button
        onClick={onConnect}
        className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
      >
        <Wallet className="w-5 h-5" />
        <span className="font-medium">Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-6 py-3 rounded-full bg-indigo-600/20 text-white backdrop-blur-md border border-indigo-400/30 hover:bg-indigo-600/30 transition-all duration-300"
      >
        <Wallet className="w-5 h-5 text-indigo-300" />
        <span className="font-medium">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
        <ChevronDown className="w-4 h-4 text-indigo-300" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <div className="text-sm text-gray-500">Connected Wallet</div>
            <div className="font-medium text-gray-900 break-all">
              {walletAddress}
            </div>
          </div>
          {balance && (
            <div className="px-4 py-2 border-b">
              <div className="text-sm text-gray-500">Balance</div>
              <div className="font-medium text-gray-900">{balance} XLM</div>
            </div>
          )}
          <button
            onClick={() => {
              onDisconnect();
              setIsDropdownOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
}