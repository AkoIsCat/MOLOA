import { findByType } from '../findByType';
import removeTag from '../removeTag';
// ItemPartBox (악세 효과, 깨달음 수치, 기본 효과)
export const getItemPartBox = (data) => {
  const findData = findByType(data, 'ItemPartBox');

  const BasicEffect = findData.filter((item) =>
    item?.value?.Element_000.includes('기본 효과')
  )[0]?.value?.Element_001;

  const GrindingEffect = findData.filter((item) =>
    item?.value?.Element_000.includes('연마 효과')
  )[0]?.value?.Element_001;

  const AwakeNumber = findData.filter((item) =>
    item?.value?.Element_000.includes('아크 패시브 포인트 효과')
  )[0]?.value?.Element_001;

  // 필요 데이터 통합 객체
  const extractDesiredValues = {
    BasicEffect: BasicEffect ? BasicEffect : '',
    GrindingEffect: GrindingEffect ? removeTag(GrindingEffect, 'img') : '',
    AwakeNumber: AwakeNumber ? AwakeNumber : '',
  };

  return extractDesiredValues;
};
