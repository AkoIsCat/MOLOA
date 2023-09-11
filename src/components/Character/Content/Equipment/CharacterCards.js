import React, { Fragment } from 'react';
import styled from 'styled-components';

import GradeFrame from '../../../../asset/icon/img_card_grade.png';
import Awake from '../../../../asset/icon/img_profile_awake.png';
import { BsDot } from 'react-icons/bs';

const CharacterCards = ({ cards }) => {
  // -------------------------- 카드

  const defaultCard = [{}, {}, {}, {}, {}, {}];
  const cardList = []; // 장착 카드 목록
  const effectList = []; // 카드 효과 목록
  const totalEffect = []; // 총 카드 효과 목록

  // 필요한 카드 정보 추출
  if (cards) {
    for (let i = 0; i <= cards.Cards.length - 1; i++) {
      cardList.push(cards.Cards[i]);
    }

    for (let key in cards.Effects) {
      const value = cards.Effects[key];

      const regex = /\d+/g;

      const lastEffectCard =
        value.Items[value.Items.length - 1] &&
        value.Items[value.Items.length - 1].Name.split('(');

      const matches =
        lastEffectCard && lastEffectCard[1] && lastEffectCard[1].match(regex);

      effectList.push({
        slots: value.CardSlots,
        index: value.Index,
        items: value.Items,
        lastEffect: lastEffectCard && lastEffectCard[0],
        awake: matches && matches,
      });
    }

    for (let j = 0; j <= effectList.length - 1; j++) {
      for (let i = 0; i <= effectList[j].items.length - 1; i++) {
        // console.log(effectList[j].items);
        totalEffect.push({
          Name: effectList[j].items[i].Name,
          Description: effectList[j].items[i].Description,
        });
      }
    }
  }

  // --------------------------

  return (
    <div>
      <ContentWrap style={{ flexDirection: 'column', padding: '10px 0 0' }}>
        <CardEffectNames>
          <CharacteristicsBox>카드</CharacteristicsBox>
          <div className="cardEffect">
            {effectList.map((item, index) =>
              index === effectList.length - 1 ? (
                <span key={index}>
                  {item.lastEffect}
                  {item.awake}
                  {item.awake && '각'}
                </span>
              ) : (
                <Fragment key={index}>
                  <span>
                    {item.lastEffect}
                    {item.awake}
                    {item.awake && '각'}
                  </span>
                  <BsDot />
                </Fragment>
              )
            )}
          </div>
        </CardEffectNames>
        {cards && (
          <CardWrap>
            <ul>
              {defaultCard.map((item, index) => (
                <CardListWrap
                  key={index}
                  grade="true"
                  style={{ position: 'absolute' }}
                >
                  <PhotoFrame
                    grade="true"
                    count="true"
                    translate={index}
                    default={true}
                    cards={cards}
                  />
                </CardListWrap>
              ))}
              {cardList.map((item, index) => (
                <CardListWrap key={index} grade={item.Grade}>
                  <PhotoFrame
                    grade={item.Grade}
                    translate={index}
                    count={item.AwakeCount}
                    default={false}
                  >
                    <img src={item.Icon} alt={item.Name} />
                    <div style={{ position: 'relative' }}>
                      <div className="card-awake">
                        <div className="awake"></div>
                      </div>
                    </div>
                  </PhotoFrame>
                  <div className="name">{item.Name}</div>
                </CardListWrap>
              ))}
            </ul>
            <div>
              <div className="effectWrapWrap">
                {totalEffect.map((item, index) => (
                  <div className="effectWrap" key={index}>
                    <div className="effectName">{item.Name}</div>
                    <div className="effectDesc">{item.Description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardWrap>
        )}
        {!cards && <div></div>}
      </ContentWrap>
    </div>
  );
};

export default CharacterCards;

const ContentWrap = styled.div`
  width: ${(props) => (props.characteristics ? '32%' : '100%')};
  display: flex;
  justify-content: center;
  background: #181c1e;
  border-radius: 10px;
  padding: ${(props) =>
    props.characteristics ? '10px 0 10px 0' : '10px 0 35px 0'};
  margin: 20px 0 0 0;
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
`;

const CardEffectNames = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 0px 20px;

  .cardEffect {
    color: #fff;
    font-family: 'Nanum Gothic';
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 13px;
  }
`;

const CardWrap = styled.div`
  width: auto;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    position: relative;
    width: 120px;

    @media ${(props) => props.theme.mobile} {
      transform: scale(0.45);
      margin: 0;
      width: 0;
    }
  }

  .effectWrapWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media ${(props) => props.theme.mobile} {
      font-size: 13px;
    }

    .effectWrap {
      width: 43%;
      margin: 15px 40px 15px 5px;

      @media ${(props) => props.theme.mobile} {
        width: 100%;
      }

      .effectName {
        color: #e4b021;
        font-family: 'Nanum Gothic';
        margin: 10px 0;
      }
      .effectDesc {
        color: #fff;
        font-family: 'Nanum Gothic';
      }
    }
  }
`;

const PhotoFrame = styled.li`
  margin-right: ${(props) => props.translate + 13}px;

  &::after {
    display: flex;
    width: 114px;
    height: 170px;
    position: absolute;
    transform: translateX(${(props) => props.translate * 120}px);
    inset: ${(props) => (props.default ? '-5px' : '0px')};
    background-image: url(${GradeFrame});
    content: '';
    background-position: ${(props) =>
      props.grade === '전설'
        ? '-495px 0'
        : props.grade === '영웅'
        ? '-372px 0'
        : props.grade === '희귀'
        ? '-249px 0'
        : props.grade === '고급'
        ? '-126px 0'
        : '0px 0'};
  }

  img {
    padding: 5px 0px;
    width: 105.5px;
    height: 155px;
    object-fit: cover;
  }

  .card-awake {
    position: absolute;
    background-image: url(${Awake});
    background-repeat: no-repeat;

    width: 120px;
    height: 30px;
    left: 8%;
    right: 0%;
    bottom: 30%;
    // top: 65%;
    margin-bottom: 10px;

    .awake {
      width: ${(props) =>
        props.count === 1
          ? '16px'
          : props.count === 2
          ? '36px'
          : props.count === 3
          ? '55px'
          : props.count === 4
          ? '75px'
          : props.count === 5
          ? '100px'
          : '0px'};
      position: absolute;
      height: 100%;
      left: 0%;
      right: 0;
      top: 18%;
      background: url(${Awake}) no-repeat 0 -36px;
      // transform: translateX(${(props) => props.translate * 120}px);
    }
  }
`;

const CardListWrap = styled.div`
  .name {
    font-size: 14px;
    padding: 0 10px;
    color: ${(props) =>
      props.grade === '전설'
        ? '#fe9600'
        : props.grade === '영웅'
        ? '#ce43fc'
        : props.grade === '희귀'
        ? '#00b5ff'
        : props.grade === '고급'
        ? '#91fe02'
        : '#fff'};

    font-family: 'Nanum Gothic';
    margin-top: 7px;
    margin-right: 13px;
    text-align: center;
  }
`;
