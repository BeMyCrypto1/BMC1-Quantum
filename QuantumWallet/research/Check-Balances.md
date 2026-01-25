# HOW TO Check USDC Balance: 

    // Add this test after line 250 in main() function:
    console.log("\n" + "=".repeat(60));
    console.log("CHECKING USDC BALANCE (Example)...");
    
    // USDC contract address on Polygon
    const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    await bmc1Wallet.checkTokenBalance(0, usdcAddress);
