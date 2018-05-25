import { Router } from 'express';
import { create } from '../injector';
import loadFolder from './loadFolder';

const generateControllerRoute = (controller) => {
  const route = Router();
  const propType = Object.getPrototypeOf(controller);
  Object.keys(propType).map((key) => {
    const { method, path = '' } = controller[key];
    if (method) {
      route[method](path, controller[key].bind(controller));
    }
  });

  return route;
};

const controllerLoader = () => {
  const route = Router();
  const controllers = loadFolder('api/controller', ['.spec.ts']);
  controllers.map((controllerClass) => {
    const controller: any = create(controllerClass);
    if (controller.path) {
      route.use(controller.path, generateControllerRoute(controller));
    } else {
      route.use(generateControllerRoute(controller));
    }
  });

  return route;
};

export default controllerLoader;

