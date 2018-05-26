const config = {
  port: 8081,
  secretKey: 'adsjhfwuioef0-1823.adf239zxcjhvaqe8uy',
  db: {
    uri: 'mongodb://127.0.0.1:27017/test_log_viewer',
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
        filename: 'logs/test.access.log',
        maxLogSize: 1024,
        backups: 4
      },
      error: {
        type: 'file',
        filename: 'logs/test.error.log',
        maxLogSize: 1024,
        backups: 4
      }
    },
    categories: {
      default: {
        appenders: ['out', 'app'],
        level: 'ERROR'
      },
      error: {
        appenders: ['out', 'error'],
        level: 'ERROR'
      }
    },
    replaceConsole: false
  }
};

export default config;
