import { findByType } from '../findByType';
import removeTag from '../removeTag';

export const getItemTitle = (data) => {
  const findData = findByType(data, 'ItemTitle');
  const partName = removeTag(findData[0]?.value?.leftStr0, 'FONT');
  const partTier = removeTag(findData[0]?.value?.leftStr2, 'FONT').slice(-4);

  return {
    partName,
    partTier,
  };
};
