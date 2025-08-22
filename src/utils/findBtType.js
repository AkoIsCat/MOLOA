// 객체안에서 특정 type을 가진 노드만 모으기
export const findByType = (obj, type) => {
  return Object.values(obj || {}).filter((n) => n && n.type === type);
};
