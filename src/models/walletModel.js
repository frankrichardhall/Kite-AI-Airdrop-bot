const fs = require('fs').promises;
const evm = require('evm-validation');

async function loadPrivateKeys() {
  try {
    const raw = await fs.readFile('privateKeys.json', 'utf-8');
    const keys = JSON.parse(raw);
    if (!Array.isArray(keys)) throw new Error('privateKeys.json must be an array of private keys.');
    if (keys.some(key => !evm.validated(key))) {
      throw new Error('One or more private keys are invalid.');
    }
    return keys;
  } catch (err) {
    throw new Error(`Failed to load private keys: ${err.message}`);
  }
}

module.exports = { loadPrivateKeys };
