import { findByType } from '../findBtType';

// SingleTextBox 데이터 (상급 재련)
export const getSingleTextBox = (data) => {
  const findData = findByType(data, 'SingleTextBox');
  const extractDesiredValues = findData.filter((item) =>
    item.value.includes('상급 재련')
  );

  return extractDesiredValues;
};
