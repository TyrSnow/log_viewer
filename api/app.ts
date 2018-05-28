import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as log4js from 'log4js';

import controllerLoader from './core/loader/controller';
import './start';

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));

const routes = controllerLoader();

routes.use((req, res) => {
  res.status(404).json({
    message: 'Can not find resources.',
  });
});

// 前置计算response时间
const debug = log4js.getLogger('debug');
app.use((req, res, next) => {
  const startTime = new Date().valueOf(); // 获取时间 t1

  function calResponseTime () {
    const now = new Date().valueOf(); //获取时间 t2
    const deltaTime = now - startTime;
    debug.debug(`[Debug]Request path: ${req.originalUrl}, cost: ${deltaTime}`);
  }

  res.once('finish', calResponseTime);
  res.once('close', calResponseTime);
  next();
});

app.use(routes);

export default app;
