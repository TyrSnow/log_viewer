import { validate } from 'express-jsonschema';
import * as log4js from 'log4js';

const error = log4js.getLogger('error');

/**
 * 标记一个参数检测的路径
 */
export default function validator(config: any) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const orignalProperty = target[propertyKey];
    target[propertyKey] = (req, res) => {
      validate(config)(req, res, (err) => {
        if (err) {
          error.debug('[Error]Catched JsonSchemaValidate Error: ', JSON.stringify(err));
          error.debug('[Request]Error captured in url: ', req.originalUrl);
          error.debug('[Request]Error captured with params: ', req.params);
          error.debug('[Request]Error captured with query: ', req.query);
          error.debug('[Request]Error captured with body: ', req.body);

          return res.status(400).json({
            note: 'Invalid params.'
          });
        }
        orignalProperty(req, res);
      });
    };
  };
}
