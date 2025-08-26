import { findByType } from '../findByType';
import removeTag from '../removeTag';

export const getIndentStringGroups = (data) => {
  const findData = findByType(data, 'IndentStringGroup').filter(
    (item) => item.value !== null
  );

  const commonDept = findData[0].value.Element_000.contentStr;
  const activate = {
    first: removeTag(
      removeTag(removeTag(commonDept.Element_000.contentStr, 'FONT'), 'img'),
      'BR'
    ),
    second: removeTag(
      removeTag(removeTag(commonDept.Element_001.contentStr, 'FONT'), 'img'),
      'BR'
    ),
    third: removeTag(
      removeTag(removeTag(commonDept.Element_002.contentStr, 'FONT'), 'img'),
      'BR'
    ),
  };

  const activate1 = {
    name: activate.first
      .slice(0, activate.first.length - 5)
      .replace('[', '')
      .replace(']', ''),
    level: activate.first.slice(-1),
  };
  const activate2 = {
    name: activate.second
      .slice(0, activate.second.length - 5)
      .replace('[', '')
      .replace(']', ''),
    level: activate.second.slice(-1),
  };
  const decrease = {
    name: activate.third
      .slice(0, activate.third.length - 5)
      .replace('[', '')
      .replace(']', ''),
    level: activate.third.slice(-1),
  };

  return {
    activate1,
    activate2,
    decrease,
  };
};
