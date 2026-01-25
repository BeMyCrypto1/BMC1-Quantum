
## Quantum Threat Analysis

## Timeline Estimates
- **2025-2030**: Early quantum computers (50-100 qubits)
- **2030-2035**: Cryptographically relevant quantum computers (1000+ stable qubits)
- **2035+**: Widespread quantum threat to current cryptography

## Affected Cryptography

### Broken by Quantum Computers:
1. **ECDSA** (Elliptic Curve Digital Signature Algorithm)
   - Used by: Bitcoin, Ethereum, most blockchains
   - Shor's algorithm breaks it in polynomial time

2. **RSA**
   - Used in: SSL/TLS, some blockchain components
   - Shor's algorithm breaks it

3. **Diffie-Hellman**
   - Used in: Key exchange protocols
   - Shor's algorithm breaks it

### Resistant to Quantum Computers:
1. **Hash-based signatures** (SPHINCS+)
   - Large signatures but quantum-safe

2. **Lattice-based cryptography** (CRYSTALS-Dilithium, Kyber)
   - Good balance of size/speed/security

3. **Code-based cryptography**
   - Large keys but well-studied

4. **Multivariate cryptography**
   - Medium-sized signatures

## Migration Urgency

### Immediate Risk (Store-Now, Decrypt-Later):
- Attackers recording blockchain transactions today
- Can decrypt/forge when quantum computers arrive
  
- **Action needed NOW**: Pre-migration before transactions are recorded

### Future Risk (Active Attack):
- Quantum computers actively attacking live transactions
- Requires immediate migration
- **Our solution**: Pre-signed migrations ready to execute

## Blockchain-Specific Risks

### Ethereum/EVMs:
- ECDSA signatures on all transactions
- Smart contracts with embedded public keys
- Large surface area for attack

### Bitcoin:
- ECDSA in transaction signatures
- Public keys revealed when spending
- Unspent outputs vulnerable

### Solana:
- Ed25519 signatures (different curve, still quantum-vulnerable)
- High throughput = more transactions recorded

## Our Protective Measures

### 1. Proactive Key Rotation
- Change spending keys before quantum threat
- Make recorded signatures useless

### 2. Quantum-Safe Authentication
- Master key uses PQC algorithms
- Can authorize new spending keys

### 3. Distributed Trust
- No single point of failure
- Migration bundles stored redundantly

### 4. Time-Based Protection
- Automatic expiration of old keys
- Scheduled reauthorization
