import * as jwt from 'jsonwebtoken';
import config from '../config';
import { service } from '../core/injector';
import { UserModel } from '../model/User';

@service()
class SessionService {
  public sign(
    user: UserModel.User,
    expiresIn: string = '1h',
  ): string {
    const { name, head, phone, email, auth } = user;

    return jwt.sign(
      {
        id: user._id,
        name,
        head,
        phone,
        email,
        auth,
      },
      config.secretKey,
      {
        expiresIn,
      }
    );
  }
}

export default SessionService;
