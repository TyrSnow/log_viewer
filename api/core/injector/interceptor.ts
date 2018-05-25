/**
 * 将一个成员函数标记为拦截器
 */
export function interceptor(method: string = 'use') {
  const lMethod = method.toLowerCase();

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = true;
    Object.assign(target[propertyKey], {
      interceptor: true,
      method: lMethod,
    });
  };
}
