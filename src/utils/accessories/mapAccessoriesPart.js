export const mapAccessoriesPart = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  // 악세 이름, 품질, 효과, 깨달음, 등급, 기본효과, 악세 부위
  console.log('map', data, fullData);

  return {
    partName: fullData.Type,
    ItemName: fullData.Name,
    Grade: fullData.Grade,
  };
};
