import { findByType } from '../findByType';

export const mapArkgrid = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};

  const findData = findByType(data, 'ItemPartBox').filter(
    (item) =>
      item.value.Element_000.includes('코어 옵션') &&
      !item.value.Element_000.includes('발동 조건')
  )[0].value.Element_001;

  return {
    CoreName: fullData.Name,
    Icon: fullData.Icon,
    Grade: fullData.Grade,
    Effect: findData,
  };
};
