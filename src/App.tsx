import React, { useState } from 'react';
import Header from './components/Header';
import NFTGrid from './components/NFTGrid';
import TransactionHistory from './components/TransactionHistory';
import AddNFTModal from './components/AddNFTModal';
import { mockNFTs } from './data/mockNFTs';
import { WalletState, Transaction, NFT } from './types';

function App() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: '',
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingNFT, setIsAddingNFT] = useState(false);

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      const mockAddress = 'GBXK7ETXNVMXC...WQBLZ3';
      setWallet({
        connected: true,
        address: mockAddress,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: '',
    });
  };

  const handleAddNFT = async (nftData: Omit<NFT, 'id' | 'owner'>) => {
    setIsAddingNFT(true);
    try {
      // Simulate adding NFT to blockchain
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newNFT: NFT = {
        ...nftData,
        id: Date.now().toString(),
        owner: wallet.address,
      };

      setNfts(prev => [newNFT, ...prev]);

      // Create success transaction
      const newTx: Transaction = {
        id: Date.now().toString(),
        type: 'mint',
        status: 'success',
        timestamp: Date.now(),
        nftId: newNFT.id,
        hash: 'tx' + Math.random().toString(36).substring(7),
      };
      
      setTransactions(prev => [newTx, ...prev]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add NFT:', error);
      alert('Failed to add NFT. Please try again.');
    } finally {
      setIsAddingNFT(false);
    }
  };

  const handleMint = async (id: string) => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    // Create pending transaction
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: 'mint',
      status: 'pending',
      timestamp: Date.now(),
      nftId: id,
      hash: 'tx' + Math.random().toString(36).substring(7),
    };
    
    setTransactions(prev => [newTx, ...prev]);

    try {
      // Simulate minting process with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update transaction status to success
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === newTx.id ? { ...tx, status: 'success' } : tx
        )
      );
    } catch (error) {
      // Update transaction status to failed
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === newTx.id ? { ...tx, status: 'failed' } : tx
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isConnected={wallet.connected}
        walletAddress={wallet.address}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onAddNFT={() => setIsAddModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        {wallet.connected && <TransactionHistory transactions={transactions} />}
        <NFTGrid nfts={nfts} onMint={handleMint} />
      </main>
      
      <AddNFTModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNFT}
        isLoading={isAddingNFT}
      />
      
      <footer className="bg-white border-t mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>Stellar NFT Marketplace Demo - Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;