import * as log4js from 'log4js';
import CODE from '../constants/code';
import { Request, Response } from 'express';

const log = log4js.getLogger('default');

const LIST = (req: Request, res: Response) => {
  return (data) => {
    const { list = [], page } = data;
    res.json({
      success: true,
      list,
      page,
    });
    log.debug(`${req.method} ${req.originalUrl} Success`);
  };
};

const SUCCESS = (req: Request, res: Response) => {
  return (data) => {
    res.json({
      success: true,
      data,
    });
    log.debug(`${req.method} ${req.originalUrl} Success`);
  };
};

/**
 * 返回文本类型的数据
 * 需要手动配置header的content-type
 */
const TEXT = (req: Request, res: Response) => {
  return (data: string) => {
    res.send(data);
    log.debug(`${req.method} ${req.originalUrl} Success`);
  };
};

/**
 * 统一的错误处理
 */
const ERROR = (req: Request, res: Response) => {
  return (err) => {
    if (err instanceof Error) {
      // 未处理的系统错误
      res.status(500).send(CODE.ERROR);
      log.error(`${req.method} ${req.originalUrl} unexpect error: ${JSON.stringify(err)}`);
    } else {
      const { status = 200, ...other } = err;
      res.status(status).send(other);
      log.error(`${req.method} ${req.originalUrl} expect error: ${JSON.stringify(err)}`);
    }
  };
};

export { SUCCESS, LIST, TEXT, ERROR };
