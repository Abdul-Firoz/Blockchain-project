import React from 'react';
import { NFT } from '../types';

interface NFTCardProps {
  nft: NFT;
  onMint: (id: string) => void;
}

export default function NFTCard({ nft, onMint }: NFTCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative aspect-square">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{nft.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{nft.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-indigo-600 font-medium">{nft.price} XLM</span>
          <button
            onClick={() => onMint(nft.id)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  );
}