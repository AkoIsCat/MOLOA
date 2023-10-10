import styled from 'styled-components';

import { useState } from 'react';
import React from 'react';

const CharacterGemsPart = ({ gems, getGemsList }) => {
  function extractingGemsEffect(gems) {
    const gemsEffect = [];
    const effectRegex = /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;
    const gemsRegex = /<FONT[^>]*>(.*?)<\/FONT>/;

    for (let i = 0; i <= gems.Gems.length - 1; i++) {
      const tooltipObject = JSON.parse(gems.Gems[i].Tooltip);

      for (let key in tooltipObject) {
        if (tooltipObject[key].type === 'ItemPartBox') {
          const matchValue =
            tooltipObject[key].value['Element_001'].match(effectRegex);
          const skillName = matchValue[1];
          const skillShame = matchValue[2];
          gemsEffect.push({
            level: gems.Gems[i].Level,
            name: gems.Gems[i].Name.match(gemsRegex)[1],
            grade: gems.Gems[i].Grade,
            skillName,
            skillShame,
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

  const extractedGems = extractingGemsEffect(gems);
  const [extinction, prominence] = devideAndSortGems(extractedGems);

  // 보석 아이템(툴팁 포함)
  const GemsItem = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
      <GemsItemWrap grade={item.grade}>
        {showTooltip && (
          <div className="tooltip">
            <p className="itemName">{item.name}</p>
            <p className="skillName">{item.skillName}</p>
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

  if (extractedGems.length > 1) {
    getGemsList(extractedGems);
  }

  return (
    <ContentWrap>
      <GemsFlex>
        {extinction.map((item, index) => (
          <GemsItem key={index} item={item} />
        ))}
      </GemsFlex>
      <GemsFlex>
        {prominence.map((item, index) => (
          <GemsItem key={index} item={item} />
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

  @media ${(props) => props.theme.mobile} {
    height: 85%;
  }
`;

const GemsItemWrap = styled.div`
  position: relative;
  width: auto;
  height: 50px;
  border-radius: 10px 10px 0 0;
  margin: 3px 5px;
  padding: 10px 0 10px 0;
  flex-wrap: wrap;

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;

    @media ${(props) => props.theme.mobile} {
      width: 40px;
      height: 40px;
    }
  }

  p {
    text-align: center;
    line-height: 25px;
    width: 100%;
    color: #c1c1c1;
    height: 25px;
    font-family: 'Nanum Gothic';
    margin: 0;
    background: #292e33;
    border-radius: 0 0 10px 10px;

    @media ${(props) => props.theme.mobile} {
      font-size: 13px;
    }
  }

  .tooltip {
    position: absolute;
    background-color: rgb(41, 46, 51);
    border-radius: 10px;
    top: -70%;
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

const GemsFlex = styled.div`
  display: flex;
  margin: 10px 15px;
  justify-content: center;
  flex-wrap: wrap;
`;
