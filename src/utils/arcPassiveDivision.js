export const arcPassiveDivision = (tooltip) => {
  let arcPassiveActivate = 0;
  console.log(tooltip[2].effect);
  !tooltip[2].effect?.includes('진화')
    ? (arcPassiveActivate = 0)
    : (arcPassiveActivate = 1);

  // for (let obj of tooltip) {
  //   for (let property in obj) {
  //     if (property === 'itemLevel') {
  //       const itemInfo = obj[property];
  //       itemInfo.includes('티어 3') ? (tier = 3) : (tier = 4);
  //     }
  //   }
  // }

  return arcPassiveActivate;
};
