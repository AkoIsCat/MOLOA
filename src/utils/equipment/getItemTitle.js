import { findByType } from '../findByType';
import removeTag from '../removeTag';

// ItemTitle 데이터 (품질)
export const getItemTitle = (data) => {
  const findData = findByType(data, 'ItemTitle');
  const qualityValue = findData[0]?.value?.qualityValue;
  const itemLevel = removeTag(findData[0]?.value?.leftStr2, 'FONT').split(
    ' '
  )[2];

  return { qualityValue, itemLevel };
};
