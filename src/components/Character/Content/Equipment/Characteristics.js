import styled from 'styled-components';
import React, { useState } from 'react';

const Characteristics = ({ combatSkills, profile, engraving }) => {
  // ------------------------- 특성 탭
  const combatCharacteristics = [];
  const basicCharacteristics = [];

  if (profile) {
    for (let key in profile.Stats) {
      if (
        profile.Stats[key].Type !== '최대 생명력' &&
        profile.Stats[key].Type !== '공격력'
      ) {
        combatCharacteristics.push(profile.Stats[key]);
      } else {
        basicCharacteristics.push(profile.Stats[key]);
      }
    }
  }
  // ---------------------------------

  // -------------------------- 각인

  const engravingEffect = [];

  // 각인 이름, 레벨, 툴팁 추출
  if (engraving) {
    for (let key in engraving.Effects) {
      const name = engraving.Effects[key].Name.split('Lv.')[0].trim();
      const level = engraving.Effects[key].Name.split('Lv.')[1].trim();
      const description = engraving.Effects[key].Description;
      engravingEffect.push({
        name,
        level,
        description,
      });
    }
  }

  // 툴팁 표시를 위한 컴포넌트
  const EngravingEffectTooltip = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <EffectWrap>
        {showTooltip && <div className="tooltip">{item.description}</div>}
        <div
          className="name"
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {item.name}
        </div>
        <div
          className="level"
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Lv. {item.level}
        </div>
      </EffectWrap>
    );
  };

  // --------------------------

  const filterSkills = []; // 사용중인 스킬

  if (combatSkills) {
    for (let key in combatSkills) {
      if (combatSkills[key].Level >= 4) {
        filterSkills.push(combatSkills[key]);
      }
    }

    for (let key in filterSkills) {
      for (let keys in filterSkills[key].Tripods) {
        if (filterSkills[key].Tripods[keys].IsSelected === false) {
          delete filterSkills[key].Tripods[keys];
        }
      }
    }
  }

  return (
    <ContentWrapWrap
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <ContentWrap characteristics="true">
        <TriportAndCharacteristicsWrap>
          <div style={{ margin: '10px 0' }}>
            <CharacteristicsBox>전투 특성</CharacteristicsBox>
            <CombatWrap>
              {combatCharacteristics.map((item, index) => (
                <div key={index} className="combatItemWrap">
                  <div className="type">{item.Type}</div>
                  <div className="value">{item.Value}</div>
                </div>
              ))}
            </CombatWrap>
          </div>
          <div style={{ margin: '10px 0' }}>
            <CharacteristicsBox>기본 특성</CharacteristicsBox>
            <BasicWrap>
              {basicCharacteristics.map((item, index) => (
                <div key={index} className="basicItemWrap">
                  <div className="type">{item.Type}</div>
                  <div className="value">{item.Value}</div>
                </div>
              ))}
            </BasicWrap>
          </div>
        </TriportAndCharacteristicsWrap>
      </ContentWrap>
      <ContentWrap characteristics="true" style={{ flexDirection: 'column' }}>
        <NameAndLevelWrap>
          <CharacteristicsBox>각인</CharacteristicsBox>
          <div className="nameAndLevelWrap">
            {engravingEffect.map((item, index) => (
              <div key={index}>{item.level}</div>
            ))}
          </div>
        </NameAndLevelWrap>
        <EffectListWrap>
          {engravingEffect.map((item, index) => (
            <EngravingEffectTooltip item={item} key={index} />
          ))}
        </EffectListWrap>
      </ContentWrap>
      <ContentWrap characteristics="true">
        <div style={{ padding: '20px 0 0 0' }}>
          <CharacteristicsBox style={{ margin: '0 0 15px 15px' }}>
            트라이포드
          </CharacteristicsBox>
          <SkillWrap>
            {filterSkills.map((item, index) => (
              <div className="skillWrap" key={index}>
                <div className="skillName">{item.Name}</div>
                <TripodWrap>
                  {item.Tripods.map(
                    (tripodItem, indexs) =>
                      tripodItem && (
                        <SkillLevel
                          key={indexs}
                          className={`${tripodItem.Tier} skillLevel`}
                          tier={tripodItem.Tier}
                        >
                          {tripodItem.Level}
                        </SkillLevel>
                      )
                  )}
                </TripodWrap>
              </div>
            ))}
          </SkillWrap>
        </div>
      </ContentWrap>
    </ContentWrapWrap>
  );
};

export default Characteristics;

const ContentWrap = styled.div`
  width: ${(props) => (props.characteristics ? '32%' : '100%')};
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

const NameAndLevelWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 15px 3px;

  .nameAndLevelWrap {
    display: flex;
    color: #fff;
    font-family: 'Nanum Gothic';
  }

  @media ${(props) => props.theme.mobile} {
    width: 50%;
    margin: 10px;
    padding: 0;
  }
`;

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
    margin: 0;
    padding: 10px;
    color: #c1c1c1;
    font-family: 'Nanum Gothic';
  }
`;

const EffectListWrap = styled.div`
  display: flex;
  height: 265px;
  flex-direction: column;
  justify-content: space-between;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  backgruond: pink;
  margin: 5px 0;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px 0;
    padding: 0;
  }

  .skillWrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1px 0;

    @media ${(props) => props.theme.mobile} {
      margin: 10px 0;
    }
  }

  .skillName {
    width: 120px;
    font-family: 'Nanum Gothic';
    color: #fff;
    font-size: 16px;
    margin: 0 10px;
    padding-left: 10px;
  }
`;

const TripodWrap = styled.div`
  display: flex;
  margin-right: 5px;
`;

const SkillLevel = styled.div`
  font-size: 20px;
  margin: 0 5px;
  padding-right: 10px;
  color: ${(props) =>
    props.tier === 0 ? '#00b5ff' : props.tier === 1 ? '#91fe02' : '#fe9600'};
`;

const ContentWrapWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;
