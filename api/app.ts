import * as express from 'express';
import * as bodyParser from 'body-parser';

import controllerLoader from './core/loader/controller';
import './start';

const app = express();
app.use(bodyParser());

const routes = controllerLoader();
app.use(routes);

export default app;
