import { findByType } from '../findByType';

// 부위별 ItemPartBox들의 value만 추출(물/마방, 힘/민/지, 체력, 생명 활성력, 세트 효과)
export const getPartBoxes = (data) => {
  const findData = findByType(data, 'ItemPartBox');
  const extractDesiredValues = findData.map((n) => n.value).filter(Boolean); // filter로 값이 없는 항목 체크

  return extractDesiredValues;
};
