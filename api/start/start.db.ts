import * as mongoose from 'mongoose';
import * as log4js from 'log4js';
const logger = log4js.getLogger('default');

import config from '../config';

mongoose.connect(config.db.uri);

(<any>mongoose).Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (err) => {
  logger.fatal('[DB]Initialize error: ', err);
  process.exit();
});
