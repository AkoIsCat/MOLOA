import { parseTooltips } from '../parseTooltips';
import { getItemTitle } from './getItemTitle';
import { getItemPartBox } from './getItemPartBox';
import { getIndentStringGroups } from './getIndentStringGroups';

export const StoneSummary = (data) => {
  const stoneData = data.filter((item) => item.Type === '어빌리티 스톤');
  const tooltip = parseTooltips(stoneData)[0];

  const itemTitle = getItemTitle(tooltip);
  const itemPartBox = getItemPartBox(tooltip);
  const indentStringGroup = getIndentStringGroups(tooltip);

  return {
    Grade: stoneData[0].Grade,
    icon: stoneData[0].Icon,
    itemName: stoneData[0].Name,
    partName: itemTitle.partName,
    partTier: itemTitle.partTier,
    stamina: itemPartBox,
    indentStringGroup,
  };
};
