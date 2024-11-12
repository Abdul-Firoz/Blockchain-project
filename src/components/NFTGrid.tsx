import React from 'react';
import NFTCard from './NFTCard';
import { NFT } from '../types';

interface NFTGridProps {
  nfts: NFT[];
  onMint: (id: string) => void;
}

export default function NFTGrid({ nfts, onMint }: NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} onMint={onMint} />
      ))}
    </div>
  );
}