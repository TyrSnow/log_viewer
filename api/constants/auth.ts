enum AUTH_TYPE {
  GUEST = 0,
  USER,
  ADMIN,
  ROOT,
}

export default AUTH_TYPE;
export const hasAuth = (request: AUTH_TYPE, userAuth = AUTH_TYPE.GUEST) => {
  if (request === AUTH_TYPE.ROOT) {
    return userAuth === AUTH_TYPE.ROOT;
  } else if (request === AUTH_TYPE.ADMIN) {
    return (userAuth === AUTH_TYPE.ROOT) || (userAuth === AUTH_TYPE.ADMIN);
  } else { // user权限type只要存在就行
    return !!userAuth;
  }
};
