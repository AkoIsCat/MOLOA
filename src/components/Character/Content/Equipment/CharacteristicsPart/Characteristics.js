import styled from 'styled-components';
import React from 'react';

import EngravingEffectTooltip from './EngravingEffectTooltip';
import ArkPassiveEngravingEffects from './ArkPassiveEngravingEffectTooltip';

const Characteristics = ({ profile, engraving, arkpassive }) => {
  if (profile === null || profile === undefined) {
    return <ContentWrap />;
  }

  // 특성
  function extractingCharacteristics(stats) {
    const combat = [];
    const basic = [];

    for (let key in stats) {
      if (stats[key].Type !== '최대 생명력' && stats[key].Type !== '공격력') {
        combat.push(stats[key]);
      } else {
        basic.push(stats[key]);
      }
    }
    return [combat, basic];
  }

  // 각인
  function extractingEngravingList(engravingEffect) {
    const engravingsList = [];

    for (let key in engravingEffect) {
      const name = engravingEffect[key].Name.split('Lv.')[0].trim();
      const level = engravingEffect[key].Name.split('Lv.')[1].trim();
      const description = engravingEffect[key].Description;
      engravingsList.push({
        name,
        level,
        description,
      });
    }
    return engravingsList;
  }

  const [combatCharacteristics, basicCharacteristics] =
    extractingCharacteristics(profile.Stats);

  const engravingEffectList =
    engraving !== null && extractingEngravingList(engraving.Effects);

  return (
    <ContentWrapWrap
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <ContentWrap characteristics="true">
        <TriportAndCharacteristicsWrap>
          <div style={{ margin: '10px 0' }}>
            <CharacteristicsBox>전투 특성</CharacteristicsBox>
            <CombatWrap>
              {combatCharacteristics.map((item) => (
                <div key={item.Type} className="combatItemWrap">
                  <div className="type">{item.Type}</div>
                  <div className="value">{item.Value}</div>
                </div>
              ))}
            </CombatWrap>
          </div>
          <div style={{ margin: '10px 0' }}>
            <CharacteristicsBox>기본 특성</CharacteristicsBox>
            <BasicWrap>
              {basicCharacteristics.map((item) => (
                <div key={item.Type} className="basicItemWrap">
                  <div className="type">{item.Type}</div>
                  <div className="value">{item.Value}</div>
                </div>
              ))}
            </BasicWrap>
          </div>
        </TriportAndCharacteristicsWrap>
      </ContentWrap>
      <ContentWrap characteristics="true" style={{ flexDirection: 'column' }}>
        <div style={{ padding: '10px' }}>
          <div style={{ margin: '10px 0' }}>
            <CharacteristicsBox>각인</CharacteristicsBox>
            <div className="nameAndLevelWrap">
              {!arkpassive?.IsArkPassive &&
                engravingEffectList &&
                engravingEffectList.map((item) => (
                  <div key={item.name}>{item.level}</div>
                ))}
            </div>
          </div>
          <EffectListWrap>
            {arkpassive?.IsArkPassive &&
              engraving?.ArkPassiveEffects.map((item) => (
                <ArkPassiveEngravingEffects item={item} key={item.Name} />
              ))}
            {!arkpassive?.IsArkPassive &&
              engravingEffectList &&
              engravingEffectList.map((item) => (
                <EngravingEffectTooltip item={item} key={item.name} />
              ))}
          </EffectListWrap>
        </div>
      </ContentWrap>
    </ContentWrapWrap>
  );
};

export default Characteristics;

const ContentWrap = styled.div`
  width: ${(props) => (props.characteristics ? '48.5%' : '100%')};
  display: flex;
  justify-content: center;
  background: #181c1e;
  border-radius: 10px;
  padding: ${(props) =>
    props.characteristics ? '10px 0 10px 0' : '10px 0 35px 0'};
  margin: 20px 0 0 0;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px 0;
    padding: 0;
  }
`;

const CharacteristicsBox = styled.div`
  width: 103px;
  height: 35px;
  background: #292e33;
  border-radius: 50px;
  text-align: center;
  line-height: 35px;
  font-family: 'Nanum Gothic';
  color: #fff;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin: 10px;
    padding: 0;
  }
`;

const TriportAndCharacteristicsWrap = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px;
    padding: 0;
  }
`;

const CombatWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 3px;

  .combatItemWrap {
    width: 50%;
    display: flex;
    justify-content: space-between;

    .type {
      width: 50px;
      margin: 5px 0;
      color: #e4ba27;
      font-family: 'Nanum Gothic';
    }

    .value {
      color: #fff;
      font-family: 'Nanum Gothic';
      width: 35px;
      margin: 5px 0;
      text-align: right;
      margin-right: 30px;
    }
  }
`;

const BasicWrap = styled.div`
  width: 94%;
  display: flex;
  flex-direction: column;
  margin: 5px 3px;

  .basicItemWrap {
    display: flex;
    justify-content: space-between;
    margin: 7px 0;
  }

  .type {
    color: #e4ba27;
    font-family: 'Nanum Gothic';
  }

  .value {
    color: #fff;
    font-family: 'Nanum Gothic';
  }
`;

const EffectListWrap = styled.div`
  display: flex;
  min-height: 265px;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;
