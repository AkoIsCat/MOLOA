import { findByType } from '../findBtType';

// IdenStringGroups 데이터 추출(초월, 엘릭서)
export const getIdenStringGroups = (data) => {
  const findData = findByType(data, 'IndentStringGroup');
  const extractDesiredValues = findData
    .map((n) => {
      const content = n?.value?.Element_000;
      const IdenStringGroup1 = content?.contentStr?.Element_000?.contentStr;
      const IdenStringGroup2 = content?.contentStr?.Element_001?.contentStr;

      return {
        IdenStringGroup1,
        IdenStringGroup2,
      };
    })
    .filter(Boolean);
  return extractDesiredValues;
};
