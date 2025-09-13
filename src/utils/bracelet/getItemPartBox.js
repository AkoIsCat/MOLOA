import { findByType } from '../findByType';

export const getItemPartBox = (data) => {
  const findData = findByType(data, 'ItemPartBox');

  if (findData.length === 0) {
    return;
  }

  const effect = findData.filter((item) =>
    item.value.Element_000.includes('팔찌 효과')
  )[0].value.Element_001;

  return effect;
};
