// 객체안에서 특정 type을 가진 노드만 모으기
export const findByType = (obj, type) => {
  const objectValueAsArray = Object.values(obj || {});
  const findSameType = objectValueAsArray.filter(
    (item) => item && item.type === type
  );

  return findSameType;
};
