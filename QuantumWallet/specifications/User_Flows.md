# User Flows & Experience

## Onboarding Flow

### Simple Path (Default):
    Welcome Screen
    ↓
    Create New Wallet
    ↓
    Generate Recovery Phrase (24 words)
    ↓
    Verify Recovery Phrase
    ↓
    Set Password
    ↓
    Automatic Quantum Protection Setup
    ↓
    Wallet Ready


### Quantum-First Path (Advanced):

    Welcome Screen
    ↓
        Choose Security Level:
        Basic: Traditional wallet
        Advanced: Quantum-resistant
    ↓
        If Advanced:
        Explain quantum protection simply
        Show "Master Key" vs "Spending Keys"
        Set up automatic key rotation
    ↓
    Generate Master Key (PQC)
    ↓
     Create First Spending Wallet
    ↓
    Backup Instructions
    ↓
    Wallet Ready

  
## Daily Use Flow

### Sending Funds:
    User clicks "Send"
    ↓
    Enter recipient address and amount
    ↓
    Review transaction
    ↓
    Enter password (if locked)
    ↓
    Wallet signs with Spending Key (ECDSA)
    ↓
    Transaction broadcasted
    ↓
    Confirmation shown


### Quantum Protection Status:

    User opens wallet
    ↓
    See security status:
        🔒 Protected (green)
        ⚠️ Needs update (yellow)
        🔴 At risk (red)
    ↓
    Click status for details:
        "Your funds are quantum-safe"
        "Next key rotation: 45 days"
        "Backup status: 3 of 5 stored"


## Migration/Recovery Flow

### Automatic Migration:

    Scheduled time arrives
    ↓
    Wallet checks for pre-signed migration
    ↓
    If found, executes automatically:
        Creates new spending key
        Moves funds via pre-signed transaction
        Updates all backup locations
    ↓
    Notifies user:
        "Funds moved to new key for security"
        "No action needed"


### Manual Migration (Emergency):

    User hears quantum threat news
    ↓
    Opens wallet, sees emergency alert
    ↓
    Clicks "Secure My Funds Now"
    ↓
    Wallet:
        Retrieves migration bundle
        Executes immediately
        Shows progress
    ↓
    Confirmation:
        "All funds now quantum-safe"
        "Old keys deactivated"



## Backup & Recovery Flow

### Initial Backup:

    During setup, prompt for backup
    ↓
    Options:
        Print QR code
        Save encrypted file
        Share with trusted devices
        Use cloud backup (encrypted)
        ↓
        Verify backup accessible


### Recovery Scenario:

    User loses device
    ↓
    On new device, "Recover Wallet"
    ↓
    
    Options:
        Enter recovery phrase (24 words)
        Scan backup QR code
        Login with cloud backup
    ↓
        Wallet recovers:
        Master Key (PQC)
        All spending keys
        Migration bundles
    ↓
    Resume normal use


## Educational Moments

### Progressive Disclosure:
1. **First week**: Basic wallet functions only
2. **After 5 transactions**: "Did you know your wallet is quantum-safe?"
3. **After 1 month**: "Your keys rotated automatically for security"
4. **When news breaks**: "Quantum computers in news? You're protected."

### Simple Language Guide:
- ❌ "Post-quantum cryptographic migration bundle"
- ✅ "Security update file"

- ❌ "Key rotation schedule"
- ✅ "Automatic security refresh"

- ❌ "Store-now decrypt-later attack"
- ✅ "Future-proof protection"

## Error States & Help

### Common Issues:
1. **"Migration bundle not found"**
   - Help: "Check other devices or backups"
   - Fallback: Create new migration now

2. **"Quantum protection disabled"**
   - Help: "Re-enable in security settings"
   - Risk explanation: "Your funds may be vulnerable"

3. **"Storage full for backups"**
   - Help: "Clean up old backups"
   - Option: Use alternative storage

4. **"Network fee too high"**
   - Help: "Wait or adjust protection schedule"
   - Option: Manual timing control
  
# Simple Summary for Beginners:
  Imagine we're building a special digital wallet (like a digital version of your 
  physical wallet, but for cryptocurrency).

**The Problem We're Solving:**
  Today's crypto wallets might be broken by future super-powerful computers (quantum computers)
  We want to build a wallet that's safe from both today's threats AND future threats

**Our Simple Solution:**
  We'll give the wallet two types of keys:
  A "Forever Key" (quantum-safe) - Like a bank vault key
  "Everyday Keys" (normal) - Like the wallet in your pocket

**If future when Quantum Computers arrive and try to break the everyday keys, 
your "Forever Key" can move all your money to new everyday keys safely.*
