# System Architecture

## Dual-Identity System
The core innovation: Two intertwined identities per user

### 1. Quantum-Resistant Identity (QR-ID)
- **Purpose**: User's true, long-term, master identity. Source of sovereign control.
- **Technology**: Post-Quantum Cryptography (PQC) signature scheme
- **Storage**: Heavily protected, likely offline or MPC fragments
- **Algorithms considered**: CRYSTALS-Dilithium, SPHINCS+, Falcon

### 2. Legacy Blockchain Identity (LBI)
- **Purpose**: Disposable, operational alias for current blockchains
- **Technology**: Traditional ECDSA keypair (like MetaMask)
- **Key Feature**: Derived from and controlled by the QR-ID
- **Usage**: Daily transactions, dApp interactions

## How It Works - Visual Flow

    [User's Device]
    |
    |--- 🔐 QR-ID (PQC Master Keys)
    |     |
    |     |--(Derives via PQC-KDF)--> 💳 LBI-1 (ECDSA) → 0x123... (Ethereum)
    |     |--(Derives via PQC-KDF)--> 💳 LBI-2 (ECDSA) → bc1q... (Bitcoin)
    |     |--(Derives via PQC-KDF)--> 💳 LBI-3 (Ed25519) → 8x5g... (Solana)
    |
    |--- 🔄 Pre-Signed Migration Bundle
    |
    |--(Signed by QR-ID)--> "Move from LBI-1 to LBI-1'"
    |--(Timestamped)--------> Quantum-Resistant Ledger (IOTA/QAN)
    |--(Stored)------------> Distributed Storage (IPFS/P2P)


## Critical Sub-Systems

### 1. Pre-Signed Transaction Vault
**Problem**: Where to store quantum-safe migration authorizations?

**Options**:
- **IPFS/Arweave**: Decentralized storage, indexed via QR ledger
- **P2P Network**: Wallet instances back up each other's encrypted bundles
- **Guardian Nodes**: Consortium-run nodes storing encrypted blobs
- **User's Own Devices**: Cross-device synchronization

### 2. Quantum Anchor Ledger
**Purpose**: Timestamp and prove state transitions

**Candidates**:
- **IOTA**: Quantum-resistant by design (Winternitz signatures)
- **QANplatform**: Built for post-quantum from ground up
- **Hedera Hashgraph**: High throughput for state proofs

**Job**: Record hash proving: "User X's QR-ID authorizes LBI-A → LBI-B at time T"

### 3. Bridge/Relayer System
**Problem**: How does PQC-signed intent become an Ethereum transaction?

**Solution - Relayer Network**:
1. Wallet creates PQC-signed message
2. Sends to Relayer
3. Relayer submits to Verifier Smart Contract on Ethereum
4. Contract verifies PQC signature (needs pre-compile/EIP for efficiency)
5. Contract executes the fund movement

### 4. Smart Contract Wallet Pathway (Future)
Make LBI an ERC-4337 Smart Account controlled by PQC signatures:
- Smart contract's `validateUserOp` verifies PQC signature
- Eliminates ECDSA from control flow
- **Challenge**: High gas costs for PQC verification on-chain

## Key Technical Decisions

### PQC Algorithm Selection Criteria
1. **Signature size** (affects storage and transmission)
2. **Verification speed** (critical for user experience)
3. **Maturity** (NIST standardization status)
4. **Implementation availability** (library support)

### Key Derivation Function
Must be quantum-resistant:
- Hash-based KDF (HKDF with SHA3/SHAKE)
- Lattice-based constructions
- Must allow derivation of multiple key types (ECDSA, Ed25519, etc.)

### Storage Security Model
- **QR-ID private key**: Never leaves secure enclave/HSM
- **LBI private keys**: Device-encrypted, can be rotated
- **Migration bundles**: Encrypted, distributed storage
