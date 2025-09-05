import { findByType } from '../findByType';
import removeTag from '../removeTag';

// SingleTextBox 데이터 (상급 재련)
export const getSingleTextBox = (data) => {
  const findData = findByType(data, 'SingleTextBox');
  const extractDesiredValues = findData.filter((item) =>
    item.value.includes('상급 재련')
  );

  if (extractDesiredValues.length === 0) {
    return null;
  }

  const splitFont = extractDesiredValues[0].value.split('\n');
  const removeFontTag = removeTag(splitFont[0], 'FONT');

  return removeFontTag.slice(-4);
};
