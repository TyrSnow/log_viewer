import { ERROR, SUCCESS } from '../help/response';
import { controller, route } from '../core/injector';

import UserService from '../service/user';
import SessionService from '../service/session';
import { valid_password } from '../help/password';
import CODE from '../constants/code';
import { auth, AUTH_TYPE } from '../interceptor/auth';

@controller({
  path: '/session',
})
class Session {
  constructor(
    public userService: UserService,
    public sessionService: SessionService
  ) {}

  @route('/', 'post')
  public login(req, res) {
    console.debug('Try to login: ', req.body);
    const { name, password, remember } = req.body;

    this.userService.findOneByLogAttr(name).then(
      (user) => {
        if (user) {
          if (valid_password(user.sault, password, user.password)) {
            return Promise.resolve(this.sessionService.sign(
              user,
              remember ? '30d' : '1h',
            ));
          }
        }

        return Promise.reject(CODE.PASSWORD_NOT_MATCH);
      },
    ).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

  @route('/', 'get')
  @auth(AUTH_TYPE.USER)
  public solve_auth(req, res) {
    return SUCCESS(req, res)(req.user);
  }
}

export default Session;
