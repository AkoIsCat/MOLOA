import { parseTooltips } from '../parseTooltips';
import { mapEquipmentPart } from './mapEquipmentPart';

export const equipmentSummary = (data) => {
  if (data === undefined || data === null || data.length === 0) {
    return null;
  }
  const tooltips = parseTooltips(data);

  return data.map((data, idx) => mapEquipmentPart(data, idx, tooltips));
};
