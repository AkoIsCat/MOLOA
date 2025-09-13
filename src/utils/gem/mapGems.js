import { findByType } from '../findByType';
import removeTag from '../removeTag';

// 필요 데이터
// 1. 보석 이름
// 2. 보석 등급
// 3. 스킬 이름
// 4. 보석 효과
// 5. 아이콘
// 6. 보석 레벨

export const mapGems = (fullData, idx, tooltips) => {
  const data = tooltips[idx] || {};
  // 겁화 정규표현식
  const effectRegex =
    /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;

  // 그 외 정규표현식
  const effectRegex2 = /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;

  const findGemsEffect = findByType(data, 'ItemPartBox')[0].value.Element_001;
  const gemsMatch =
    findGemsEffect.match(effectRegex) === null
      ? findGemsEffect.match(effectRegex2)
      : findGemsEffect.match(effectRegex);

  return {
    Icon: fullData.Icon,
    Grade: fullData.Grade,
    GemName: removeTag(removeTag(fullData.Name, 'P'), 'FONT'),
    SkillName: gemsMatch[1],
    GemEffect: gemsMatch[2].replace(/<BR>.*?<\/FONT>/i, '<BR>'),
    Level: fullData.Level,
  };
};
