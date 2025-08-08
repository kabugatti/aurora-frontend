import { useState, useEffect } from 'react';
import { 
  Networks, 
  Transaction, 
  SorobanRpc, 
  TransactionBuilder,
  BASE_FEE,
  Address,
  nativeToScVal,
  scValToNative,
  Contract
} from '@stellar/stellar-sdk';

// Alternative import approach for SorobanRpc in case of issues
import * as StellarSdk from '@stellar/stellar-sdk';

// DirectSorobanRpc will be loaded dynamically if needed
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Loader2, Image, Coins, Send, Settings, User, Shield } from 'lucide-react';

const NFTInteract = () => {
  const { 
    walletAddress, 
    walletType,
    isReady,
    signTransaction,
    connectWallet, 
    disconnectWallet, 
    walletKit: kit
  } = useWallet();
  const { showToast } = useToast();
  const isConnected = Boolean(walletAddress);
  
  // Contract state
  const [contractId, setContractId] = useState('CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP');
  const [isInitialized, setIsInitialized] = useState(false);

  // Validate contract ID format
  const isValidContractId = (id) => {
    return /^[A-Z0-9]{56}$/.test(id);
  };
  
  // Contract info
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [adminAddress, setAdminAddress] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  
  // Form states
  const [mintRecipient, setMintRecipient] = useState('');
  const [mintTokenId, setMintTokenId] = useState('');
  const [mintTokenUri, setMintTokenUri] = useState('');
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferTokenId, setTransferTokenId] = useState('');
  const [queryTokenId, setQueryTokenId] = useState('');
  const [queryOwner, setQueryOwner] = useState('');
  const [tokenUri, setTokenUri] = useState('');
  
  // New state for results
  const [lastResult, setLastResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Results
  const [tokenOwner, setTokenOwner] = useState('');
  const [ownerBalance, setOwnerBalance] = useState('');

  const NETWORK = Networks.TESTNET;
  const RPC_URL = 'https://soroban-testnet.stellar.org';
  
  // Helper function to create SorobanRpc server with fallback
  const createSorobanServer = async (rpcUrl = RPC_URL) => {
    console.log("🔍 createSorobanServer debug info:", {
      SorobanRpc: typeof SorobanRpc,
      SorobanRpcKeys: SorobanRpc ? Object.keys(SorobanRpc) : null,
      hasServer: SorobanRpc ? 'Server' in SorobanRpc : false,
      StellarSdk: typeof StellarSdk,
      StellarSdkKeys: StellarSdk ? Object.keys(StellarSdk).slice(0, 10) : null,
      hasRpc: StellarSdk ? 'rpc' in StellarSdk : false,
      rpcType: StellarSdk && StellarSdk.rpc ? typeof StellarSdk.rpc : 'not found',
      rpcKeys: StellarSdk && StellarSdk.rpc ? Object.keys(StellarSdk.rpc) : null,
      rpcHasServer: StellarSdk && StellarSdk.rpc ? 'Server' in StellarSdk.rpc : false,
      hasSorobanRpc: StellarSdk ? 'SorobanRpc' in StellarSdk : false,
      StellarSdkSorobanRpc: StellarSdk && StellarSdk.SorobanRpc ? typeof StellarSdk.SorobanRpc : 'not found'
    });
    
    if (SorobanRpc && SorobanRpc.Server) {
      console.log("✅ Using direct SorobanRpc.Server import");
      return new SorobanRpc.Server(rpcUrl);
    } else if (StellarSdk && StellarSdk.rpc && StellarSdk.rpc.Server) {
                console.log("✅ Using rpc.Server");
      return new StellarSdk.rpc.Server(rpcUrl);
    } else if (StellarSdk && StellarSdk.SorobanRpc && StellarSdk.SorobanRpc.Server) {
              console.log("✅ Using SorobanRpc.Server fallback");
      return new StellarSdk.SorobanRpc.Server(rpcUrl);
    } else {
      // Try dynamic import as last resort
      try {
        console.log("🔄 Trying dynamic import of SorobanRpc...");
        const { SorobanRpc: DynamicSorobanRpc } = await import('@stellar/stellar-sdk/rpc');
        if (DynamicSorobanRpc && DynamicSorobanRpc.Server) {
          console.log("✅ Using dynamic SorobanRpc.Server import");
          return new DynamicSorobanRpc.Server(rpcUrl);
        }
      } catch (dynamicError) {
        console.log("❌ Dynamic import failed:", dynamicError.message);
      }
      
      console.error("❌ No SorobanRpc server available:", {
        SorobanRpc: typeof SorobanRpc,
        StellarSdk: typeof StellarSdk,
        allImports: { SorobanRpc, StellarSdk }
      });
      throw new Error(`No SorobanRpc.Server constructor available. SorobanRpc: ${typeof SorobanRpc}, StellarSdk: ${typeof StellarSdk}`);
    }
  };
  
  // Manual transaction builder
  const buildManualMintTransaction = async (to, tokenId) => {
    try {
      console.log("🛠️ Building manual mint transaction...");
      
      const server = await createSorobanServer();
      
      console.log("🔍 Contract class debug:", {
        Contract: typeof Contract,
        ContractKeys: Contract ? Object.keys(Contract) : null,
        ContractMethods: Contract ? Object.getOwnPropertyNames(Contract).filter(name => typeof Contract[name] === 'function') : []
      });
      
      // Try using the Contract class approach (more modern)
      if (Contract) {
        console.log("✅ Using Contract class approach");
        
        const contract = new Contract(contractId);
        
        console.log("🔧 Building contract call transaction...");
        const builtTransaction = contract.call(
          'mint',
          Address.fromString(to).toScVal(),
          nativeToScVal(tokenId, { type: 'u128' })
        );
        
        // Get account for transaction building
        const sourceAccount = await server.getAccount(walletAddress);
        
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: NETWORK,
        })
          .addOperation(builtTransaction)
          .setTimeout(300)
          .build();
        
        console.log("✅ Contract transaction built");
        
        // Prepare the transaction for Soroban
        const preparedTx = await server.prepareTransaction(transaction);
        console.log("✅ Transaction prepared for Soroban");
        
        return preparedTx;
      } else {
        throw new Error("Contract class not available");
      }
      
    } catch (error) {
      console.error("❌ Error building manual transaction:", error);
      throw new Error(`Failed to build manual transaction: ${error.message}`);
    }
  };

  // Manual transaction builder for set_token_uri
  const buildManualSetTokenUriTransaction = async (tokenId, tokenUri) => {
    try {
      console.log("🛠️ Building manual set_token_uri transaction...");
      
      const server = await createSorobanServer();
      
      if (Contract) {
        console.log("✅ Using Contract class for set_token_uri");
        
        const contract = new Contract(contractId);
        
        const builtTransaction = contract.call(
          'set_token_uri',
          nativeToScVal(tokenId, { type: 'u128' }),
          nativeToScVal(tokenUri, { type: 'string' })
        );
        
        // Get account for transaction building
        const sourceAccount = await server.getAccount(walletAddress);
        
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: NETWORK,
        })
          .addOperation(builtTransaction)
          .setTimeout(300)
          .build();
        
        console.log("✅ Contract set_token_uri transaction built");
        
        // Prepare the transaction for Soroban
        const preparedTx = await server.prepareTransaction(transaction);
        console.log("✅ set_token_uri transaction prepared for Soroban");
        
        return preparedTx;
      } else {
        throw new Error("Contract class not available for set_token_uri");
      }
      
    } catch (error) {
      console.error("❌ Error building manual set_token_uri transaction:", error);
      throw new Error(`Failed to build manual set_token_uri transaction: ${error.message}`);
    }
  };

  // Validate token ID format and range
  const isValidTokenId = (id) => {
    if (!id || id === '') return false;
    const num = parseInt(id, 10);
    return !isNaN(num) && num > 0 && Number.isInteger(num);
  };

  // Create custom sign transaction function for Soroban
  const createSorobanSignTransaction = () => {
    return async (xdr) => {
      console.log("🔐 Custom Soroban sign transaction called", { 
        xdrType: typeof xdr,
        xdrLength: xdr ? xdr.length : 0,
        xdrPreview: xdr ? xdr.substring(0, 100) + '...' : 'null',
        walletType,
        hasWalletAddress: !!walletAddress,
        hasKit: !!kit,
        kitMethods: kit ? Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function') : []
      });

      if (walletType === "rabbit" || walletType === "rabet") {
        if (!window.rabet) {
          throw new Error("Rabbit wallet not installed");
        }
        console.log("📝 Using Rabbit wallet direct signing");
        console.log("🔍 Input XDR for Rabbit:", { 
          xdr: xdr,
          type: typeof xdr, 
          length: xdr ? xdr.length : 0,
          preview: xdr ? xdr.substring(0, 100) + '...' : 'null'
        });
        
        const result = await window.rabet.sign(xdr, "testnet");
        console.log("🔍 Complete Rabbit sign result:", {
          result: result,
          resultType: typeof result,
          resultKeys: result ? Object.keys(result) : null,
          resultString: JSON.stringify(result, null, 2)
        });
        
        const signedXdr = result.xdr || result.signedXDR || result.signedTxXdr || result.result || result;
        console.log("🔍 Rabbit extracted XDR:", { 
          signedXdr: signedXdr,
          type: typeof signedXdr, 
          length: signedXdr ? signedXdr.length : 0,
          preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null',
          isString: typeof signedXdr === 'string',
          isTruthy: !!signedXdr
        });
        
        // Validate XDR format
        if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
          console.error("❌ Rabbit XDR validation failed:", {
            expectedType: 'string',
            actualType: typeof signedXdr,
            value: signedXdr,
            fullResult: result
          });
          throw new Error(`Invalid XDR format received from Rabbit. Expected string, got: ${typeof signedXdr}, value: ${signedXdr}`);
        }
        
        // Basic XDR validation
        if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
          throw new Error(`Invalid XDR format received from Rabbit wallet`);
        }
        console.log("✅ Rabbit XDR validation successful");
        
        return signedXdr;
      } else {
        // For StellarWalletsKit (Freighter, etc.)
        if (!kit) {
          console.error("❌ Kit is null or undefined:", { 
            kit, 
            walletType, 
            walletAddress,
            hasSignTransaction: !!signTransaction
          });
          throw new Error(`Wallet kit not available. Wallet type: ${walletType}, Address: ${walletAddress ? 'connected' : 'not connected'}`);
        }

        const allKitProps = Object.getOwnPropertyNames(kit);
        const kitMethods = allKitProps.filter(name => typeof kit[name] === 'function');
        console.log("🔍 Available kit methods:", kitMethods);
        console.log("🔍 All kit properties:", allKitProps);
        
        // Try different signing methods with more detailed error handling
        try {
          if (typeof kit.signTx === 'function') {
            console.log("📝 Using kit.signTx method");
            console.log("📤 Sending to wallet:", {
              xdr: xdr,
              xdrType: typeof xdr,
              xdrLength: xdr ? xdr.length : 0,
              xdrPreview: xdr ? xdr.substring(0, 100) + '...' : 'null',
              publicKeys: [walletAddress],
              network: "TESTNET"
            });
            
            const result = await kit.signTx({
              xdr: xdr,
              publicKeys: [walletAddress],
              network: "TESTNET",
            });
            
            console.log("🔍 Complete kit.signTx result:", {
              result: result,
              resultType: typeof result,
              resultKeys: result ? Object.keys(result) : null,
              resultString: JSON.stringify(result, null, 2)
            });
            
            const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result.result || result;
            console.log("🔍 Extracted signed XDR:", { 
              signedXdr: signedXdr,
              type: typeof signedXdr, 
              length: signedXdr ? signedXdr.length : 0,
              preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null',
              isString: typeof signedXdr === 'string',
              isTruthy: !!signedXdr
            });
            
            // Validate XDR format
            if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
              console.error("❌ XDR validation failed:", {
                expectedType: 'string',
                actualType: typeof signedXdr,
                value: signedXdr,
                fullResult: result
              });
              throw new Error(`Invalid XDR format received from wallet. Expected string, got: ${typeof signedXdr}, value: ${signedXdr}`);
            }
            
            // Basic XDR validation
            if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
              throw new Error(`Invalid XDR format received from wallet`);
            }
            console.log("✅ XDR validation successful");
            
            return signedXdr;
          } else if (typeof kit.signTransaction === 'function') {
            console.log("📝 Using kit.signTransaction method");
            const result = await kit.signTransaction(xdr, {
              publicKey: walletAddress,
              network: "TESTNET",
            });
            console.log("🔍 Kit signTransaction result:", result);
            const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
            console.log("🔍 Extracted signed XDR:", { 
              type: typeof signedXdr, 
              length: signedXdr ? signedXdr.length : 0,
              preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
            });
            
            // Validate XDR format
            if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
              throw new Error(`Invalid XDR format received from wallet. Got: ${typeof signedXdr}, value: ${signedXdr}`);
            }
            
            return signedXdr;
          } else if (typeof kit.sign === 'function') {
            console.log("📝 Using kit.sign method");
            const result = await kit.sign({
              xdr: xdr,
              publicKey: walletAddress,
              network: "TESTNET",
            });
            console.log("🔍 Kit sign result:", result);
            const signedXdr = result.signedXDR || result.signedTxXdr || result.xdr || result;
            console.log("🔍 Extracted signed XDR:", { 
              type: typeof signedXdr, 
              length: signedXdr ? signedXdr.length : 0,
              preview: signedXdr ? signedXdr.substring(0, 100) + '...' : 'null'
            });
            
            // Validate XDR format
            if (typeof signedXdr !== 'string' || !signedXdr.trim()) {
              throw new Error(`Invalid XDR format received from wallet. Got: ${typeof signedXdr}, value: ${signedXdr}`);
            }
            
            return signedXdr;
          } else {
            // Fallback: use the original signTransaction from context
            console.log("📝 Using fallback signTransaction from context");
            if (!signTransaction) {
              throw new Error(`No signing method available. Kit methods: [${kitMethods.join(', ')}], signTransaction: ${!!signTransaction}`);
            }
            const result = await signTransaction(xdr);
            console.log("🔍 Fallback signTransaction result:", result);
            
            // Validate XDR format
            if (typeof result !== 'string' || !result.trim()) {
              throw new Error(`Invalid XDR format received from fallback. Got: ${typeof result}, value: ${result}`);
            }
            
            return result;
          }
        } catch (kitError) {
          console.error("❌ Kit signing error:", kitError);
          // Try fallback if kit method fails
          if (signTransaction) {
            console.log("🔄 Trying fallback signTransaction after kit error...");
            const result = await signTransaction(xdr);
            console.log("🔍 Fallback after error result:", result);
            
            // Validate XDR format
            if (typeof result !== 'string' || !result.trim()) {
              throw new Error(`Invalid XDR format received from fallback after error. Got: ${typeof result}, value: ${result}`);
            }
            
            return result;
          }
          throw kitError;
        }
      }
    };
  };

  // Add reconnection handler
  const handleReconnectWallet = async () => {
    try {
      await disconnectWallet();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for cleanup
      await connectWallet();
    } catch (error) {
      console.error("❌ Error reconnecting wallet:", error);
      showToast({ 
        title: "Error", 
        description: "Failed to reconnect wallet. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  // Handle minting with enhanced error handling
  const handleMint = async () => {
    if (!isConnected || !walletAddress) {
      showToast({ title: 'Please connect your wallet first', variant: 'destructive' });
      return;
    }

    // Enhanced admin check with better error messaging
    if (!adminAddress) {
      showToast({ 
        title: 'Contract not loaded', 
        description: 'Please load the contract first to verify admin permissions', 
        variant: 'destructive' 
      });
      return;
    }

    if (!isAdmin) {
      console.log("🔍 Admin check failed:", {
        walletAddress,
        adminAddress,
        isAdmin,
        comparison: walletAddress === adminAddress
      });
      showToast({ 
        title: 'Only admin can mint NFTs', 
        description: `Admin address: ${adminAddress.substring(0, 8)}...${adminAddress.substring(-6)}. Your address: ${walletAddress.substring(0, 8)}...${walletAddress.substring(-6)}`,
        variant: 'destructive' 
      });
      return;
    }

    if (!mintRecipient) {
      showToast({ title: 'Please enter a recipient address', variant: 'destructive' });
      return;
    }

    if (!isValidTokenId(mintTokenId)) {
      showToast({ title: 'Token ID must be a positive integer', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setLastResult("");

    try {
      console.log("🎨 Starting mint process...", { 
        to: mintRecipient, 
        tokenId: mintTokenId,
        tokenUri: mintTokenUri,
        walletAddress,
        walletType,
        isAdmin,
        contractId,
        hasKit: !!kit,
        kitAvailable: kit ? true : false
      });

      console.log("✅ Minting NFT manually...");

      // Convert token ID to positive BigInt
      const tokenIdBigInt = BigInt(Math.abs(parseInt(mintTokenId, 10)));
      
      console.log("📝 Building mint transaction manually...", {
        to: mintRecipient,
        token_id: tokenIdBigInt.toString()
      });

      // ✅ Direct manual transaction building
      console.log("🚀 Using pure manual approach...");
      
      let result;
      try {
        const manualTx = await buildManualMintTransaction(mintRecipient, Number(tokenIdBigInt));
        console.log("✅ Manual transaction built successfully, signing...");
        
        const customSignTransaction = createSorobanSignTransaction();
        const signedXdr = await customSignTransaction(manualTx.toXDR());
        console.log("✅ Manual transaction signed successfully");
        
        // Parse and submit
        console.log("🔍 Transaction debug info:", {
          Transaction: typeof Transaction,
          TransactionKeys: Transaction ? Object.keys(Transaction) : null,
          TransactionMethods: Transaction ? Object.getOwnPropertyNames(Transaction).filter(name => typeof Transaction[name] === 'function') : [],
          hasFromXDR: Transaction && typeof Transaction.fromXDR === 'function',
          StellarSdkTransaction: StellarSdk ? StellarSdk.Transaction : 'not found',
          StellarSdkTransactionFromXDR: StellarSdk && StellarSdk.Transaction ? typeof StellarSdk.Transaction.fromXDR : 'not found'
        });
        
        // Try different ways to access Transaction.fromXDR
        let signedTransaction;
        if (Transaction && typeof Transaction.fromXDR === 'function') {
          console.log("✅ Using direct Transaction.fromXDR");
          signedTransaction = Transaction.fromXDR(signedXdr, Networks.TESTNET);
        } else if (StellarSdk && StellarSdk.Transaction && typeof StellarSdk.Transaction.fromXDR === 'function') {
          console.log("✅ Using Transaction.fromXDR");
          signedTransaction = StellarSdk.Transaction.fromXDR(signedXdr, Networks.TESTNET);
        } else {
          throw new Error("Transaction.fromXDR not available in any import");
        }
        console.log("📤 Submitting manually built and signed transaction...");
        
        const server = await createSorobanServer();
        const submitResult = await server.sendTransaction(signedTransaction);
        console.log("✅ Manual transaction submitted successfully:", submitResult);
        
        result = submitResult;
        
        // Set token URI if provided
        if (mintTokenUri) {
          console.log("📝 Setting token URI manually...");
          const manualUriTx = await buildManualSetTokenUriTransaction(Number(tokenIdBigInt), mintTokenUri);
          const signedUriXdr = await customSignTransaction(manualUriTx.toXDR());
          // Parse URI transaction using the same approach
          let signedUriTransaction;
          if (Transaction && typeof Transaction.fromXDR === 'function') {
            signedUriTransaction = Transaction.fromXDR(signedUriXdr, Networks.TESTNET);
          } else if (StellarSdk && StellarSdk.Transaction && typeof StellarSdk.Transaction.fromXDR === 'function') {
            signedUriTransaction = StellarSdk.Transaction.fromXDR(signedUriXdr, Networks.TESTNET);
          } else {
            throw new Error("Transaction.fromXDR not available for URI transaction");
          }
          await server.sendTransaction(signedUriTransaction);
          console.log("✅ Manual URI transaction completed successfully");
        }
        
      } catch (manualError) {
        console.error("❌ Manual transaction failed:");
        console.error("📋 Error details:", manualError);
        console.error("📋 Error message:", manualError?.message || 'No message');
        console.error("📋 Error name:", manualError?.name || 'No name');
        console.error("📋 Error stack:", manualError?.stack || 'No stack');
        console.error("📋 Full error object:", JSON.stringify(manualError, Object.getOwnPropertyNames(manualError), 2));
        
        // If manual transaction building fails, throw the error
        throw new Error(`Manual transaction failed: ${manualError.message}`);
      }

      console.log("✅ Mint successful!", result);
      setLastResult(`✅ Mint successful! Token ID: ${mintTokenId}`);
      showToast({ title: "Success", description: `NFT #${mintTokenId} minted successfully!`, variant: "default" });
      
      // Refresh NFT data
      await Promise.all([fetchUserNFTs(), fetchContractInfo()]);
      
    } catch (error) {
      console.error("❌ Mint error:", error);
      
      // Handle specific error cases
      let errorMessage = "Failed to mint NFT";
      let needsReconnect = false;
      
      if (error instanceof RangeError) {
        errorMessage = "Invalid token ID: must be a positive integer";
      } else if (error.message?.includes("Request rejected")) {
        errorMessage = "Transaction was rejected by the wallet";
      } else if (error.message?.includes("insufficient")) {
        errorMessage = "Insufficient balance to perform this operation";
      } else if (error.message?.includes("already exists") || error.message?.includes("NFTInvalidSender")) {
        errorMessage = `Token ID ${mintTokenId} already exists or invalid mint request`;
      } else if (error.message?.includes("require_auth") || error.message?.includes("Unauthorized")) {
        errorMessage = `Unauthorized: Only the admin (${adminAddress?.substring(0, 8)}...${adminAddress?.substring(-6)}) can mint NFTs. Connected as: ${walletAddress?.substring(0, 8)}...${walletAddress?.substring(-6)}`;
      } else if (error.message?.includes("Decrypted message is null")) {
        errorMessage = "Wallet connection lost. Please reconnect.";
        needsReconnect = true;
      } else if (error.code === -1) {
        errorMessage = "Transaction was rejected by the wallet";
      } else if (!walletAddress) {
        errorMessage = "Wallet connection lost. Please reconnect.";
        needsReconnect = true;
      }
      
      setLastResult(`❌ Error: ${errorMessage}`);
      showToast({ 
        title: "Mint Failed", 
        description: errorMessage, 
        variant: "destructive" 
      });

      if (needsReconnect) {
        await handleReconnectWallet();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Add input validation to token ID field
  const handleTokenIdChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setMintTokenId(value);
    }
  };

  // Update the mint form JSX to use the new validation and UI components
  const renderMintForm = () => {
    // Check if all required fields are filled for validation styling
    const isValidRecipient = mintRecipient && mintRecipient.length > 0;
    const isValidTokenId = mintTokenId && /^\d+$/.test(mintTokenId);
    const canMint = isValidRecipient && isValidTokenId && isAdmin;

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="mintRecipient" className="text-sm font-medium">
            Recipient Address *
          </Label>
          <Input
            id="mintRecipient"
            type="text"
            value={mintRecipient}
            onChange={(e) => setMintRecipient(e.target.value)}
            placeholder="GCQZ... (Stellar public key)"
            className={`transition-colors ${
              !isValidRecipient && mintRecipient 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {!isValidRecipient && mintRecipient && (
            <p className="text-xs text-red-600">Please enter a valid Stellar address</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mintTokenId" className="text-sm font-medium">
            Token ID *
          </Label>
          <Input
            id="mintTokenId"
            type="text"
            value={mintTokenId}
            onChange={handleTokenIdChange}
            placeholder="Enter a positive integer (e.g., 1, 2, 3...)"
            className={`transition-colors ${
              !isValidTokenId && mintTokenId 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {!isValidTokenId && mintTokenId && (
            <p className="text-xs text-red-600">Token ID must be a positive integer</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mintTokenUri" className="text-sm font-medium">
            Token URI <span className="text-gray-500">(optional)</span>
          </Label>
          <Input
            id="mintTokenUri"
            type="text"
            value={mintTokenUri}
            onChange={(e) => setMintTokenUri(e.target.value)}
            placeholder="https://example.com/metadata/1.json"
            className="focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">
            URL pointing to NFT metadata (JSON format)
          </p>
        </div>

        <Button
          onClick={handleMint}
          disabled={isLoading || !canMint}
          className={`w-full transition-all duration-200 ${
            canMint 
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
              : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed opacity-50'
          }`}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Minting NFT...
            </>
          ) : (
            <>
              <Coins className="w-4 h-4 mr-2" />
              Mint NFT
            </>
          )}
        </Button>

        {!isAdmin && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-amber-600 mr-2" />
              <p className="text-sm text-amber-800">
                Only the contract admin can mint NFTs
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Handle transfer
  const handleTransfer = async () => {
    if (!walletAddress) {
      showToast({ title: "Error", description: "Please connect your wallet first", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setLastResult("");

    try {
      console.log("🔄 Starting transfer process...", { 
        from: transferFrom, 
        to: transferTo,
        tokenId: transferTokenId,
        walletAddress,
        walletType
      });

      console.log("📝 Building transfer transaction manually...");
      
      // ✅ Manual transfer transaction building
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build transfer operation
      const transferOp = contract.call(
        'transfer',
        Address.fromString(transferFrom).toScVal(),
        Address.fromString(transferTo).toScVal(),
        nativeToScVal(parseInt(transferTokenId), { type: 'u128' })
      );
      
      // Create transaction
      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(transferOp).setTimeout(300).build();
      
      // Sign transaction
      console.log("✍️ Signing transfer transaction manually...");
      const customSignTransaction = createSorobanSignTransaction();
      const signedXdr = await customSignTransaction(transaction.toXDR());
      
      // Parse signed transaction
      let signedTransaction;
      if (Transaction && typeof Transaction.fromXDR === 'function') {
        signedTransaction = Transaction.fromXDR(signedXdr, Networks.TESTNET);
      } else if (StellarSdk && StellarSdk.Transaction && typeof StellarSdk.Transaction.fromXDR === 'function') {
        signedTransaction = StellarSdk.Transaction.fromXDR(signedXdr, Networks.TESTNET);
      } else {
        throw new Error("Transaction.fromXDR not available");
      }
      
      // Submit transaction
      console.log("📤 Submitting transfer transaction...");
      const result = await server.sendTransaction(signedTransaction);
      
      console.log("✅ Transfer successful!", result);
      setLastResult(`✅ Transfer successful! Token ID: ${transferTokenId}`);
      showToast({ title: "Success", description: `NFT #${transferTokenId} transferred successfully!`, variant: "default" });
      
      // Refresh NFT data
      await Promise.all([fetchUserNFTs(), fetchContractInfo()]);
      
    } catch (error) {
      console.error("❌ Transfer error:", error);
      const errorMessage = error.message || "Failed to transfer NFT";
      setLastResult(`❌ Error: ${errorMessage}`);
      showToast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Query token owner
  const handleQueryOwner = async () => {
    if (!queryTokenId) {
      showToast({ title: "Error", description: "Please enter a token ID", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      console.log("👤 Querying token owner manually...");
      
      // ✅ Manual owner query
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build owner query
      const ownerOp = contract.call('owner_of', nativeToScVal(parseInt(queryTokenId), { type: 'u128' }));
      const ownerTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(ownerOp).setTimeout(300).build();
      
      // Simulate owner query
      const result = await server.simulateTransaction(ownerTransaction);
      const owner = result.result?.retval ? scValToNative(result.result.retval) : '';
      
      setTokenOwner(owner);
      setLastResult(`✅ Token #${queryTokenId} owner: ${owner}`);
      showToast({ title: "Success", description: `Owner found: ${owner}`, variant: "default" });
    } catch (error) {
      console.error("❌ Query owner error:", error);
      const errorMessage = error.message || "Failed to query token owner";
      setLastResult(`❌ Error: ${errorMessage}`);
      showToast({ title: "Error", description: errorMessage, variant: "destructive" });
      setTokenOwner('');
    } finally {
      setIsLoading(false);
    }
  };

  // Query owner balance
  const handleQueryBalance = async () => {
    if (!queryOwner) {
      showToast({ title: "Error", description: "Please enter an address", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      console.log("💰 Querying balance manually...");
      
      // ✅ Manual balance query
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build balance query
      const balanceOp = contract.call('balance_of', Address.fromString(queryOwner).toScVal());
      const balanceTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(balanceOp).setTimeout(300).build();
      
      // Simulate balance query
      const result = await server.simulateTransaction(balanceTransaction);
      const balance = result.result?.retval ? scValToNative(result.result.retval) : 0;
      
      setOwnerBalance(balance);
      setLastResult(`✅ Address ${queryOwner} owns ${balance} NFTs`);
      showToast({ title: "Success", description: `Balance: ${balance} NFTs`, variant: "default" });
    } catch (error) {
      console.error("❌ Query balance error:", error);
      const errorMessage = error.message || "Failed to query balance";
      setLastResult(`❌ Error: ${errorMessage}`);
      showToast({ title: "Error", description: errorMessage, variant: "destructive" });
      setOwnerBalance('');
    } finally {
      setIsLoading(false);
    }
  };

  // Get token URI
  const handleGetTokenUri = async () => {
    if (!queryTokenId) {
      showToast({ title: "Error", description: "Please enter a token ID", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      console.log("🔗 Querying token URI manually...");
      
      // ✅ Manual token URI query
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build token URI query
      const uriOp = contract.call('token_uri', nativeToScVal(parseInt(queryTokenId), { type: 'u128' }));
      const uriTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(uriOp).setTimeout(300).build();
      
      // Simulate token URI query
      const result = await server.simulateTransaction(uriTransaction);
      const uri = result.result?.retval ? scValToNative(result.result.retval) : '';
      
      setTokenUri(uri);
      setLastResult(`✅ Token #${queryTokenId} URI: ${uri}`);
      showToast({ title: "Success", description: "Token URI retrieved", variant: "default" });
    } catch (error) {
      console.error("❌ Get token URI error:", error);
      const errorMessage = error.message || "Failed to get token URI";
      setLastResult(`❌ Error: ${errorMessage}`);
      showToast({ title: "Error", description: errorMessage, variant: "destructive" });
      setTokenUri('');
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = walletAddress && adminAddress && walletAddress === adminAddress;

  // Debug wallet connection state
  useEffect(() => {
    console.log("🔄 Wallet state changed:", {
      walletAddress,
      walletType,
      isReady,
      hasKit: !!kit,
      kitType: kit ? kit.constructor.name : 'undefined',
      kitMethods: kit ? Object.getOwnPropertyNames(kit).filter(name => typeof kit[name] === 'function').slice(0, 10) : []
    });
  }, [walletAddress, walletType, isReady, kit]);

  // Debug admin status
  useEffect(() => {
    console.log("🔍 Admin Debug:", { 
      walletAddress, 
      adminAddress, 
      isAdmin: walletAddress === adminAddress,
      comparison: `"${walletAddress}" === "${adminAddress}"`,
      walletLength: walletAddress ? walletAddress.length : 0,
      adminLength: adminAddress ? adminAddress.length : 0,
      walletType: typeof walletAddress,
      adminType: typeof adminAddress
    });
  }, [walletAddress, adminAddress]);

  // Fetch contract info (requires wallet connection)
  const fetchContractInfo = async () => {
    try {
      if (!contractId || !isValidContractId(contractId)) {
        throw new Error(`Invalid contract ID: ${contractId}`);
      }

      if (!walletAddress) {
        throw new Error("Please connect your wallet first to load contract information");
      }

      console.log("🔍 Attempting to create contract client...", {
        contractId,
        walletAddress
      });

      console.log("📋 Fetching contract info manually...", { contractId });
      
      // ✅ Manual contract queries
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      
      // Get source account for simulation
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build queries for name, symbol, and admin
      const nameOp = contract.call('name');
      const symbolOp = contract.call('symbol');
      const adminOp = contract.call('get_admin');
      
      // Create transactions for simulation
      const nameTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(nameOp).setTimeout(300).build();
      
      const symbolTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(symbolOp).setTimeout(300).build();
      
      const adminTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(adminOp).setTimeout(300).build();
      
      // Simulate all queries
      const [nameResult, symbolResult, adminResult] = await Promise.all([
        server.simulateTransaction(nameTransaction),
        server.simulateTransaction(symbolTransaction),
        server.simulateTransaction(adminTransaction)
      ]);
      
      // Extract results
      const name = nameResult.result?.retval ? scValToNative(nameResult.result.retval) : 'Unknown';
      const symbol = symbolResult.result?.retval ? scValToNative(symbolResult.result.retval) : 'UNKNOWN';
      const adminAddr = adminResult.result?.retval ? scValToNative(adminResult.result.retval) : '';
      
      setCollectionName(name);
      setCollectionSymbol(symbol);
      setAdminAddress(adminAddr);
      setIsInitialized(true);

      console.log("✅ Contract info loaded:", { 
        name, 
        symbol,
        admin: adminAddr,
        walletAddress,
        isAdminMatch: walletAddress === adminAddr
      });

      // Show success toast
      showToast({ 
        title: "Success", 
        description: `Contract loaded: ${name} (${symbol})`, 
        variant: "default" 
      });

    } catch (error) {
      console.error("❌ Error fetching contract info:", error);
      setIsInitialized(false);
      showToast({ 
        title: "Error", 
        description: error.message || "Failed to fetch contract info", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  // Fetch user NFTs
  const fetchUserNFTs = async () => {
    if (!walletAddress) return;

    try {
      console.log("🖼️ Fetching user NFTs manually...");
      
      // ✅ Manual balance query
      const server = await createSorobanServer();
      const contract = new Contract(contractId);
      const sourceAccount = await server.getAccount(walletAddress);
      
      // Build balance query
      const balanceOp = contract.call('balance_of', Address.fromString(walletAddress).toScVal());
      const balanceTransaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: NETWORK,
      }).addOperation(balanceOp).setTimeout(300).build();
      
      // Simulate balance query
      const balanceResult = await server.simulateTransaction(balanceTransaction);
      const balance = balanceResult.result?.retval ? scValToNative(balanceResult.result.retval) : 0;
      
      setUserBalance(parseInt(balance) || 0);
      console.log("✅ User balance:", balance);
    } catch (error) {
      console.error("❌ Error fetching user NFTs:", error);
    }
  };

  // Load contract data when wallet connects and contract ID is set
  useEffect(() => {
    if (walletAddress && contractId && isValidContractId(contractId)) {
      console.log("🔗 Wallet connected, loading contract data...", { walletAddress, contractId });
      // Add a small delay to ensure wallet is fully ready
      const timer = setTimeout(async () => {
        try {
          await Promise.all([fetchContractInfo(), fetchUserNFTs()]);
          console.log("✅ Contract data loaded successfully");
        } catch (error) {
          console.error("❌ Error loading contract data:", error);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      console.log("⏳ Waiting for wallet connection and contract ID...", { 
        walletAddress: !!walletAddress, 
        contractId: !!contractId
      });
    }
  }, [walletAddress, contractId]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-6 h-6" />
            Aurora NFT Contract Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contractId" className="text-sm font-medium">
                NFT Contract ID *
              </Label>
              <div className="flex gap-3">
                <Input
                  id="contractId"
                  placeholder="CAE3EUNCU6XA7KH4XYPSIA6TYPUQQYVGPGSBUFOHO2KEIGCOETW2GKFP"
                  value={contractId}
                  onChange={(e) => setContractId(e.target.value)}
                  className={`flex-1 font-mono text-sm ${
                    contractId && !isValidContractId(contractId)
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                <Button 
                  onClick={async () => {
                    console.log("🔄 Load Contract button clicked", { 
                      contractId, 
                      walletAddress: !!walletAddress
                    });
                    
                    if (!contractId) {
                      showToast({ title: "Error", description: "Please enter a contract ID", variant: "destructive" });
                      return;
                    }
                    
                    if (!walletAddress) {
                      showToast({ 
                        title: "Wallet Required", 
                        description: "Please connect your wallet from the header to load contract information", 
                        variant: "destructive" 
                      });
                      return;
                    }
                    
                    setIsLoading(true);
                    try {
                      console.log("🔄 Starting manual contract load...", { contractId, walletAddress });
                      await fetchContractInfo();
                      await fetchUserNFTs();
                      console.log("✅ Manual contract load completed");
                    } catch (error) {
                      console.error("❌ Manual contract load failed:", error);
                      // Error handling is already done in fetchContractInfo
                    } finally {
                      setIsLoading(false);
                    }
                  }} 
                  disabled={isLoading || !contractId || !walletAddress}
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Load Contract
                </Button>
              </div>
              {contractId && !isValidContractId(contractId) && (
                <p className="text-xs text-red-600">
                  Contract ID must be exactly 56 characters (A-Z, 0-9)
                </p>
              )}
              <p className="text-xs text-gray-500">
                Enter the Stellar contract ID of the NFT collection you want to interact with
              </p>
            </div>
          </div>

          {isInitialized && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Collection Name</Label>
                  <p className="font-bold text-lg text-gray-900">{collectionName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Symbol</Label>
                  <p className="font-bold text-lg text-gray-900">{collectionSymbol}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Your Balance</Label>
                  <p className="font-bold text-lg text-blue-600">{userBalance} NFTs</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="flex flex-wrap gap-2">
                    {isAdmin && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Admin
                      </Badge>
                    )}
                    {walletAddress && (
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Connected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {lastResult && (
        <Card>
          <CardContent className="p-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Latest Result:</h4>
              <p className="text-sm font-mono break-all">{lastResult}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {walletAddress && (
        <Tabs defaultValue="mint" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mint">Mint & Manage</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="query">Query NFTs</TabsTrigger>
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
          </TabsList>

          <TabsContent value="mint" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Mint NFT {isAdmin ? '' : '(Admin Only)'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderMintForm()}
                {!isAdmin && (
                  <p className="text-sm text-gray-600">Only the contract admin can mint NFTs.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Transfer NFT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="transferFrom" className="text-sm font-medium">
                      From Address *
                    </Label>
                    <Input
                      id="transferFrom"
                      placeholder="GCQZ... (sender address)"
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                      className="focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transferTo" className="text-sm font-medium">
                      To Address *
                    </Label>
                    <Input
                      id="transferTo"
                      placeholder="GDAB... (recipient address)"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      className="focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transferTokenId" className="text-sm font-medium">
                      Token ID *
                    </Label>
                    <Input
                      id="transferTokenId"
                      type="number"
                      placeholder="1"
                      value={transferTokenId}
                      onChange={(e) => setTransferTokenId(e.target.value)}
                      className="focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Ensure you have permission to transfer from the specified address</span>
                </div>
                
                <Button 
                  onClick={handleTransfer} 
                  disabled={isLoading || !walletAddress || !transferFrom || !transferTo || !transferTokenId}
                  className={`w-full transition-all duration-200 ${
                    isLoading || !walletAddress || !transferFrom || !transferTo || !transferTokenId
                      ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  }`}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Transferring NFT...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Transfer NFT
                    </>
                  )}
                </Button>
                
                {(!walletAddress || !transferFrom || !transferTo || !transferTokenId) && !isLoading && (
                  <div className="text-sm text-gray-500 text-center">
                    {!walletAddress && "Please connect your wallet first"}
                    {walletAddress && (!transferFrom || !transferTo || !transferTokenId) && "Please fill in all required fields"}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="query" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Query Token Owner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="queryTokenId" className="text-sm font-medium">
                      Token ID *
                    </Label>
                    <Input
                      id="queryTokenId"
                      type="number"
                      placeholder="Enter token ID (e.g., 1)"
                      value={queryTokenId}
                      onChange={(e) => setQueryTokenId(e.target.value)}
                      className="focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <Button 
                    onClick={handleQueryOwner} 
                    disabled={isLoading || !queryTokenId} 
                    className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    Get Owner
                  </Button>
                  {tokenOwner && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <Label className="text-sm font-medium text-green-800">Owner Address:</Label>
                      <p className="font-mono text-sm break-all mt-1 text-green-900">{tokenOwner}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Query Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="queryOwner" className="text-sm font-medium">
                      Owner Address *
                    </Label>
                    <Input
                      id="queryOwner"
                      placeholder="GCQZ... (Stellar public key)"
                      value={queryOwner}
                      onChange={(e) => setQueryOwner(e.target.value)}
                      className="focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={handleQueryBalance} 
                    disabled={isLoading || !queryOwner} 
                    className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Coins className="w-4 h-4 mr-2" />
                    )}
                    Get Balance
                  </Button>
                  {ownerBalance !== '' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Label className="text-sm font-medium text-blue-800">NFT Balance:</Label>
                      <p className="font-semibold text-blue-900 text-lg mt-1">{ownerBalance} NFTs</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Get Token Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Query token metadata using the last queried token ID
                  </Label>
                  <p className="text-xs text-gray-500">
                    This will fetch the metadata URI for the most recently queried token
                  </p>
                </div>
                <Button 
                  onClick={handleGetTokenUri} 
                  disabled={isLoading || !queryTokenId} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Fetching Metadata...
                    </>
                  ) : (
                    <>
                      <Image className="w-4 h-4 mr-2" />
                      Get Token URI
                    </>
                  )}
                </Button>
                {tokenUri && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <Label className="text-sm font-medium text-indigo-800">Token Metadata URI:</Label>
                    <div className="mt-2 p-3 bg-white border rounded-md">
                      <p className="font-mono text-sm break-all text-indigo-900">{tokenUri}</p>
                    </div>
                    {tokenUri.startsWith('http') && (
                      <a 
                        href={tokenUri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        View Metadata
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Panel {!isAdmin ? '(Admin Only)' : ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Contract Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Collection:</strong> {collectionName} ({collectionSymbol})</div>
                      <div>
                        <strong>Admin:</strong> 
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border">
                          {adminAddress || 'Not loaded'}
                        </div>
                        {walletAddress && adminAddress && (
                          <div className="mt-2">
                            <strong>Your Address:</strong>
                            <div className="font-mono text-xs mt-1 p-2 bg-white rounded border">
                              {walletAddress}
                            </div>
                            <div className="mt-1 text-xs">
                              {walletAddress === adminAddress ? (
                                <span className="text-green-600 font-semibold">✅ You are the admin</span>
                              ) : (
                                <span className="text-red-600">❌ You are not the admin</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div><strong>Your Balance:</strong> {userBalance} NFTs</div>
                    </div>
                  </div>
                </div>

                {!isAdmin && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Shield className="w-4 h-4 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-yellow-800">Admin Access Required</h4>
                    </div>
                    <div className="space-y-2 text-sm text-yellow-800">
                      <p>Only the contract administrator can mint NFTs.</p>
                      {adminAddress ? (
                        <>
                          <div className="mt-2">
                            <strong>Current Admin:</strong>
                            <div className="font-mono text-xs mt-1 p-2 bg-yellow-100 rounded border">
                              {adminAddress}
                            </div>
                          </div>
                          {walletAddress && (
                            <div className="mt-2">
                              <strong>Your Address:</strong>
                              <div className="font-mono text-xs mt-1 p-2 bg-yellow-100 rounded border">
                                {walletAddress}
                              </div>
                            </div>
                          )}
                          <p className="mt-2 text-xs">
                            💡 <strong>Solution:</strong> Connect with the admin wallet address shown above, or ask the current admin to transfer admin rights to your address using the "Transfer Admin" function.
                          </p>
                        </>
                      ) : (
                        <p>Please load the contract first to check admin permissions.</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default NFTInteract; 