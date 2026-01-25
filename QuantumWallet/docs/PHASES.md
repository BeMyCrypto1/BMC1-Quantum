# Phase-by-Phase Implementation Guide

## 🎯 Phase 0: Absolute Beginner Start (Week 1-2)

### Day 1-3: Setup

    Install Node.js from nodejs.org
    Verify installation
    node --version # Should show v18 or higher
    npm --version # Should show v9 or higher
    
    Install VS Code
    Create first project
      mkdir BMC1-Wallet
      cd BMC1-Wallet
      npm init -y



### Day 4-7: First Wallet Script
Create `BMC1-wallet.js`:
```javascript
// Just generates an address - nothing more
const ethers = require('ethers');

// Create a wallet
const wallet = ethers.Wallet.createRandom();

console.log("Address:", wallet.address);
console.log("Private Key:", wallet.privateKey);
console.log("Mnemonic:", wallet.mnemonic.phrase);
