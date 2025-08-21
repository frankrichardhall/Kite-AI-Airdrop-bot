# Kite AI Airdrop bot
Kite AI Auto-Bot is an advanced, fully autonomous JavaScript-powered solution engineered to dominate the Kite AI ecosystem and its forks, including GoKite, Pharos, and Interlink. Effortlessly farm XP, claim daily rewards, and engage AI agents using multiple wallets — all hands-free, at scale, and with precision.

## Features
- Agent Interactions: Automatically interact with AI agents such as Professor, Crypto Buddy, and Sherlock using customizable prompts.
- Daily Faucet Claim: Automated CAPTCHA-solving and daily KITE token claims for eligible wallets.
- Staking Automation: Auto-stake KITE tokens, claim staking rewards, and monitor staking progress without manual intervention.
- Multi-Wallet Support: Manage, switch, and rotate multiple wallets efficiently within a single bot instance.
- Smart Analytics: Real-time monitoring of XP points, token balances, staking status, and other relevant metrics.
- Scheduled Execution: Built-in countdown system that re-executes the bot every 24 hours for continuous, hands-free operation.

## Requirements

- Node.js
- Private keys for the wallets you intend to use (stored in `privateKeys.json`).

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/frankrichardhall/Kite-AI-Airdrop-bot.git
   cd Kite-AI-Airdrop-bot
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create `privateKeys.json`**:
   Create a file named `privateKeys.json` in the root directory with the following format:

   ```json
   [
     "your_private_key_1",
     "your_private_key_2"
   ]
   ```

4. **Run the Bot**:

   ```bash
   npm start
   ```

## Usage

- Use `npm start` to check the menu options available.
- Choose the appropriate command based on the network you want to use.
- The bot will automatically execute the transactions, handling any errors and retrying as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
 
 
 
 
 
 
 
 
 
 
