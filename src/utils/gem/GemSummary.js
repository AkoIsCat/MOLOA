import { parseTooltips } from '../parseTooltips';
import { devideAndSortGems } from './devideAndSortGems';
import { mapGems } from './mapGems';

export const GemSummary = (data) => {
  const tooltips = parseTooltips(data);

  if (data.length === 0) {
    return null;
  }

  const gemsData = data.map((data, idx) => mapGems(data, idx, tooltips));
  const sortGems = devideAndSortGems(gemsData);

  return {
    extinction: sortGems[0],
    prominence: sortGems[1],
  };
};
