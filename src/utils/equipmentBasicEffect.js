export const equipmentBasicEffect = (data) => {
  const partName = ['투구', '어깨', '상의', '하의', '장갑', '무기'];

  // 각 부위별 Tooltip 문자열을 객체형태로 변환
  const dataArray = [];
  for (const item in data) {
    dataArray.push(JSON.parse(data[item].Tooltip));
  }

  const filterItemPartBox = dataArray.map((item) =>
    Object.values(item)
      .filter((el) => el && el.type === 'ItemPartBox' && el.value)
      .filter(Boolean)
      .map((el) => el.value)
  );

  const result = filterItemPartBox.map((arr, idx) => ({
    partName: partName[idx],
    values: arr.map((obj) => obj.Element_001),
  }));

  return result;
};
