import React, { Fragment } from 'react';

import styled from 'styled-components';

import { BsDot } from 'react-icons/bs';

const EquipmentWrap = styled.div`
  width: auto;
  height: auto;
  background: #181c1e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;

  .image {
    width: 75%;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: contain;
    }
  }
`;

const TrueInner = styled.div`
  min-width: 200px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  justify-content: space-between;

  div {
    display: flex;
    margin-bottom: 13px;

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        font-size: 15px;
        color: #fff;
        margin: 5px;
      }

      .name {
        color: #fff;
        margin: 5px;
      }
    }
  }
`;

const FalseInner = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 0 40px;

  div {
    display: flex;
    margin-bottom: 10px;

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        color: #fff;
        margin: 5px;
      }

      .name {
        color: #fff;
        margin: 5px;
      }

      div {
        margin: 0;
        color: #fff;
        height: 20px;
      }
    }
  }
`;

const ImageBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #292e33;

  img {
    border-radius: 10px;
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
      : '#292e33'};
  border-radius: 10px;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const PercentBar = styled.div`
  width: 190px;
  height: 20px;
  margin: 0 5px;
  display: flex;

  p {
    width: 40px;
    color: ${(props) =>
      props.quality === 0
        ? '#fff'
        : props.quality > 0 && props.quality < 11
        ? '#ff0000'
        : props.quality < 30
        ? '#ffd200'
        : props.quality >= 30 && props.quality < 70
        ? '#91fe02'
        : props.quality >= 70 && props.quality < 90
        ? '#00b5ff'
        : props.quality >= 90 && props.quality < 100
        ? '#ce43fc'
        : '#fe9600'};
    margin: 2px 5px;
    text-align: center;
  }

  div {
    width: 100%;
    height: 20px;
    background: #292e33;
    border-radius: 10px;

    div {
      width: ${(props) => props.quality}%;
      background: ${(props) =>
        props.quality === 0
          ? '#fff'
          : props.quality > 0 && props.quality < 11
          ? '#ff0000'
          : props.quality > 10 && props.quality < 30
          ? '#ffd200'
          : props.quality >= 30 && props.quality < 70
          ? '#91fe02'
          : props.quality >= 70 && props.quality < 90
          ? '#00b5ff'
          : props.quality >= 90 && props.quality < 100
          ? '#ce43fc'
          : '#fe9600'};
    }
  }
`;

const MountedEngraving = styled.div`
  display: flex;
  align-items: center;
  width: auto;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 5px;
  }

  div {
    width: auto;
    margin: 0 15px 0 0;
    display: flex;
    flex-direction: column;

    p {
      font-size: 15px;
      margin: 0 0px 5px 5px;
      font-family: 'Nanum Gothic';
      color: #fff;
    }

    .name {
      color: ${(props) =>
        props.grade === '+12'
          ? '#fe9600'
          : props.grade === ' +9'
          ? '#9e24ca'
          : props.grade === ' +6'
          ? '#113d5d'
          : props.grade === ' +3'
          ? '#46812d'
          : ''};
    }
  }
`;

const CharacterEquipmentPart = ({ equipment, engraving }) => {
  // 장비 정보 조회
  const equipmentList = [
    {
      Type: '투구',
      Tooltip: '머리장식',
    },
    {
      Type: '어깨',
      Tooltip: '견갑',
    },
    {
      Type: '상의',
      Tooltip: '상의',
    },
    {
      Type: '하의',
      Tooltip: '하의',
    },
    {
      Type: '장갑',
      Tooltip: '장갑',
    },
    {
      Type: '무기',
      Tooltip: '수호의 바다 절망의 대지 투쟁의 산맹 진리의 창공 ',
    },
  ];

  const accessoriesList = [
    { Type: '목걸이' },
    { Type: '귀걸이' },
    { Type: '귀걸이' },
    { Type: '반지' },
    { Type: '반지' },
    { Type: '팔찌' },
    { Type: '어빌리티 스톤' },
  ];

  const filterAccessories =
    equipment &&
    equipment.filter(
      (item) =>
        item.Type !== '투구' &&
        item.Type !== '무기' &&
        item.Type !== '상의' &&
        item.Type !== '하의' &&
        item.Type !== '어깨' &&
        item.Type !== '장갑' &&
        item.Type !== '부적' &&
        item.Type !== '나침반'
    );

  // 아이템 정렬
  const equipmentTooltip = [];

  for (const item in equipment) {
    equipmentTooltip.push(JSON.parse(equipment[item].Tooltip));
  }

  const sortEquipmentTooltip = [
    equipmentTooltip[1],
    equipmentTooltip[5],
    equipmentTooltip[2],
    equipmentTooltip[3],
    equipmentTooltip[4],
    equipmentTooltip[0],
  ];

  const sortAccessoriesTooltip = [
    equipmentTooltip[6],
    equipmentTooltip[7],
    equipmentTooltip[8],
    equipmentTooltip[9],
    equipmentTooltip[10],
    equipmentTooltip[11],
    equipmentTooltip[12],
  ];

  const stoneAndBracelet = [];
  // equipment에서 스톤과 팔찌를 추출한다.
  if (equipment) {
    for (const key in equipment) {
      if (
        equipment[key].Type !== '무기' &&
        equipment[key].Type !== '투구' &&
        equipment[key].Type !== '상의' &&
        equipment[key].Type !== '하의' &&
        equipment[key].Type !== '장갑' &&
        equipment[key].Type !== '어깨' &&
        equipment[key].Type !== '나침반' &&
        equipment[key].Type !== '부적' &&
        equipment[key].Type !== '목걸이' &&
        equipment[key].Type !== '귀걸이' &&
        equipment[key].Type !== '반지'
      ) {
        stoneAndBracelet.push({ ...equipmentTooltip[key] });
      }
    }
  }

  let stoneIndex = -1;
  let braceletIndex = -1;
  const breceletEffectList = [];
  // 팔찌효과 추출
  if (stoneAndBracelet) {
    // 어빌리티 스톤 각인 활성화가 들어있는 인덱스를 탐색하는 for..in문
    for (const key in stoneAndBracelet[0]) {
      if (stoneAndBracelet[0][key].type === 'IndentStringGroup') {
        stoneIndex = key;
        break;
      }
    }
    // 팔찌에서 팔찌 효과가 들어있는 인덱스를 탐색
    if (stoneAndBracelet[1] !== undefined) {
      for (const key in stoneAndBracelet[1]) {
        if (stoneAndBracelet[1][key].type === 'ItemPartBox') {
          braceletIndex = key;
          break;
        }
      }
      const braceletEffect =
        stoneAndBracelet &&
        stoneAndBracelet[1] !== undefined &&
        stoneAndBracelet[1][braceletIndex].value['Element_001'];

      const braceletElements = braceletEffect.split('<BR>');
      const regularExpressionResult = [];
      for (let i = 0; i < braceletElements.length; i++) {
        const text = braceletElements[i]
          .replace(/<[^>]+>/g, '')
          .replace(/\[|\]/g, '')
          .replace(/['"]/g, '')
          .trim();

        if (text[text.length - 1] === ')' || !isNaN(text[text.length - 1])) {
          regularExpressionResult.push(text);
          const textSplit = text.split(':');

          if (textSplit.length > 1) {
            breceletEffectList.push({
              text: textSplit[0],
              description: textSplit[1],
            });
          } else {
            const textSplice = text.split(' ');
            breceletEffectList.push({
              text: textSplice[0],
              description: textSplice[1],
            });
          }
        } else {
          regularExpressionResult.concat(text);
        }
      }

      // 정규식을 이용해서 팔찌효과를 추출한 뒤 객체에 저장
    }
  }

  // 장착 각인

  const mountedEngraving = engraving && engraving.Engravings;
  const mountedEngravingTooltip = [];

  // 문자열로 되어있는 객체를 객체로 변환
  mountedEngraving &&
    mountedEngraving.map((item) =>
      mountedEngravingTooltip.push(JSON.parse(item.Tooltip))
    );

  // 장착된 각인 활성화를 추출한다.
  const mountedEngravingItem = mountedEngravingTooltip
    .map((obj) => obj.Element_001)
    .filter((obj) => obj.type === 'EngraveSkillTitle')
    .map((obj) => obj.value.leftText);

  return (
    <EquipmentWrap>
      <FlexWrap>
        <TrueInner>
          {equipmentList.map((item, index) => (
            <div key={index}>
              {equipment.map(
                (items) =>
                  items.Type === item.Type && (
                    <Fragment key={index}>
                      <ImageBox>
                        <ImageBoxColor key={index} exist={items.Grade}>
                          <img src={items.Icon} alt="아바타" />
                        </ImageBoxColor>
                      </ImageBox>
                      <div className="desc">
                        <p className="type">{items.Name}</p>
                        <PercentBar
                          quality={
                            sortEquipmentTooltip[index] &&
                            sortEquipmentTooltip[index]['Element_001'].value
                              .qualityValue
                          }
                        >
                          <p>
                            {sortEquipmentTooltip[index] &&
                              sortEquipmentTooltip[index]['Element_001'].value
                                .qualityValue}
                          </p>
                          <div>
                            <div></div>
                          </div>
                        </PercentBar>
                      </div>
                    </Fragment>
                  )
              )}
            </div>
          ))}
          <div>
            {mountedEngraving &&
              mountedEngraving.map((item, index) => (
                <MountedEngraving
                  key={index}
                  grade={mountedEngravingItem[index].slice(-10, -7)}
                >
                  <img src={item.Icon} alt="장착된 각인" />
                  <div>
                    <p className="name">{item.Name}</p>
                    <p>{mountedEngravingItem[index].slice(-10, -7)}</p>
                  </div>
                </MountedEngraving>
              ))}
          </div>
        </TrueInner>
        <FalseInner>
          {accessoriesList &&
            accessoriesList.map((item, index) => (
              <div key={index}>
                <Fragment key={index}>
                  <ImageBox>
                    <ImageBoxColor
                      key={index}
                      exist={
                        filterAccessories[index] !== undefined &&
                        filterAccessories[index].Grade
                      }
                    >
                      {filterAccessories && filterAccessories[index] && (
                        <img
                          key={index}
                          src={filterAccessories[index].Icon}
                          alt="아바타"
                        />
                      )}
                    </ImageBoxColor>
                  </ImageBox>
                  <div className="desc">
                    <p className="type">
                      {filterAccessories &&
                        filterAccessories[index] &&
                        filterAccessories[index].Name}
                    </p>
                    {index < 5 && (
                      <PercentBar
                        quality={
                          sortAccessoriesTooltip &&
                          sortAccessoriesTooltip[index] &&
                          sortAccessoriesTooltip[index]['Element_001'].value
                            .qualityValue
                        }
                      >
                        <p>
                          {sortAccessoriesTooltip &&
                            sortAccessoriesTooltip[index] &&
                            sortAccessoriesTooltip[index]['Element_001'].value
                              .qualityValue}
                        </p>
                        <div>
                          <div></div>
                        </div>
                      </PercentBar>
                    )}
                    {index === 5 && (
                      <div>
                        <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                          {stoneAndBracelet[0] &&
                            stoneAndBracelet[0][stoneIndex] &&
                            stoneAndBracelet[0][stoneIndex].value[
                              'Element_000'
                            ].contentStr['Element_000'].contentStr.slice(
                              -5,
                              -4
                            )}
                        </p>
                        <BsDot />
                        <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                          {stoneAndBracelet[0] &&
                            stoneAndBracelet[0][stoneIndex] &&
                            stoneAndBracelet[0][stoneIndex].value[
                              'Element_000'
                            ].contentStr['Element_001'].contentStr.slice(
                              -5,
                              -4
                            )}
                        </p>
                        <BsDot />
                        <p style={{ margin: '0 8px', color: '#832c35' }}>
                          {stoneAndBracelet[0] &&
                            stoneAndBracelet[0][stoneIndex] &&
                            stoneAndBracelet[0][stoneIndex].value[
                              'Element_000'
                            ].contentStr['Element_002'].contentStr.slice(
                              -5,
                              -4
                            )}
                        </p>
                      </div>
                    )}
                    <div style={{ display: 'flex' }}>
                      {index === 6 &&
                        breceletEffectList.map((item, index) => (
                          <p key={index} style={{ margin: '0 2px 0 4px' }}>
                            {item.text}
                          </p>
                        ))}
                    </div>
                  </div>
                </Fragment>
              </div>
            ))}
        </FalseInner>
      </FlexWrap>
    </EquipmentWrap>
  );
};

export default React.memo(CharacterEquipmentPart);
