import { findByType } from '../findByType';
// ItemTitle (악세 품질)
export const getItemTitle = (data) => {
  const findData = findByType(data, 'ItemTitle');
  const qualityValue = findData[0]?.value?.qualityValue;

  return qualityValue;
};
