import styled from 'styled-components';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

import ContentWrap from '../../ContentWrap';

const SkillPoint = styled.p`
  color: #fff;
  font-family: 'Nanum Gothic';
  font-size: 20px;
`;

const SkillItem = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 30px;
  border-bottom: ${(props) => (!props.end ? '' : ' 1px solid #292e33')};
  font-family: 'Nanum Gothic';
  align-items: center;

  .skillInfoBox {
    width: 160px;
    display: flex;

    img {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      object-fit: contain;
    }

    .skillNameAndSlot {
      margin-left: 10px;

      .skillName {
        color: #fff;
        font-size: 16px;
        margin-bottom: 5px;
      }

      .tripodSlot {
        display: flex;
        width: 100%;
      }
    }
  }

  .skillLevel {
    width: 70px;
    color: #fff;
    font-size: 16px;
    margin: 0 10px;
    text-align: center;
  }

  .RuneBox {
    width: 90px;
    display: flex;
    align-items: center;

    .RuneName {
      color: #fff;
      margin-left: 10px;
    }
  }

  .gemsBox {
    width: 100px;
    display: flex;
    padding: 0 0 10px 0;
    margin-left: 10px;
  }

  .tripodsBox {
    display: flex;

    .tooltip {
      position: absolute;
      background-color: rgb(41, 46, 51);
      border-radius: 10px;
      top: 0%;
      right: 90%;
      // transform: translate(-50%, -50%);
      width: 200px;
      height: auto;
      padding: 10px;
      color: #c1c1c1;
      z-index: 100;
      line-height: 25px;
    }

    .tripodsWrap {
      width: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
        height: 40px;
        margin-bottom: 7px;
      }

      .tripodNameAndLevel {
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 5px;

        .tripodName {
          margin-bottom: 3px;
          font-size: 12px;
          text-align: center;
        }

        .tripodLevel {
        }
      }
    }
  }
`;

const TripodWrap = styled.div`
  background-color: ${(props) =>
    props.tier === 0 ? '#00b5ff' : props.tier === 1 ? '#91fe02' : '#fe9600'};
  width: 20px;
  text-align: center;
  margin: 0 3px;
  border-radius: 120px;
`;

const RuneColorBox = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.grade === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.grade === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.grade === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : props.grade === '고대'
      ? 'linear-gradient(135deg, #3d3325 0%, #dcc999 100%)'
      : props.grade === '유물'
      ? 'linear-gradient(135deg, #341a09 0%, #a24006 100%)'
      : '#292e33'};
  border: ${(props) =>
    props.isExist === undefined || props.isExist === null
      ? ''
      : '1px solid #2b3033'};

  img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }
`;

const ImageBoxColor = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.exist === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.exist === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.exist === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : props.exist === '고대'
      ? 'linear-gradient(135deg, #3d3325 0%, #dcc999 100%)'
      : props.exist === '유물'
      ? 'linear-gradient(135deg, #341a09 0%, #a24006 100%)'
      : props.exist === '고급'
      ? 'linear-gradient(135deg, #1a230e 0%, #374e18 100%)'
      : '#292e33'};
  border-radius: 10px;
`;

const GemsItemWrap = styled.div`
  position: relative;
  width: auto;
  height: 40px;
  border-radius: 10px 10px 0 0;
  margin: 0px 5px;
  padding: 10px 0 10px 0;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }

  p {
    text-align: center;
    line-height: 20px;
    width: 100%;
    color: #c1c1c1;
    height: 20px;
    font-family: 'Nanum Gothic';
    margin: 0;
    background: #292e33;
    border-radius: 0 0 10px 10px;
  }

  .tooltip {
    position: absolute;
    background-color: rgb(41, 46, 51);
    border-radius: 10px;
    top: -40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: auto;
    padding: 10px;

    .itemName {
      border-radius: 10px;
      color: ${(props) =>
        props.grade === '일반'
          ? '#fff'
          : props.grade === '고급'
          ? '#91fe02'
          : props.grade === '영웅'
          ? '#ce43fc'
          : props.grade === '전설'
          ? '#ffc600'
          : '#f07728'};
    }
    .skillName {
      color: #ffba01;
      font-size: 16px;
    }
    .skillShame {
      margin: 0;
      font-size: 14px;
      color: #fff;
    }
  }
`;

const Skill = ({ combatSkills, profile, getGems }) => {
  const skillList = [];

  if (combatSkills) {
    const notNullRune = combatSkills.filter(
      (item) => item.Rune !== null || item.Level >= 2
    );

    // 안쓰는 트포 삭제
    for (let key in notNullRune) {
      for (let keys in notNullRune[key].Tripods) {
        if (notNullRune[key].Tripods[keys].IsSelected === false) {
          delete notNullRune[key].Tripods[keys];
        }
      }
    }

    const sortSkill = notNullRune.sort((a, b) => {
      return b.Level - a.Level;
    });

    for (let i = 0; i < sortSkill.length; i++) {
      const skillName = sortSkill[i].Name;
      const skillIcon = sortSkill[i].Icon;
      const skillLevel = sortSkill[i].Level;
      const skillRune = sortSkill[i].Rune;
      const skillTripod = sortSkill[i].Tripods;
      const skillGems = getGems.filter(
        (item) => item.skillName === sortSkill[i].Name
      );

      skillList.push({
        skillName,
        skillIcon,
        skillLevel,
        skillRune,
        skillTripod,
        skillGems,
      });
    }
  }

  const GemsItem = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <GemsItemWrap grade={item.grade}>
        {showTooltip && (
          <div className="tooltip">
            <p className="itemName">{item.name}</p>
            <p className="skillShame">{item.skillShame}</p>
          </div>
        )}
        <ImageBoxColor
          exist={item.grade}
          style={{ borderRadius: '10px 10px 0 0' }}
        >
          <img
            src={item.icon}
            alt="멸화"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
        </ImageBoxColor>
        <p
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {item.level}
        </p>
      </GemsItemWrap>
    );
  };

  const TripodItem = ({ items }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div style={{ position: 'relative' }}>
        {showTooltip && (
          <div className="tooltip">
            <p className="skillShame">
              {items.Tooltip.replace(/<\/?FONT.*?>/gi, '')}
            </p>
          </div>
        )}
        <div className="tripodsWrap" key={nanoid()}>
          <img
            src={items.Icon}
            alt={items.Name}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          <div className="tripodNameAndLevel">
            <div className="tripodName">{items.Name}</div>
            <div className="tripodLevel">Lv.{items.Level}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '0 10px', width: '100%' }}>
      <ContentWrap>
        <SkillPoint>
          스킬포인트 {profile && profile.UsingSkillPoint} /{' '}
          {profile && profile.TotalSkillPoint}
        </SkillPoint>
      </ContentWrap>
      <ContentWrap>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {skillList.map((item, index) =>
            index === skillList.length - 1 ? (
              <SkillItem key={nanoid()}>
                <div className="skillInfoBox">
                  <img src={item.skillIcon} alt={item.skillName} />
                  <div className="skillNameAndSlot">
                    <div className="skillName">{item.skillName}</div>
                    <div className="tripodSlot">
                      {item.skillTripod.map((items) => (
                        <TripodWrap key={nanoid()} tier={items.Tier}>
                          {items.Slot}
                        </TripodWrap>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="skillLevel">{item.skillLevel}레벨</div>
                <div className="RuneBox">
                  <RuneColorBox
                    grade={item?.skillRune?.Grade}
                    isExist={item.skillRune?.Icon}
                  >
                    <img
                      src={item.skillRune?.Icon}
                      alt={item.skillRune?.Name}
                    />
                  </RuneColorBox>
                  <div className="RuneName">{item?.skillRune?.Name}</div>
                </div>
                <div className="gemsBox">
                  {item.skillGems.map((items) => (
                    <GemsItem item={items} key={nanoid()} />
                  ))}
                </div>
                <div className="tripodsBox">
                  {item.skillTripod.map((items) => (
                    <TripodItem items={items} key={nanoid()} />
                  ))}
                </div>
              </SkillItem>
            ) : (
              <SkillItem end="true" key={nanoid()}>
                <div className="skillInfoBox">
                  <img src={item.skillIcon} alt={item.skillName} />
                  <div className="skillNameAndSlot">
                    <div className="skillName">{item.skillName}</div>
                    <div className="tripodSlot">
                      {item.skillTripod.map((items) => (
                        <TripodWrap key={nanoid()} tier={items.Tier}>
                          {items.Slot}
                        </TripodWrap>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="skillLevel">{item.skillLevel}레벨</div>
                <div className="RuneBox">
                  <RuneColorBox
                    grade={item?.skillRune?.Grade}
                    isExist={item.skillRune?.Icon}
                  >
                    <img
                      src={item.skillRune?.Icon}
                      alt={item.skillRune?.Name}
                    />
                  </RuneColorBox>
                  <div className="RuneName">{item?.skillRune?.Name}</div>
                </div>
                <div className="gemsBox">
                  {item.skillGems.map((items) => (
                    <GemsItem item={items} key={nanoid()} />
                  ))}
                </div>
                <div className="tripodsBox">
                  {item.skillTripod.map((items) => (
                    <TripodItem items={items} key={nanoid()} />
                  ))}
                </div>
              </SkillItem>
            )
          )}
        </div>
      </ContentWrap>
    </div>
  );
};

export default React.memo(Skill);
