/**
 * 构建模糊搜索正则表达式
 */
export default function fuzzy(key: string): RegExp {
  const splitKey = key.split(/\s+/g);

  return new RegExp(splitKey.join('|'));
}
