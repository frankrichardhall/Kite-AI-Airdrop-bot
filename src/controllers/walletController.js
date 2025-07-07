const { ethers } = require('ethers');
const logger = require('../utils/logger');

function getWallet(privateKey) {
  try {
    const wallet = new ethers.Wallet(privateKey);
    logger.info(`Wallet created: ${wallet.address}`);
    return wallet;
  } catch (error) {
    logger.error(`Invalid private key: ${error.message}`);
    return null;
  }
}

module.exports = { getWallet };
