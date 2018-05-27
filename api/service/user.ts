/**
 * UserService
 */
import { service } from '../core/injector';
import User from '../model/User.Model';
import { generate_sault, hash_password } from '../help/password';
import { PromiseProvider } from 'mongoose';
import CODE from '../constants/code';

@service()
class UserService {
  public regist(
    name: string,
    password: string,
  ): Promise<any> {
    const sault = generate_sault();
    const newUser = new User({
      name,
      sault,
      password: hash_password(sault, password),
    });

    return newUser.save().then((userDoc) => {
      return Promise.resolve(userDoc);
    }).catch((err) => {
      if (err.code === 11000) {
        if (err.errmsg.indexOf('name') !== -1) {
          return Promise.reject(CODE.DUMPLICATE_NAME);
        }
      }

      return Promise.reject(err);
    });
  }

  public check_attr_exist(
    attr: string,
    value: string,
  ): Promise<boolean> {
    return User.findOne({
      [attr]: value,
    }).then((res) => {
      return Promise.resolve(!!res);
    });
  }
}

export default UserService;
