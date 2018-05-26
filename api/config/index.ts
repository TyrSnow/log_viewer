import test from './test';
import develop from './develop';
import deploy from './deploy';

let config: Config.Config;

switch (process.env.NODE_ENV.toLowerCase()) {
  case 'test':
    config = test;
    break;
  case 'deploy':
    config = develop;
    break;
  default:
    config = develop;
}

export default config;
