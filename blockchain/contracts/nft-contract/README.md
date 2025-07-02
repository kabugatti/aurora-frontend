# Aurora NFT Contract 🎨

A fully-featured NFT (Non-Fungible Token) smart contract built with Soroban for the Stellar blockchain, integrated with a modern React frontend for seamless user interaction.

## 🚀 Features

### Smart Contract Features
- ✅ **ERC-721 Compatible**: Standard NFT functionality with mint, transfer, and burn operations
- ✅ **Admin Controls**: Secure administrative functions for collection management
- ✅ **Metadata Support**: Base URI and individual token URI management
- ✅ **Approval System**: Token approval and transfer authorization
- ✅ **Owner Tracking**: Complete ownership and balance tracking
- ✅ **Soroban Optimized**: Built specifically for Stellar's Soroban platform

### Frontend Integration
- ✅ **React Component**: Modern, responsive UI for NFT interactions
- ✅ **Wallet Integration**: Seamless Stellar wallet connectivity
- ✅ **Real-time Updates**: Live balance and ownership tracking
- ✅ **Admin Panel**: Comprehensive admin interface for contract management
- ✅ **TypeScript SDK**: Auto-generated TypeScript bindings for easy integration

### Development Tools
- ✅ **Comprehensive Makefile**: Build, deploy, test, and interact with the contract
- ✅ **TypeScript Bindings**: Auto-generated SDK for frontend integration
- ✅ **Test Suite**: Complete test coverage for all contract functions
- ✅ **Documentation**: Detailed guides and examples

## 📁 Project Structure

```
blockchain/contracts/nft-contract/
├── src/                          # Rust source code
│   ├── contract.rs              # Main contract implementation
│   ├── admin.rs                 # Admin functionality
│   ├── balance.rs               # Balance tracking
│   ├── metadata.rs              # Metadata management
│   ├── owner.rs                 # Ownership tracking
│   ├── token_approval.rs        # Approval system
│   ├── token_uri.rs             # URI management
│   ├── storage_types.rs         # Storage key definitions
│   ├── token_utils/             # Utility modules
│   │   ├── mod.rs
│   │   ├── event.rs             # Event emissions
│   │   └── metadata.rs          # Metadata structures
│   ├── test.rs                  # Test suite
│   └── lib.rs                   # Library root
├── Cargo.toml                   # Rust dependencies
├── Makefile                     # Build and deployment scripts
└── README.md                    # This file

blockchain/nft-sdk/              # Generated TypeScript SDK
├── src/
│   └── src/
│       └── index.ts             # Auto-generated TypeScript bindings
├── package.json                 # NPM package configuration
└── tsconfig.json                # TypeScript configuration

src/components/stellar/
└── nft-interact.jsx             # React component for NFT interaction
```

## 🛠️ Quick Start

### Prerequisites

1. **Rust and Cargo**: Install from [rustup.rs](https://rustup.rs/)
2. **Stellar CLI**: Install from [stellar docs](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
3. **Node.js**: Version 18+ for frontend development
4. **Stellar Wallet**: Freighter, Rabet, or compatible wallet for testnet

### 1. Build the Contract

```bash
# Build the NFT contract
make build

# Run tests
make test

# Check for code issues
make dev
```

### 2. Generate TypeScript Bindings

```bash
# Generate SDK and TypeScript bindings
make create-sdk
```

### 3. Deploy to Testnet

```bash
# Full deployment (build + deploy + initialize + generate bindings)
make full-deploy

# Or step by step:
make deploy          # Deploy the contract
make initialize      # Initialize with default settings
```

### 4. Interact with the Contract

```bash
# Get contract information
make info

# Mint an NFT (admin only)
make mint TO=GCQZQEHWCEM5AG2HY6CMPKXC7S5FL6U7Z44Q7RTYAPKFYQLQTNJ45X7W TOKEN_ID=1

# Check token owner
make owner-of TOKEN_ID=1

# Check balance
make balance-of OWNER=GCQZQEHWCEM5AG2HY6CMPKXC7S5FL6U7Z44Q7RTYAPKFYQLQTNJ45X7W

# Transfer token
make transfer FROM=GCQZ... TO=GDAB... TOKEN_ID=1
```

## 🎯 Contract Functions

### Core NFT Functions

| Function | Description | Access |
|----------|-------------|---------|
| `initialize` | Initialize the contract with admin and metadata | Deploy-time |
| `balance_of` | Get number of tokens owned by an address | Public |
| `owner_of` | Get the owner of a specific token | Public |
| `name` | Get collection name | Public |
| `symbol` | Get collection symbol | Public |
| `token_uri` | Get token metadata URI | Public |
| `base_uri` | Get base URI for all tokens | Public |

### Transfer Functions

| Function | Description | Access |
|----------|-------------|---------|
| `approve` | Approve another address to transfer a token | Token owner |
| `get_approved` | Get approved address for a token | Public |
| `transfer` | Transfer token to another address | Token owner |
| `transfer_from` | Transfer token on behalf of owner | Approved |

### Admin Functions

| Function | Description | Access |
|----------|-------------|---------|
| `mint` | Mint new NFT to specified address | Admin only |
| `burn` | Burn (destroy) an NFT | Token owner |
| `set_token_uri` | Set URI for specific token | Admin only |
| `set_base_uri` | Set base URI for all tokens | Admin only |
| `get_admin` | Get admin address | Public |

## 🖥️ Frontend Usage

### Accessing the NFT Interface

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/nft-interact`

3. Connect your Stellar wallet (Freighter, Rabet, etc.)

4. Enter a deployed contract ID or deploy a new one

### Interface Features

The React component provides:

- **Contract Connection**: Connect to any deployed NFT contract
- **Minting Interface**: Admin-only NFT minting with recipient and token ID
- **Transfer System**: Transfer NFTs between addresses with approval support
- **Query Tools**: Check ownership, balances, and token metadata
- **Admin Panel**: Contract initialization and metadata management
- **Real-time Updates**: Live balance and status updates

### React Component Integration

```jsx
import NFTInteract from '@/components/stellar/nft-interact';

// In your React app
function App() {
  return (
    <div>
      <NFTInteract />
    </div>
  );
}
```

## 🔧 Development

### Available Make Commands

**Building & Testing:**
```bash
make build      # Build the contract
make test       # Run test suite
make clean      # Clean build artifacts
make fmt        # Format code
make lint       # Run clippy linter
make check      # Check code without building
```

**Deployment:**
```bash
make deploy         # Deploy to testnet
make initialize     # Initialize deployed contract
make full-deploy    # Complete deployment flow
```

**Contract Interaction:**
```bash
make mint TO=<address> TOKEN_ID=<id>           # Mint NFT
make transfer FROM=<addr> TO=<addr> TOKEN_ID=<id>  # Transfer NFT
make owner-of TOKEN_ID=<id>                    # Get token owner
make balance-of OWNER=<address>                # Get balance
```

**Development Tools:**
```bash
make bindings    # Generate TypeScript bindings
make create-sdk  # Create complete SDK package
make info        # Show contract information
make help        # Show all commands
```

### TypeScript SDK Usage

```typescript
import { Client } from '@aurora/nft-sdk';
import { Networks } from '@stellar/stellar-sdk';

// Initialize contract client
const nftContract = new Client({
  networkPassphrase: Networks.TESTNET,
  rpcUrl: 'https://soroban-testnet.stellar.org',
  contractId: 'YOUR_CONTRACT_ID'
});

// Mint an NFT
const mintResult = await nftContract.mint({
  to: 'RECIPIENT_ADDRESS',
  token_id: 1
});

// Get token owner
const ownerResult = await nftContract.owner_of({ token_id: 1 });
console.log('Token owner:', ownerResult.result);

// Transfer token
const transferResult = await nftContract.transfer({
  from: 'FROM_ADDRESS',
  to: 'TO_ADDRESS',
  token_id: 1
});
```

## 🔐 Security Features

- **Admin-only functions**: Minting and metadata management restricted to admin
- **Ownership verification**: All transfers require proper authorization
- **Approval system**: Secure token approval and delegation
- **Initialization check**: Prevents contract re-initialization
- **Error handling**: Comprehensive error messages and validation

## 🎨 Customization

### Metadata Structure

The contract supports flexible metadata through:

- **Base URI**: Common prefix for all token URIs
- **Token URI**: Individual metadata for specific tokens
- **Combined URIs**: Automatic concatenation of base + token URIs

### Example Metadata Setup

```bash
# Set base URI for all tokens
make set-base-uri BASE_URI="https://api.aurora.com/metadata/"

# Set specific token URI
make set-token-uri TOKEN_ID=1 TOKEN_URI="special-token.json"

# Result: https://api.aurora.com/metadata/special-token.json
```

## 🌟 Example Usage Scenarios

### 1. Educational Certificates
```bash
# Deploy and initialize for certificates
make full-deploy

# Mint certificate to student
make mint TO=STUDENT_ADDRESS TOKEN_ID=101

# Set certificate metadata
stellar contract invoke --id CONTRACT_ID -- set_token_uri --token_id 101 --token_uri "certificate-101.json"
```

### 2. Course Completion Badges
```bash
# Set base URI for course badges
stellar contract invoke --id CONTRACT_ID -- set_base_uri --base_uri "https://aurora.com/badges/"

# Mint completion badge
make mint TO=LEARNER_ADDRESS TOKEN_ID=202
```

### 3. Achievement NFTs
```bash
# Mint achievement NFT
make mint TO=USER_ADDRESS TOKEN_ID=303

# Transfer achievement
make transfer FROM=USER_ADDRESS TO=PORTFOLIO_ADDRESS TOKEN_ID=303
```

## 🔍 Troubleshooting

### Common Issues

1. **Contract not initialized**
   ```bash
   # Check if contract is initialized
   make info
   
   # Initialize if needed
   make initialize
   ```

2. **Admin permission denied**
   - Ensure you're using the admin account
   - Check admin address: `stellar contract invoke --id CONTRACT_ID -- get_admin`

3. **Token doesn't exist**
   - Verify token ID exists: `make owner-of TOKEN_ID=<id>`
   - Check if token was burned

4. **Insufficient authorization**
   - Ensure you own the token or have approval
   - Check approvals: `stellar contract invoke --id CONTRACT_ID -- get_approved --token_id <id>`

### Network Configuration

The contract is configured for Stellar Testnet by default. To use mainnet:

1. Update Makefile: `NETWORK = mainnet`
2. Update RPC URL: `RPC_URL = https://soroban-mainnet.stellar.org`
3. Ensure you have mainnet XLM for fees

## 📈 Performance & Optimization

### WASM Optimization

```bash
# Install binaryen for WASM optimization
brew install binaryen  # macOS
apt install binaryen    # Ubuntu

# Optimize WASM file
make optimize
```

### Gas Optimization

The contract is optimized for:
- Minimal storage usage with efficient key structures
- Batch operations where possible
- TTL management for persistent storage
- Streamlined function logic

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Run tests**: `make test`
4. **Format code**: `make fmt`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Stellar Documentation](https://developers.stellar.org/)
- **Discord**: [Stellar Developer Discord](https://discord.gg/stellardev)
- **Issues**: Open an issue in this repository

## 🎯 Roadmap

- [ ] **Batch Operations**: Mint/transfer multiple NFTs in one transaction
- [ ] **Marketplace Integration**: Built-in trading functionality
- [ ] **Royalty System**: Creator royalties on secondary sales
- [ ] **Upgradeable Contract**: Admin-controlled contract upgrades
- [ ] **Cross-chain Bridge**: Integration with other blockchain networks

---

**Built with ❤️ for the Aurora Language Learning Platform**

*Empowering education through blockchain technology* 