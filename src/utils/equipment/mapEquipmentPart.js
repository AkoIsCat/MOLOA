import { getPartBoxes } from './getPartBoxes';
import { getIdenStringGroups } from './getIdenStringGroups';
import { getSingleTextBox } from './getSingleTextBox';
import { getItemTitle } from './getItemTitle';

export const mapEquipmentPart = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  const PartBoxesBoxes = getPartBoxes(data);
  const IndentStringBoxes = getIdenStringGroups(data);
  const SingleTextBox = getSingleTextBox(data);
  const ItemTitleBox = getItemTitle(data);

  return {
    PartName: fullData.Type,
    ItemName: fullData.Name,
    Grade: fullData.Grade,
    PartBoxes: PartBoxesBoxes.map((pb) => pb.Element_001),
    IndentStrings: IndentStringBoxes,
    SingleText: SingleTextBox,
    ItemTitle: ItemTitleBox,
  };
};
