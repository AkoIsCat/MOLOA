import { findByType } from '../findByType';

export const getItemPartBox = (data) => {
  const findData = findByType(data, 'ItemPartBox');

  const BasicEffect = findData.filter((item) =>
    item?.value.Element_000.includes('기본 효과')
  )[0]?.value.Element_001;

  const BonusEffect = findData.filter((item) =>
    item.value.Element_000.includes('세공 단계 보너스')
  )[0]?.value.Element_001;

  return {
    BasicEffect: BasicEffect ? BasicEffect : '',
    BonusEffect: BonusEffect ? BonusEffect : '',
  };
};
