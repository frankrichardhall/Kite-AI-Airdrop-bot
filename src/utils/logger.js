const chalk = require('chalk');

const logger = {
  info: (msg) => console.log(chalk.green(`[✓] ${msg}`)),
  wallet: (msg) => console.log(chalk.yellow(`[➤] ${msg}`)),
  error: (msg) => console.log(chalk.red(`[✗] ${msg}`)),
  success: (msg) => console.log(chalk.green(`[✔] ${msg}`)),
  loading: (msg) => console.log(chalk.cyan(`[⟳] ${msg}`)),
  step: (msg) => console.log(chalk.white(`[➤] ${msg}`)),
  agent: (msg) => console.log(chalk.white(msg)),
  banner: () => {
    console.log(chalk.cyan.bold(`
---------------------------------------------
     Kite AI Automation Bot - YetiDAO 
---------------------------------------------\n
`));
  }
};

module.exports = logger;
