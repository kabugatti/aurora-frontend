// contexts/WalletContext.tsx
"use client";

import  { createContext, useContext, useState, useEffect,} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
import { Horizon } from "@stellar/stellar-sdk";

// Stellar testnet server
const stellarServer = new Horizon.Server("https://horizon-testnet.stellar.org");

// Create context
const WalletContext = createContext(undefined);

// Custom hook to use wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balances, setBalances] = useState(null);

  // Initialize Stellar Wallet Kit
  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });
  
  const fundTestnetAccount = async (publicKey) => {
    try {
      console.log("Funding testnet account:", publicKey);
      const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`);
      if (response.ok) {
        console.log("Account funded successfully!");
        return true;
      } else {
        console.error("Failed to fund account");
        return false;
      }
    } catch (error) {
      console.error("Error funding account:", error);
      return false;
    }
  };

  const fetchBalances = async (publicKey, autoFund = false) => {
    try {
      console.log("Fetching balances for:", publicKey);
      const account = await stellarServer.loadAccount(publicKey);
      setBalances(account.balances);
      console.log("Balances fetched successfully:", account.balances);
    } catch (error) {
      console.error("Error fetching balances:", error);
      
      // If account doesn't exist (404), it means the account is not funded yet
      if (error.response?.status === 404 || error.name === 'NotFoundError') {
        console.log("Account not found - account needs to be funded first");
        
        // Auto-fund if requested (testnet only)
        if (autoFund) {
          console.log("Attempting to auto-fund testnet account...");
          const funded = await fundTestnetAccount(publicKey);
          if (funded) {
            // Try fetching balances again after funding
            setTimeout(() => fetchBalances(publicKey, false), 2000);
            return;
          }
        }
        
        setBalances([
          {
            balance: "0.0000000",
            asset_type: "native",
            asset_code: "XLM",
            unfunded: true
          }
        ]);
      } else {
        console.error("Unexpected error:", error);
        setBalances([]);
      }
    }
  };

  const connectWallet = async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            await kit.setWallet(option.id);
            const { address } = await kit.getAddress();
            setWalletAddress(address);
            setWalletType(option.id);
            console.log("Connected wallet address:", address, "Type:", option.id);

            localStorage.setItem("stellar_wallet_address", address);
            localStorage.setItem("stellar_wallet_id", option.id);

            await fetchBalances(address);
          } catch (error) {
            console.error("Error setting wallet:", error);
          } finally {
            setIsConnecting(false);
          }
        },
        onClosed: (err) => {
          if (err) {
            console.error("Modal closed with error:", err);
          }
          setIsConnecting(false);
        },
        modalTitle: "Connect Your Stellar Wallet",
        notAvailableText: "Selected wallet is not available",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  // Connect Rabbit
  const connectRabbit = async () => {
    if (!window.rabet) {
      alert("Please install Rabbit wallet extension.");
      return;
    }
    setIsConnecting(true);
    try {
      const { publicKey, network } = await window.rabet.connect();
      if (network !== "testnet") {
        alert("Please switch Rabbit to Testnet.");
        setIsConnecting(false);
        return;
      }
      setWalletAddress(publicKey);
      setWalletType("rabbit");
      localStorage.setItem("stellar_wallet_address", publicKey);
      localStorage.setItem("stellar_wallet_id", "rabbit");
      await fetchBalances(publicKey);
    } catch (error) {
      console.error("Rabbit connection error:", error);
      alert("Failed to connect to Rabbit wallet.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletType(null);
    setBalances(null);
    localStorage.removeItem("stellar_wallet_address");
    localStorage.removeItem("stellar_wallet_id");
    console.log("Wallet disconnected");
  };

  // Sign transaction
  const signTransaction = async (transaction) => {
    if (!walletAddress || !walletType) {
      throw new Error("No wallet connected");
    }

    try {
      // Handle different transaction formats
      let transactionXDR;
      console.log("🔍 Analyzing transaction format:", { 
        type: typeof transaction, 
        hasToXDR: !!(transaction && typeof transaction.toXDR === 'function'),
        hasBuilt: !!(transaction && transaction.built),
        keys: transaction ? Object.keys(transaction) : []
      });

      if (typeof transaction === 'string') {
        // Already XDR string
        transactionXDR = transaction;
      } else if (transaction && typeof transaction.toXDR === 'function') {
        // Transaction object
        transactionXDR = transaction.toXDR();
      } else if (transaction && transaction.built && typeof transaction.built.toXDR === 'function') {
        // Soroban contract transaction object
        transactionXDR = transaction.built.toXDR();
      } else {
        console.error("Unknown transaction format:", transaction);
        throw new Error(`Invalid transaction format. Type: ${typeof transaction}, hasToXDR: ${!!(transaction && typeof transaction.toXDR === 'function')}, hasBuilt: ${!!(transaction && transaction.built)}`);
      }

      if (walletType === "rabbit") {
        if (!window.rabet) {
          throw new Error("Rabbit wallet not installed");
        }
        const { xdr } = await window.rabet.sign(transactionXDR, "testnet");
        return xdr;
      } else {
        console.log("🔍 Available kit methods:", Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function'));
        
        // Try different methods that might be available
        if (typeof kit.signTransaction === 'function') {
          console.log("📝 Using kit.signTransaction from WalletContext");
          const result = await kit.signTransaction(transactionXDR, {
            publicKey: walletAddress,
            network: WalletNetwork.TESTNET,
          });
          console.log("🔍 WalletContext kit.signTransaction result:", result);
          const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
          console.log("🔍 WalletContext extracted XDR:", { 
            type: typeof signedXdr, 
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
          });
          
          // Validate XDR format
          if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
            throw new Error(`Invalid XDR format from WalletContext kit.signTransaction. Got: ${typeof signedXdr}, value: ${signedXdr}`);
          }
          
          return signedXdr;
        } else if (typeof kit.signTx === 'function') {
          console.log("📝 Using kit.signTx from WalletContext");
          const result = await kit.signTx({
            xdr: transactionXDR,
            publicKeys: [walletAddress],
            network: WalletNetwork.TESTNET,
          });
          console.log("🔍 WalletContext kit.signTx result:", result);
          const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
          console.log("🔍 WalletContext extracted XDR:", { 
            type: typeof signedXdr, 
            length: signedXdr ? signedXdr.length : 0,
            preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
          });
          
          // Validate XDR format
          if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
            throw new Error(`Invalid XDR format from WalletContext kit.signTx. Got: ${typeof signedXdr}, value: ${signedXdr}`);
          }
          
          return signedXdr;
        } else {
          throw new Error(`Wallet kit signing method not found. Available methods: ${Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function').join(', ')}`);
        }
      }
    } catch (error) {
      console.error("Transaction signing error:", error);
      throw error;
    }
  };

  // Check for previously connected wallet
  useEffect(() => {
    const savedAddress = localStorage.getItem("stellar_wallet_address");
    const savedWalletId = localStorage.getItem("stellar_wallet_id");
    if (savedAddress && savedWalletId) {
      setWalletAddress(savedAddress);
      setWalletType(savedWalletId);
      fetchBalances(savedAddress);
    }
  }, []);

  const value = {
    walletAddress,
    walletType,
    isConnecting,
    isReady: !!walletAddress && !isConnecting, // Add isReady property
    balances,
    connectWallet,
    connectRabbit,
    disconnectWallet,
    signTransaction,
    walletKit: kit, // Also add walletKit for compatibility
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};