# Design Philosophy

## 1. Non-Negotiables
1. **Quantum-Resistance First**
   - Core cryptographic identity must be secure against Cryptographically Relevant Quantum Computers (CRQC)
   - This is the foundational constraint of the entire system

2. **Backwards Compatibility, Today**
   - Must interact seamlessly with non-quantum-safe blockchains (Ethereum, Bitcoin, etc.)
   - This is the biggest UX and technical challenge

3. **No "Flag-Day" Transition**
   - Users should NOT be forced to panic-move funds when QC arrives
   - Migration to quantum-safe state must be possible, safe, and encouraged long before any threat

4. **Crypto-Agility**
   - System must allow swapping cryptographic algorithms without changing user's core identity
   - No need for new wallet when algorithms need updating

## 2. Threat Models Addressed
### Store-Now, Decrypt-Later Attack
- Adversary records public transactions today
- Waits for quantum computer to break ECDSA
- Forges signatures to steal assets

### Future Active Attack
- Quantum computer exists and is actively targeting live transactions
- Immediate theft risk for unprotected wallets

### Transition Period Chaos
- When quantum computers emerge, global rush to move funds causes:
  - Network congestion
  - Sky-high transaction fees
  - Panic and potential loss
- Our users should remain calm with pre-planned migration

## 3. User Experience Principles
- **Hide complexity**: Quantum mechanics should be invisible to average users
- **Automatic protection**: Default safe behaviors without user intervention
- **Clear communication**: Explain security in simple, non-technical terms
- **Gradual education**: Teach quantum concepts as users become ready
