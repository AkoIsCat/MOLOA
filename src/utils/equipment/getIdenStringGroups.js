import { findByType } from '../findByType';
import removeTag from '../removeTag';

// IdenStringGroups 데이터 추출(초월, 엘릭서)
export const getIdenStringGroups = (data) => {
  const findData = findByType(data, 'IndentStringGroup');

  const extractDesiredValues = findData
    .map((n) => {
      const content = n?.value?.Element_000;
      const IdenStringGroup1 = content?.contentStr?.Element_000?.contentStr;
      const IdenStringGroup2 = content?.contentStr?.Element_001?.contentStr;
      const Transcendence = content?.topStr.includes('초월')
        ? content?.topStr
        : '';

      return {
        IdenStringGroup1: removeTag(
          removeTag(IdenStringGroup1, 'FONT'),
          'font'
        ),
        IdenStringGroup2: removeTag(
          removeTag(removeTag(IdenStringGroup2, 'FONT'), 'font'),
          'img'
        ),
        Transcendence,
      };
    })
    .filter(Boolean);
  return extractDesiredValues;
};
