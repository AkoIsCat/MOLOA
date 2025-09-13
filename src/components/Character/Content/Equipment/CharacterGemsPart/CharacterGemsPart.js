import styled from 'styled-components';
import React from 'react';

import GemsItemTooltip from './GemsItemTooltip';
import { GemSummary } from '../../../../../utils/gem/GemSummary';

const CharacterGemsPart = ({ gems, getGemsList }) => {
  if (gems === null || gems.Gems === null || gems.Gems === undefined) {
    return (
      <ContentWrap>
        <div className="noGems">해당 캐릭터는 보석을 장착하지 않았습니다.</div>
      </ContentWrap>
    );
  }

  const gemsData = GemSummary(gems.Gems);

  if (gemsData) {
    getGemsList(gemsData);
  }

  return (
    <ContentWrap>
      <GemsFlex>
        {gemsData.extinction.map((item) => (
          <GemsItemTooltip
            key={`${item.SkillName} ${item.GemName} ${item.Level}`}
            item={item}
          />
        ))}
      </GemsFlex>
      <GemsFlex>
        {gemsData.prominence.map((item) => (
          <GemsItemTooltip
            key={`${item.SkillName} ${item.GemName} ${item.Level}`}
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

  .noGems {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

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
