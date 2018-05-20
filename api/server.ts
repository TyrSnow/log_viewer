import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as fs from 'fs';
import { create } from './core/injector/factor';


const app = express();
app.use(bodyParser());
const routes = loadControllers();
function filterExt(fileName) {
  return fileName.replace(/.[\w\d]+$/, '');
}

function generateControllerRoute(controller) {
  const route = express.Router();
  const propType = Object.getPrototypeOf(controller);
  Object.keys(propType).map((key) => {
    const { method, path = '' } = controller[key];
    if (method) {
      route[method](path, controller[key].bind(controller));
    }
  });

  return route;
}
interface IController {
  path: string;
}

function loadController(route, name) {
  const controller: IController = create(require(`./controller/${name}`).default);
  if (controller.path) {
    route.use(controller.path, generateControllerRoute(controller));
  } else {
    route.use(generateControllerRoute(controller));
  }
}

function loadControllers() {
  const route = express.Router();
  const paths = fs.readdirSync('api/controller');
  paths.map((path) => {
    const name = filterExt(path);
    loadController(route, name);
  });

  return route;
}

app.use(routes);

app.listen(3000, () => {
  console.log('Server start at port: ', 3000);
});
