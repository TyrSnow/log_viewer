import { randomHex } from '../help/util';

const config = {
  port: process.env.PORT || 8081,
  secretKey: process.env.SECRET_KEY || randomHex(32),
  db: {
    uri: process.env.DB_URI,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || ''
  },
  log: {
    appenders: {
      out: {
        type: 'console'
      },
      app: {
        type: 'file',
        filename: 'logs/access.log',
        maxLogSize: 1024,
        backups: 4
      },
      error: {
        type: 'file',
        filename: 'logs/error.log',
        maxLogSize: 1024,
        backups: 4
      }
    },
    categories: {
      default: {
        appenders: ['out', 'app'],
        level: 'debug'
      },
      error: {
        appenders: ['out', 'error'],
        level: 'debug'
      }
    },
    replaceConsole: true
  }
};

export default config;
