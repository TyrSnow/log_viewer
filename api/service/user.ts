/**
 * UserService
 */
import { service } from '../core/injector';

@service()
class UserService {
  public regist(
    name: string,
    password: string,
  ): Promise<any> {
    return Promise.resolve({
      name,
      password
    });
  }
}

export default UserService;
