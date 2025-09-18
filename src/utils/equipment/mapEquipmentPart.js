import { getPartBoxes } from './getPartBoxes';
import { getIdenStringGroups } from './getIdenStringGroups';
import { getSingleTextBox } from './getSingleTextBox';
import { getItemTitle } from './getItemTitle';
import { getElixirTotal } from './getElixirTotal';

export const mapEquipmentPart = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  const PartBoxesBoxes = getPartBoxes(data);
  const IndentStringBoxes = getIdenStringGroups(data);
  const SingleTextBox = getSingleTextBox(data);
  const ItemTitleBox = getItemTitle(data);
  const ElixirTotal = getElixirTotal(data);

  return {
    Icon: fullData.Icon,
    PartName: fullData.Type,
    ItemName: fullData.Name,
    Grade: fullData.Grade,
    PartBoxes: PartBoxesBoxes.map((pb) => pb.Element_001),
    IndentStrings: IndentStringBoxes,
    SingleText: SingleTextBox,
    ItemTitle: ItemTitleBox,
    ElixirTotal: isNaN(ElixirTotal) ? null : ElixirTotal,
  };
};
