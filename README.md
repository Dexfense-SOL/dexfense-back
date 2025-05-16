# Dexfense Backend

Dexfense Backend powers the off-chain services for the Dexfense Protocol — a fully on-chain GameFi experience on Solana. It acts as a relay and messaging layer between the game frontend, Solana Anchor programs, and the user, enabling real-time WebSocket updates and on-chain verifications.

## 🔧 Features

- **WebSocket Broadcast Layer**  
  Delivers real-time game session updates to the frontend using WebSocket.

- **Anchor Program Integration**  
  Connects to Solana smart contracts using Anchor with a dummy wallet (read-only).

- **Game Account Watcher**  
  Listens to on-chain GameAccount PDA for changes and emits game state events.

- **Trigger System**  
  Emits `game:started` events when a deposit is detected.

- **REST API**  
  Basic `/ping` endpoint for health checks.

## 🛠️ Project Structure

```
dexfense-back/
├── src/
│   ├── anchor/                # Solana program connection
│   ├── api/                   # Express.js base routes
│   ├── relayer/               # Watcher and trigger logic
│   ├── socketManager.ts       # WebSocket connection manager
│   └── server.ts              # HTTP + WS server setup
├── core_contract.json         # Anchor IDL for Solana program
├── package.json
└── tsconfig.json

```

## 🚀 Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Run the backend (development)

```bash
yarn dev
```

### 3. Build and run for production

```bash
yarn build
yarn start
```

## 📜 Requirements

- Node.js v18+
- Yarn
- Solana CLI
- Anchor CLI (cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked)

## 📄 License

MIT License
