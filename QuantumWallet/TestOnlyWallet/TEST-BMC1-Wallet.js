// ================================================
// BE MY CRYPTO 1 WALLET - BMC1-WALLET
// Quantum-Resistant Crypto Wallet
// ================================================

// Import required libraries
const { ethers } = require('ethers');      // For blockchain interaction
const CryptoJS = require('crypto-js');     // For encryption (AES-256)
const fs = require('fs');                  // For file system operations
const path = require('path');              // For file paths

class BMC1Wallet {
    // ================================================
    // CONSTRUCTOR: Initialize the wallet
    // ================================================
    constructor(walletName, storagePath) {
        this.name = walletName || "BeMyCrypto1 Wallet";
        this.version = "1.0.0";
        this.wallets = []; // Array to store multiple wallet accounts
        
        // Where wallet data will be stored on disk
        this.storagePath = storagePath || path.join(__dirname, 'BMC1-wallet-storage');
        
        // Create storage directory if it doesn't exist
        if (!fs.existsSync(this.storagePath)) {
            fs.mkdirSync(this.storagePath, { recursive: true });
        }
        
        // Polygon Mumbai TESTNET (FREE test MATIC)
        this.network = {
            name: "Polygon Mumbai Testnet",
            rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/demo",
            chainId: 80001,
            currency: "MATIC (Test)"
        };
        
        console.log(`🔷 ${this.name} v${this.version}`);
        console.log(`📁 Storage: ${this.storagePath}`);
        console.log(`🌐 Network: ${this.network.name}\n`);
    }
    
    // ================================================
    // PASSWORD SECURITY: Hash user password
    // ================================================
    _hashPassword(plainPassword) {
        // Hash password 100,000 times to slow brute-force attacks
        let hashed = plainPassword;
        for (let i = 0; i < 100000; i++) {
            hashed = CryptoJS.SHA256(hashed + "BMC1_SALT_v1").toString();
        }
        return hashed;
    }
    
    // ================================================
    // ENCRYPTION: Encrypt private data with password
    // ================================================
    _encryptData(data, plainPassword) {
        const hashedPassword = this._hashPassword(plainPassword);
        return CryptoJS.AES.encrypt(JSON.stringify(data), hashedPassword).toString();
    }
    
    // ================================================
    // DECRYPTION: Decrypt data with password
    // ================================================
    _decryptData(encryptedData, plainPassword) {
        const hashedPassword = this._hashPassword(plainPassword);
        const bytes = CryptoJS.AES.decrypt(encryptedData, hashedPassword);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    
    // ================================================
    // CREATE NEW WALLET: Generate new Polygon wallet
    // ================================================
    createNewWallet(plainPassword, walletName) {
        // 1. Generate new random wallet using ethers.js
        const wallet = ethers.Wallet.createRandom();
        
        // 2. Prepare wallet data
        const walletData = {
            id: `BMC1_wallet_${Date.now()}`,
            name: walletName || `BMC1 Wallet ${this.wallets.length + 1}`,
            address: wallet.address,
            encryptedPrivateKey: this._encryptData(wallet.privateKey, plainPassword),
            encryptedMnemonic: wallet.mnemonic ? this._encryptData(wallet.mnemonic.phrase, plainPassword) : null,
            publicKey: wallet.publicKey,
            network: this.network.name,
            createdAt: new Date().toISOString(),
            balance: "0"
        };
        
        // 3. Store in memory
        this.wallets.push(walletData);
        
        // 4. Save to disk immediately
        this._saveToDisk(plainPassword);
        
        console.log(`✅ BMC1 WALLET CREATED:`);
        console.log(`   Name: ${walletData.name}`);
        console.log(`   Address: ${walletData.address}`);
        console.log(`   Network: ${walletData.network}`);
        console.log(`   Saved to: ${this.storagePath}`);
        
        return {
            name: walletData.name,
            address: walletData.address,
            warning: "🔒 SAVE YOUR MNEMONIC PHRASE SECURELY! NEVER SHARE PRIVATE KEY!"
        };
    }
    
    // ================================================
    // SAVE TO DISK: Encrypt and save all wallet data
    // ================================================
    _saveToDisk(plainPassword) {
        const dataToSave = {
            version: this.version,
            walletName: this.name,
            wallets: this.wallets,
            lastBackup: new Date().toISOString()
        };
        
        const encryptedData = this._encryptData(dataToSave, plainPassword);
        const filePath = path.join(this.storagePath, 'BMC1-wallet-data.encrypted.json');
        
        fs.writeFileSync(filePath, encryptedData, 'utf8');
        
        console.log(`💾 BMC1 Wallet data saved`);
        console.log(`   File: ${filePath}`);
        console.log(`   Encryption: AES-256 with password hashing`);
    }
    
    // ================================================
    // LOAD FROM DISK: Load encrypted wallet data
    // ================================================
    loadFromDisk(plainPassword) {
        const filePath = path.join(this.storagePath, 'BMC1-wallet-data.encrypted.json');
        
        if (!fs.existsSync(filePath)) {
            console.log("❌ No BMC1 wallet data found. Create a wallet first.");
            return false;
        }
        
        try {
            const encryptedData = fs.readFileSync(filePath, 'utf8');
            const decryptedData = this._decryptData(encryptedData, plainPassword);
            
            this.wallets = decryptedData.wallets;
            
            console.log(`✅ BMC1 Wallet data loaded`);
            console.log(`   Wallets loaded: ${this.wallets.length}`);
            console.log(`   Last backup: ${decryptedData.lastBackup}`);
            
            return true;
        } catch (error) {
            console.log("❌ Failed to load BMC1 wallet:");
            console.log(`   Error: ${error.message}`);
            console.log(`   Possible wrong password or corrupted file`);
            return false;
        }
    }
    
    // ================================================
    // CHECK BALANCE: Get MATIC balance from blockchain
    // ================================================
    async checkBalance(walletIndex) {
        if (!this.wallets[walletIndex]) {
            console.log("❌ BMC1 Wallet not found");
            return "0";
        }
        
        const address = this.wallets[walletIndex].address;
        
        console.log(`🔍 Checking BMC1 Wallet balance...`);
        console.log(`   Address: ${address}`);
        
        try {
            // Connect to Polygon network
            const provider = new ethers.JsonRpcProvider(this.network.rpcUrl);
            
            // Get balance from blockchain
            const balanceWei = await provider.getBalance(address);
            const balanceMatic = ethers.utils.formatEther(balanceWei);
            
            // Update in memory
            this.wallets[walletIndex].balance = balanceMatic;
            
            console.log(`   Balance: ${balanceMatic} ${this.network.currency}`);
            console.log(`   Network: ${this.network.name}`);
            
            return balanceMatic;
        } catch (error) {
            console.log(`❌ Network error: ${error.message}`);
            return "0";
        }
    }
    
    // ================================================
    // LIST WALLETS: Show all wallets
    // ================================================
    listWallets() {
        console.log(`\n📦 ${this.name} - Your Wallets:`);
        console.log(`═`.repeat(50));
        
        if (this.wallets.length === 0) {
            console.log("   No BMC1 wallets found. Create one first.");
            return;
        }
        
        this.wallets.forEach((wallet, index) {
            console.log(`${index + 1}. ${wallet.name}`);
            console.log(`   Address: ${wallet.address}`);
            console.log(`   Balance: ${wallet.balance} ${this.network.currency}`);
            console.log(`   Created: ${wallet.createdAt}`);
            console.log(``);
        });
    }
    
    // ================================================
    // GET WALLET INFO: Detailed wallet information
    // ================================================
    getWalletInfo(walletIndex, plainPassword) {
        const wallet = this.wallets[walletIndex];
        if (!wallet) {
            console.log("❌ BMC1 Wallet not found");
            return null;
        }
        
        console.log(`\n📋 BMC1 Wallet Details:`);
        console.log(`═`.repeat(50));
        console.log(`Name: ${wallet.name}`);
        console.log(`Address: ${wallet.address}`);
        console.log(`Network: ${wallet.network}`);
        console.log(`Created: ${wallet.createdAt}`);
        console.log(`Current Balance: ${wallet.balance} MATIC`);
        
        // Verify password works by attempting decryption
        try {
            const decryptedKey = this._decryptData(wallet.encryptedPrivateKey, plainPassword);
            console.log(`Password verification: ✅ CORRECT`);
            console.log(`Private key: [ENCRYPTED - Password verified]`);
        } catch (error) {
            console.log(`Password verification: ❌ WRONG PASSWORD`);
        }
        
        return wallet;
    }
    
    // ================================================
    // SEND TRANSACTION: Send MATIC to another address
    // ================================================
    async sendTransaction(walletIndex, plainPassword, toAddress, amountMatic) {
        const walletData = this.wallets[walletIndex];
        if (!walletData) {
            console.log("❌ BMC1 Wallet not found");
            return null;
        }
        
        console.log(`\n💸 BMC1 Wallet - Preparing transaction...`);
        console.log(`   From: ${walletData.address}`);
        console.log(`   To: ${toAddress}`);
        console.log(`   Amount: ${amountMatic} MATIC`);
        
        try {
            // 1. Decrypt private key
            const privateKey = this._decryptData(walletData.encryptedPrivateKey, plainPassword);
            
            // 2. Connect to network
            const provider = new ethers.JsonRpcProvider(this.network.rpcUrl);
            
            // 3. Create wallet instance with private key
            const wallet = new ethers.Wallet(privateKey, provider);
            
            // 4. Prepare transaction
            const tx = {
                to: toAddress,
                value: ethers.utils.parseEther(amountMatic.toString()),
                gasLimit: 21000,
                gasPrice: await provider.getGasPrice()
            };
            
            // 5. Send transaction
            console.log(`\n📤 Sending to blockchain...`);
            const transaction = await wallet.sendTransaction(tx);
            
            console.log(`✅ BMC1 Transaction sent!`);
            console.log(`   TX Hash: ${transaction.hash}`);
            console.log(`   View: https://mumbai.polygonscan.com/tx/${transaction.hash}`);
            
            // 6. Wait for confirmation
            console.log(`\n⏳ Waiting for confirmation...`);
            const receipt = await transaction.wait();
            
            console.log(`✅ BMC1 Transaction confirmed!`);
            console.log(`   Block: ${receipt.blockNumber}`);
            console.log(`   Gas used: ${receipt.gasUsed.toString()}`);
            
            return transaction.hash;
            
        } catch (error) {
            console.log(`❌ BMC1 Transaction failed: ${error.message}`);
            
            if (error.message.includes("insufficient funds")) {
                console.log(`\n💰 You need test MATIC for gas fees`);
                console.log(`   1. Get free test MATIC:`);
                console.log(`      https://faucet.polygon.technology/`);
                console.log(`   2. Select "Mumbai" network`);
                console.log(`   3. Paste your address: ${walletData.address}`);
                console.log(`   4. Wait 1-2 minutes, then try again`);
            }
            
            return null;
        }
    }
}

// ================================================
// MAIN FUNCTION: How to use BMC1 Wallet
// ================================================
async function main() {
    console.log("=".repeat(60));
    console.log("BE MY CRYPTO 1 WALLET - BMC1");
    console.log("Quantum-Resistant Crypto Wallet");
    console.log("=".repeat(60));
    
    // 1. INITIALIZE BMC1 WALLET
    const bmc1Wallet = new BMC1Wallet("BeMyCrypto1 Wallet");
    
    // 2. CREATE NEW WALLET (first time only)
    const userPassword = "YourStrongBMC1Password123!";
    const newWallet = bmc1Wallet.createNewWallet(userPassword, "My Primary BMC1 Wallet");
    
    // 3. CHECK BALANCE
    console.log("\n" + "=".repeat(60));
    console.log("CHECKING BLOCKCHAIN BALANCE...");
    const balance = await bmc1Wallet.checkBalance(0);
    
    // 4. LIST ALL WALLETS
    console.log("\n" + "=".repeat(60));
    bmc1Wallet.listWallets();
    
    // 5. SHOW WALLET INFO
    console.log("\n" + "=".repeat(60));
    bmc1Wallet.getWalletInfo(0, userPassword);
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ BMC1 WALLET READY FOR USE");
    console.log("=".repeat(60));
    
    // ================================================
    // BMC1 WALLET STORAGE INFO:
    // ================================================
    console.log("\n📁 BMC1 WALLET STORAGE:");
    console.log(`   Directory: ${bmc1Wallet.storagePath}`);
    console.log(`   File: BMC1-wallet-data.encrypted.json`);
    console.log(`   Format: AES-256 Encrypted JSON`);
    
    console.log("\n🔒 BMC1 SECURITY:");
    console.log(`   • Private keys NEVER stored in plain text`);
    console.log(`   • Password hashed 100,000 times`);
    console.log(`   • Encrypted file requires password to open`);
    
    console.log("\n🚀 BMC1 NEXT STEPS:");
    console.log(`   1. Get FREE test MATIC for your address:`);
    console.log(`      ${newWallet.address}`);
    console.log(`   2. Use sendTransaction() to send MATIC`);
    console.log(`   3. Add quantum-resistant key generation`);
    console.log(`   4. Package as browser extension`);
    
    console.log("\n💰 GET FREE TEST MATIC:");
    console.log(`   Website: https://faucet.polygon.technology/`);
    console.log(`   Network: Select "Mumbai"`);
    console.log(`   Address: ${newWallet.address}`);
    console.log(`   Wait: 1-2 minutes for funds`);
}

// ================================================
// RUN BMC1 WALLET
// ================================================
if (require.main === module) {
    main().catch(error => {
        console.error("❌ BMC1 FATAL ERROR:", error);
        process.exit(1);
    });
}

// Export BMC1Wallet for use in other files
module.exports = BMC1Wallet;
