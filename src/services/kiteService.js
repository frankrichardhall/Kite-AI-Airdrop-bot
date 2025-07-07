const axios = require('axios');
const crypto = require('crypto');
const logger = require('../utils/logger');
const UserAgent = require('user-agents');
const userAgent = new UserAgent();

const baseHeaders = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  'Origin': 'https://testnet.gokite.ai',
  'Referer': 'https://testnet.gokite.ai/',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-site',
  'User-Agent': userAgent.toString(),
  'Content-Type': 'application/json'
};

const encryptAddress = (address) => {
  try {
    const keyHex = '6a1c35292b7c5b769ff47d89a17e7bc4f0adfe1b462981d28e0e9f7ff20b8f8a';
    const key = Buffer.from(keyHex, 'hex');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    let encrypted = cipher.update(address, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();

    const result = Buffer.concat([iv, encrypted, authTag]);
    return result.toString('hex');
  } catch (error) {
    logger.error(`Auth token generation failed for ${address}`);
    return null;
  }
};

const extractCookies = (headers) => {
  try {
    const rawCookies = headers['set-cookie'] || [];
    const skipKeys = ['expires', 'path', 'domain', 'samesite', 'secure', 'httponly', 'max-age'];
    const cookiesDict = {};

    for (const cookieStr of rawCookies) {
      const parts = cookieStr.split(';');
      for (const part of parts) {
        const cookie = part.trim();
        if (cookie.includes('=')) {
          const [name, value] = cookie.split('=', 2);
          if (name && value && !skipKeys.includes(name.toLowerCase())) {
            cookiesDict[name] = value;
          }
        }
      }
    }

    return Object.entries(cookiesDict).map(([key, value]) => `${key}=${value}`).join('; ') || null;
  } catch (error) {
    return null;
  }
};

const login = async (wallet, neo_session = null, refresh_token = null, maxRetries = 3) => {
  const url = 'https://neo.prod.gokite.ai/v2/signin';
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.loading(`Logging in to ${wallet.address} (Attempt ${attempt}/${maxRetries})`);

      const authToken = encryptAddress(wallet.address);
      if (!authToken) return null;

      const loginHeaders = {
        ...baseHeaders,
        'Authorization': authToken,
      };

      if (neo_session || refresh_token) {
        const cookies = [];
        if (neo_session) cookies.push(`neo_session=${neo_session}`);
        if (refresh_token) cookies.push(`refresh_token=${refresh_token}`);
        loginHeaders['Cookie'] = cookies.join('; ');
      }

      const body = { eoa: wallet.address };
      const response = await axios.post(url, body, { headers: loginHeaders });

      if (response.data.error) {
        logger.error(`Login failed for ${wallet.address}: ${response.data.error}`);
        return null;
      }

      const { access_token, aa_address, displayed_name, avatar_url } = response.data.data;
      const cookieHeader = extractCookies(response.headers);

      let resolved_aa_address = aa_address;
      if (!resolved_aa_address) {
        const profile = await getUserProfile(access_token);
        resolved_aa_address = profile?.profile?.smart_account_address;
        if (!resolved_aa_address) {
          logger.error(`No aa_address found for ${wallet.address}`);
          return null;
        }
      }

      logger.success(`Login successful for ${wallet.address}`);
      return { access_token, aa_address: resolved_aa_address, displayed_name, avatar_url, cookieHeader };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      if (attempt === maxRetries) {
        logger.error(`Login failed for ${wallet.address} after ${maxRetries} attempts: ${errorMessage}. Check cookies or contact Kite AI support.`);
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

const getUserProfile = async (access_token) => {
  try {
    const response = await axios.get('https://ozone-point-system.prod.gokite.ai/me', {
      headers: { ...baseHeaders, Authorization: `Bearer ${access_token}` }
    });

    if (response.data.error) {
      logger.error(`Failed to fetch profile: ${response.data.error}`);
      return null;
    }

    return response.data.data;
  } catch (error) {
    logger.error(`Profile fetch error: ${error.message}`);
    return null;
  }
};

module.exports = { login, getUserProfile };
