import { createContext, useContext, useEffect, useState } from 'react';
import { connect, disconnect } from 'starknetkit';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [wallet, setWallet] = useState(null);

  // Conexión automática al cargar la app
  useEffect(() => {
    const autoConnect = async () => {
      try {
        const { wallet: connectedWallet } = await connect({ 
          modalMode: "neverAsk",
          dappName: "StarkLa"  // Añade nombre de tu dApp
        });
        
        if (connectedWallet?.isConnected) {
          setWallet(connectedWallet);
          setAddress(connectedWallet.selectedAddress);
        }
      } catch (error) {
        console.error("Auto-connect error:", error);
      }
    };
    
    autoConnect();
  }, []);

  const connectWallet = async () => {
    try {
      const { wallet: newWallet } = await connect({
        modalMode: "alwaysAsk",  // Modal siempre visible
        dappName: "StarkLa",     // Nombre de tu dApp
        modalTheme: "light"      // Tema del modal
      });
      
      if (newWallet) {
        setWallet(newWallet);
        setAddress(newWallet.selectedAddress);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect({ clearLastWallet: true });
      setWallet(null);
      setAddress('');
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ address, wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);