const readline = require('readline');
const logger = require('./src/utils/logger');
const { loadPrivateKeys } = require('./src/models/walletModel');
const { getWallet } = require('./src/controllers/walletController');
const { login, getUserProfile } = require('./src/services/kiteService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptInteractionCount() {
  return new Promise((resolve) => {
    rl.question('Please enter the number of interactions per agent: ', (answer) => {
      const count = parseInt(answer, 10);
      if (isNaN(count) || count < 1 || count > 99999) {
        logger.error('Invalid input. Please enter a number between 1 and 99999.');
        process.exit(1);
      }
      resolve(count);
    });
  });
}

async function dailyRun() {
  logger.banner();

  let privateKeys;
  try {
    privateKeys = await loadPrivateKeys();
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }

  const interactionCount = await promptInteractionCount();

  for (const key of privateKeys) {
    const wallet = getWallet(key);
    if (!wallet) continue;

    logger.wallet(`Processing wallet: ${wallet.address}`);

    const loginData = await login(wallet);
    if (!loginData) continue;

    const { access_token } = loginData;

    const profile = await getUserProfile(access_token);
    if (!profile) continue;

    logger.info(`User: ${profile.profile.displayed_name || 'Unknown'}`);
    logger.info(`EOA Address: ${profile.profile.eoa_address || wallet.address}`);
    logger.info(`Smart Account: ${profile.profile.smart_account_address || 'N/A'}`);
    logger.info(`Total XP Points: ${profile.profile.total_xp_points || 0}`);
  }

  logger.success('Bot execution completed');
  rl.close();
}

dailyRun().catch(error => {
  logger.error(`Bot error: ${error.message}`);
  rl.close();
});
