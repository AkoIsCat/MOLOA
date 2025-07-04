export const sortEquipment = (data) => {
  // equipment 데이터에서 장비 데이터만 따로 모으는 유틸 함수
  const equipmentArray = [];

  for (const item in data) {
    if (
      data[item].Type === '무기' ||
      data[item].Type === '투구' ||
      data[item].Type === '상의' ||
      data[item].Type === '하의' ||
      data[item].Type === '장갑' ||
      data[item].Type === '어깨'
    ) {
      equipmentArray.push(data[item]);
    }
  }
  const sortBy = ['투구', '어깨', '상의', '하의', '장갑', '무기'];

  const sorted = equipmentArray.slice().sort((a, b) => {
    // 각각의 name이 기준 배열에서 몇 번째에 있는지 구함
    const indexA = sortBy.indexOf(a.Type);
    const indexB = sortBy.indexOf(b.Type);

    // 없는 값은 맨 뒤로
    const safeIndexA = indexA !== -1 ? indexA : sortBy.length;
    const safeIndexB = indexB !== -1 ? indexB : sortBy.length;
    // 만약 기준에 없으면, 기준 배열의 마지막보다 더 뒤로 보냄
    return safeIndexA - safeIndexB;
  });

  return sorted;
};
