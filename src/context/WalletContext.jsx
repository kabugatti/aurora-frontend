import { createContext, useContext, useEffect, useState } from 'react';
import { connect, disconnect } from 'starknetkit';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [wallet, setWallet] = useState(null);

  // Automatic connection on page load
  useEffect(() => {
    const autoConnect = async () => {
      const { wallet: connectedWallet } = await connect({ modalMode: "neverAsk" });
      
      if (connectedWallet?.isConnected) {
        setWallet(connectedWallet);
        setAddress(connectedWallet.selectedAddress);
      }
    };
    
    autoConnect();
  }, []);

  const connectWallet = async () => {
    const { wallet: newWallet } = await connect();
    
    if (newWallet) {
      setWallet(newWallet);
      setAddress(newWallet.selectedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect({ clearLastWallet: true });
    setWallet(null);
    setAddress('');
  };

  return (
    <WalletContext.Provider value={{ address, wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);