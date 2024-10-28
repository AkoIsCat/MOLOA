import styled from 'styled-components';
import React from 'react';

import GemsItemTooltip from './GemsItemTooltip';

const CharacterGemsPart = ({ gems, getGemsList }) => {
  if (gems === null || gems === undefined) {
    return <ContentWrap />;
  }
  function extractingGemsEffect(gems) {
    const gemsEffect = [];
    const effectRegex =
      /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;
    const effectRegex2 = /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;
    const gemsRegex = /<FONT[^>]*>(.*?)<\/FONT>/;
    // const attackPowerRegex = ;

    for (let i = 0; i <= gems.Gems.length - 1; i++) {
      const tooltipObject = JSON.parse(gems.Gems[i].Tooltip);
      console.log(tooltipObject);
      for (let key in tooltipObject) {
        if (tooltipObject[key].type === 'ItemPartBox') {
          const matchValue =
            tooltipObject[key].value['Element_001'].match(effectRegex) === null
              ? tooltipObject[key].value['Element_001'].match(effectRegex2)
              : tooltipObject[key].value['Element_001'].match(effectRegex);
          const skillName = matchValue[1];
          const skillShame = matchValue[2]?.replaceAll('<BR>', '');
          const attackPower = matchValue[4]?.replaceAll('<BR>', '');
          console.log(matchValue, attackPower);

          gemsEffect.push({
            level: gems.Gems[i].Level,
            name: gems.Gems[i].Name.match(gemsRegex)[1],
            grade: gems.Gems[i].Grade,
            skillName,
            skillShame,
            attackPower,
            icon: gems.Gems[i].Icon,
          });
        }
      }
    }
    return gemsEffect;
  }

  function devideAndSortGems(gems) {
    const extinction = [];
    const prominence = [];
    for (let i = 0; i < gems.length; i++) {
      if (gems[i].name.includes('멸화')) {
        extinction.push(gems[i]);
      } else {
        prominence.push(gems[i]);
      }
      // 보석 레벨 순으로 정렬
      extinction.sort((a, b) => b.level - a.level);
      prominence.sort((a, b) => b.level - a.level);
    }

    return [extinction, prominence];
  }

  const extractedGems = gems !== null && extractingGemsEffect(gems);
  const [extinction, prominence] = devideAndSortGems(extractedGems);

  if (extractedGems.length > 1) {
    getGemsList(extractedGems);
  }

  return (
    <ContentWrap>
      <GemsFlex>
        {extinction.map((item, index) => (
          <GemsItemTooltip
            key={`${item.skillName} ${item.name} ${index}`}
            item={item}
          />
        ))}
      </GemsFlex>
      <GemsFlex>
        {prominence.map((item, index) => (
          <GemsItemTooltip
            key={`${item.skillName} ${item.name} ${index}`}
            item={item}
          />
        ))}
      </GemsFlex>
    </ContentWrap>
  );
};

export default CharacterGemsPart;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #181c1e;
  border-radius: 10px;
  padding: 10px 0 35px 0px;
  margin: 20px 0 0 0;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const GemsFlex = styled.div`
  display: flex;
  margin: 10px 15px;
  justify-content: center;
  flex-wrap: wrap;
`;
