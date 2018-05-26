import * as jwt from 'jsonwebtoken';
import { service } from '../core/injector';

@service()
class SessionService {
  public sign(
    payload: any,
    expiresIn: string = '1h',
  ): string {
    return jwt.sign(
      payload,
      ';123',
      {
        expiresIn,
      }
    );
  }
}

export default SessionService;
