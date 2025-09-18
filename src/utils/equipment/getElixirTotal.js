import { findByType } from '../../utils/findByType';

export const getElixirTotal = (data) => {
  const findData = findByType(data, 'IndentStringGroup');
  const elixirElements = findData.flatMap((data) => {
    const content = data?.value?.Element_000?.contentStr;
    if (!content) return [];

    // contentStr 안에서 bPoint === true 인 것만 반환
    return Object.values(content).filter((el) => el?.bPoint === true);
  });

  const elixirLevel1 = +elixirElements[0]?.contentStr
    .split('Lv.')[1]
    .slice(0, 1);
  const elixirLevel2 = +elixirElements[1]?.contentStr
    .split('Lv.')[1]
    .slice(0, 1);

  const total = elixirLevel1 + elixirLevel2;
  return total;
};
