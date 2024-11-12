export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  price: number;
}

export interface WalletState {
  connected: boolean;
  address: string;
}

export interface Transaction {
  id: string;
  type: 'mint' | 'transfer' | 'list';
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  nftId: string;
  hash: string;
}