    // ================================================
    // SEND TRANSACTION: Send MATIC to another address
    // ================================================
    async sendTransaction(walletIndex, plainPassword, toAddress, amountMatic) {
        const walletData = this.wallets[walletIndex];
        if (!walletData) {
            console.log("❌ Wallet not found");
            return null;
        }
        
        console.log(`💸 Preparing transaction...`);
        console.log(`   From: ${walletData.address}`);
        console.log(`   To: ${toAddress}`);
        console.log(`   Amount: ${amountMatic} MATIC`);
        
        try {
            // 1. Decrypt private key
            const privateKey = this._decryptData(walletData.encryptedPrivateKey, plainPassword);
            
            // 2. Connect to network
            const provider = new ethers.providers.JsonRpcProvider(this.network.rpcUrl);
            
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
            
            console.log(`✅ Transaction sent!`);
            console.log(`   TX Hash: ${transaction.hash}`);
            console.log(`   View on explorer: https://mumbai.polygonscan.com/tx/${transaction.hash}`);
            
            // 6. Wait for confirmation
            console.log(`\n⏳ Waiting for confirmation...`);
            const receipt = await transaction.wait();
            
            console.log(`✅ Transaction confirmed!`);
            console.log(`   Block: ${receipt.blockNumber}`);
            console.log(`   Gas used: ${receipt.gasUsed.toString()}`);
            
            return transaction.hash;
            
        } catch (error) {
            console.log(`❌ Transaction failed: ${error.message}`);
            
            if (error.message.includes("insufficient funds")) {
                console.log(`   You need more MATIC for gas fees`);
                console.log(`   Get free test MATIC: https://faucet.polygon.technology/`);
            }
            
            return null;
        }
    }
