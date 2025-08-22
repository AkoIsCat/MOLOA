import { getPartBoxes } from './getPartBoxes';
import { getIdenStringGroups } from './getIdenStringGroups';
import { getSingleTextBox } from './getSingleTextBox';

export const mapEquipmentPart = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  const BasicEffectBoxes = getPartBoxes(data);
  const IndentStringBoxes = getIdenStringGroups(data);
  const SingleTextBox = getSingleTextBox(data);

  return {
    PartName: fullData.Type,
    ItemName: fullData.Name,
    Grade: fullData.Grade,
    BasicEffect: BasicEffectBoxes.map((pb) => pb.Element_001),
    IndentStrings: IndentStringBoxes,
    SingleText: SingleTextBox,
  };
};
