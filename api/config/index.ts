const config = {
  port: 8081,
  secretKey: 'adsjhfwuioef0-1823.adf239zxcjhvaqe8uy',
  db: {
    uri: 'mongodb://127.0.0.1:27017/log_viewer',
    user: '',
    password: ''
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
