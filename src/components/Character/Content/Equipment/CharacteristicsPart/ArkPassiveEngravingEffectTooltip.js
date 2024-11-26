import styled from 'styled-components';
import { useState } from 'react';

import stone from '../../../../../asset/icon/stone_engraving.png';

const ArkPassiveEngravingEffects = (item) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <EffectWrap>
      {showTooltip && <div className="tooltip">{item.item.Description}</div>}
      <EngravingBox>
        <EngravingLevelBox Grade={item.item.Grade}>
          {item.item.Level}
        </EngravingLevelBox>
        <div
          className="name"
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {item.item.Name}
        </div>
      </EngravingBox>
      {item.item.AbilityStoneLevel && (
        <Stone>
          <img src={stone} alt="어빌리티 스톤 효과" width={25} height={25} />
          <div>Lv.{item.item.AbilityStoneLevel}</div>
        </Stone>
      )}
    </EffectWrap>
  );
};

export default ArkPassiveEngravingEffects;

const EffectWrap = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 10px;
    padding: 0;
  }

  .name {
    margin: 7px 0;
    color: #fff;
    font-family: 'Nanum Gothic';
  }

  .level {
    margin: 7px 0;
    color: #fff;
    font-family: 'Nanum Gothic';
  }

  .tooltip {
    position: absolute;
    width: 330px;
    height: auto;
    line-height: 1.7em;
    background-color: rgb(41, 46, 51);
    border-radius: 10px;
    top: 50%;
    left: -95%;
    transform: translate(-50%, -50%);

    @media ${(props) => props.theme.mobile} {
      left: 53%;
    }
    margin: 0;
    padding: 10px;
    color: #c1c1c1;
    font-family: 'Nanum Gothic';
  }
`;

const Stone = styled.div`
  display: flex;
  align-items: center;

  div {
    color: #fff;
  }
`;

const EngravingBox = styled.div`
  display: flex;
  align-items: center;
`;

const EngravingLevelBox = styled.div`
  display: flex;
  align-items: center;
  justify-contents:center
  height: 20px;
  background-color: #fff;
  margin-right: 10px;
  padding: 3px 8px;
  border-radius: 5px;
  color: #fff;
  background: ${(props) =>
    props.Grade === '전설'
      ? '#9e5f04'
      : props.Grade === '영웅'
      ? '#480d5d'
      : props.Grade === '유물'
      ? '#a24006'
      : '#292e33'};
`;
