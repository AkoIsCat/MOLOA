import { getItemTitle } from './getItemTitle';
import { getItemPartBox } from './getItemPartBox';

export const mapAccessoriesPart = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  // 악세 이름, 품질, 효과, 깨달음, 등급, 기본효과, 악세 부위
  const itemTitle = getItemTitle(data);
  const itemPartBox = getItemPartBox(data);

  return {
    icon: fullData.Icon,
    partName: fullData.Type,
    ItemName: fullData.Name,
    Grade: fullData.Grade,
    qualityValue: itemTitle,
    itemPartBox,
  };
};
