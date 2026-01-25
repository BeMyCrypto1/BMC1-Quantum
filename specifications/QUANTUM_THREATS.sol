// Quantum computing threat assessment
const QUANTUM_THREAT_TIMELINE = {
    current: "No practical quantum computers exist",
    nearTerm: "NISQ devices (50-100 qubits) - limited threat",
    mediumTerm: "1,000+ qubits - breaks ECDSA/RSA",
    longTerm: "Fully error-corrected quantum computers"
};

// Vulnerable algorithms
const VULNERABLE_ALGORITHMS = {
    ECDSA: "Broken by Shor's algorithm",
    RSA: "Broken by Shor's algorithm",
    DH: "Broken by Shor's algorithm"
};

// Quantum-resistant algorithms
const QUANTUM_RESISTANT_ALGORITHMS = {
    XMSS: "Hash-based signatures (used by QRL)",
    Dilithium: "Lattice-based (NIST standard)",
    Falcon: "Lattice-based (NIST standard)",
    SPHINCS: "Stateless hash-based signatures"
};
