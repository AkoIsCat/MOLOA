export const arcPassiveDivision = (tooltip) => {
  let arcPassiveActivate = 0;
  // tooltip 초반 인덱스는 내용이 고정 항목이기 때문에 고정 항목을 가지고 아크패시브 활성화 여부를 체크
  !tooltip[2].effect?.includes('진화')
    ? (arcPassiveActivate = 0)
    : (arcPassiveActivate = 1);

  return arcPassiveActivate;
};
