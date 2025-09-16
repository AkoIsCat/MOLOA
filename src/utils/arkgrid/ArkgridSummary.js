import { parseTooltips } from '../parseTooltips';
import { mapArkgrid } from './mapArkgrid';

export const arkgridSummary = (data) => {
  if (data === null || data === undefined) {
    return null;
  }

  const tooltips = parseTooltips(data);

  return data.map((data, idx) => mapArkgrid(data, idx, tooltips));
};
