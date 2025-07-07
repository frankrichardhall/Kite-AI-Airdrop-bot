# Kite-AI-Airdrop-bot
Kite AI Auto-Bot is an advanced, fully autonomous JavaScript-powered solution engineered to dominate the Kite AI ecosystem and its forks, including GoKite, Pharos, and Interlink. Effortlessly farm XP, claim daily rewards, and engage AI agents using multiple wallets — all hands-free, at scale, and with precision. Designed for power users seeking maximum efficiency in AI blockchain interactions.

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