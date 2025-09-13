import { parseTooltips } from '../parseTooltips';
import { getItemPartBox } from './getItemPartBox';
import { getItemTitle } from './getItemTitle';

export const braceletSummary = (data) => {
  const braceletData = data.filter((item) => item.Type === '팔찌');
  const tooltip = parseTooltips(braceletData)[0];

  if (braceletData.length === 0) {
    return null;
  }

  const itemTitle = getItemTitle(tooltip);
  const ItemPartBox = getItemPartBox(tooltip);

  return {
    Grade: braceletData[0].Grade,
    icon: braceletData[0].Icon,
    itemName: braceletData[0].Name,
    partName: itemTitle.partName,
    partTier: itemTitle.partTier,
    effect: ItemPartBox,
  };
};
