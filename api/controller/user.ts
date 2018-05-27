import { Router } from 'express';

import { controller, route } from '../core/injector';
import { ERROR, SUCCESS } from '../help/response';
import UserService from '../service/user';

@controller({
  path: '/users',
})
class UserController {
  constructor(
    private userService: UserService
  ) {}

  @route('/', 'post')
  public regist(req, res) {
    const { name, password } = req.body;
    this.userService.regist(name, password).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

  @route('/names', 'get')
  public name_can_be_used(req, res) {
    const { name } = req.query;

    this.userService.check_attr_exist('name', name).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }
}

export default UserController;
