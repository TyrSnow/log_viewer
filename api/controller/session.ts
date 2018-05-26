
import { ERROR, SUCCESS } from '../help/response';
import UserService from '../service/user';
import { controller } from '../core/injector';

@controller({
  path: '/session',
})
class Session {
  constructor(
    public userService: UserService,
  ) {}
}

export default Session;
