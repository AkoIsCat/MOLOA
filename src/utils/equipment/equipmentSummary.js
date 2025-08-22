import { parseTooltips } from '../parseTooltips';
import { mapEquipmentPart } from './mapEquipmentPart';

export const equipmentSummary = (data) => {
  console.log('equipment input data', data);

  const tooltips = parseTooltips(data);

  return data.map((data, idx) => mapEquipmentPart(data, idx, tooltips));
};
