/**
 * 接口返回状态码
 */

const C = (code: number, message: string, status: number = 200, uri?: string) => {
  return {
    code,
    message,
    status,
    uri,
  };
};

const CODE = {
  // 公共状态提示
  SUCCESS: C(10200, '操作完成'),
  ERROR: C(10500, '服务器处理异常'),
  PART_COMPLETE: C(10501, '部分操作未能完成'),
  ACCESS_DENY: C(10400, '用户操作被拒绝', 401),
  NOT_FOUND: C(10404, '资源不存在'),

  // 用户
  DUMPLICATE_NAME: C(20000, '用户名已存在'),
  PASSWORD_NOT_MATCH: C(21000, '用户名或密码不匹配'),
  NOT_AUTHORIZE: C(22000, '您还没有登陆', 400),
  LOW_AUTHORIZE: C(22001, '用户权限不足'),
};

export default CODE;
