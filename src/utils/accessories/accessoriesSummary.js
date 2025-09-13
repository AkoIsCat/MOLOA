import { parseTooltips } from '../parseTooltips';
import { mapAccessoriesPart } from './mapAccessoriesPart';

export const accessoriesSummary = (data) => {
  const accessoriesList = data.filter(
    (item) =>
      item.Type === '목걸이' || item.Type === '귀걸이' || item.Type === '반지'
  );

  if (accessoriesList.length === 0) {
    return null;
  }

  const tooltips = parseTooltips(accessoriesList);

  return accessoriesList.map((data, idx) =>
    mapAccessoriesPart(data, idx, tooltips)
  );
};
