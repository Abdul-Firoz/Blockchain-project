import React from 'react';
import { Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return null;
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(tx.status)}
              <div>
                <div className="font-medium text-gray-800">
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} NFT
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
              </span>
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}