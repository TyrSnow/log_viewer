declare namespace Config {
  interface DB {
    uri: string
    user: string
    password: string
  }
  
  interface Log {
    appenders: any
    categories: any
    replaceConsole?: boolean
  }
  
  interface Upload {
    temp: string
    static: string
    prefix: string
  }

  interface Config {
    port: number | string
    secretKey: string
    db: DB
    log: Log
    upload?: Upload
  }
}

interface Controller {
  path?: string
}

interface LoginInfo {
  id?: string
  name?: string
  phone?: string
  email?: string
}
