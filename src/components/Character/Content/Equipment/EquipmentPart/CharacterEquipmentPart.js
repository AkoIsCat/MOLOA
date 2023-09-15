import React from 'react';
import { useMediaQuery } from 'react-responsive';

import styled from 'styled-components';
import EquipmentDetail from './EquipmentDetail';
import MountedEngraving from './MountedEngraving';
import AccessoriesDetail from './AccessoriesDetail';

const CharacterEquipmentPart = ({ equipment, engraving }) => {
  // 장비 정보 조회
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

  const sortAccessoriesTooltip = equipmentTooltip.slice(6, 13);

  // 장비 툴팁 추출
  const equipmentEffectTooltip = [];
  const accessoriesEffectTooltip = []; // 악세 툴팁

  if (sortEquipmentTooltip[0] !== undefined) {
    const removeFontTagRegex = /<\/?FONT[^>]*>/g;
    const removeLevelRegex = /.*Lv\.(\d+).*/;

    const filterTooltip = [];
    for (let i = 0; i <= sortEquipmentTooltip.length - 1; i++) {
      const filterValue = [];

      // 기본, 추가효과, 세트레벨
      for (let key in sortEquipmentTooltip[i]) {
        if (sortEquipmentTooltip[i][key].type === 'ItemPartBox') {
          filterValue.push({
            effect: sortEquipmentTooltip[i][key].value['Element_001'],
          });
        }
      }

      // 엘릭서
      for (let key in sortEquipmentTooltip[i]) {
        const tooltip = sortEquipmentTooltip[i][key].value['Element_000'];
        if (
          sortEquipmentTooltip[i][key].type === 'IndentStringGroup' &&
          Object.keys(sortEquipmentTooltip[i][key].value).length === 1 &&
          tooltip.contentStr['Element_000'].bPoint
        ) {
          const activateElixir =
            tooltip.topStr.includes('단계') &&
            tooltip.topStr.replace(removeFontTagRegex, '').split('<br>')[1];
          filterValue.push({
            Elixir: tooltip.contentStr['Element_000']?.contentStr,
            Elixir2: tooltip?.contentStr['Element_001']?.contentStr,
            activate: activateElixir,
          });
        }
      }

      // 아이템 레벨
      for (let key in sortEquipmentTooltip[i]) {
        if (sortEquipmentTooltip[i][key].type === 'ItemTitle') {
          filterValue.push({
            itemName: sortEquipmentTooltip[i][key].value.leftStr0,
            quality: sortEquipmentTooltip[i][key].value.qualityValue,
            itemLevel: sortEquipmentTooltip[i][key].value.leftStr2,
          });
        }
      }

      filterTooltip.push({
        tooltip: filterValue,
      });
    }

    let sum1 = 0,
      sum2 = 0,
      totalSum = 0;
    let activateElixir = false;

    for (let i = 0; i < filterTooltip.length; i++) {
      const splitBR = filterTooltip[i].tooltip[0].effect.split('<BR>');
      const removeFont = filterTooltip[i].tooltip[2]?.effect?.replace(
        removeFontTagRegex,
        ''
      );
      let elixir1, elixir2;

      if (
        activateElixir === false &&
        (filterTooltip[i].tooltip[3].activate !== false ||
          filterTooltip[i].tooltip[4].activate === false)
      ) {
        activateElixir = filterTooltip[i].tooltip[3].activate;
      } else if (
        activateElixir === false &&
        (filterTooltip[i].tooltip[3].activate === false ||
          filterTooltip[i].tooltip[4].activate !== false)
      ) {
        activateElixir = filterTooltip[i].tooltip[4].activate;
      }

      if (i < filterTooltip.length - 1) {
        elixir1 = filterTooltip[i].tooltip[3]?.Elixir?.replace(
          removeFontTagRegex,
          ''
        ).split(/<br>|<BR>/);

        elixir2 = filterTooltip[i].tooltip[3]?.Elixir2?.replace(
          removeFontTagRegex,
          ''
        ).split(/<br>|<BR>/);

        const elixir1Level =
          elixir1 &&
          elixir1 !== undefined &&
          parseInt(elixir1[0].replace(removeLevelRegex, '$1'));
        const elixir2Level =
          elixir2 &&
          elixir2 !== undefined &&
          parseInt(elixir2[0].replace(removeLevelRegex, '$1'));

        sum1 += elixir1Level;
        sum2 += elixir2Level;
      }

      totalSum = sum1 + sum2;

      const itemName = filterTooltip[i].tooltip[
        filterTooltip[i].tooltip.length - 1
      ].itemName.replace(removeFontTagRegex, '');

      const itemLevel = filterTooltip[i].tooltip[
        filterTooltip[i].tooltip.length - 1
      ].itemLevel.replace(removeFontTagRegex, '');

      const itemQuality =
        filterTooltip[i].tooltip[filterTooltip[i].tooltip.length - 1].quality;

      if (i < 5) {
        equipmentEffectTooltip.push({
          physics: splitBR[0],
          magic: splitBR[1],
          characteristic: splitBR[2],
          health: splitBR[3],
          vitality: filterTooltip[i].tooltip[1].effect,
          level: removeFont,
          itemName,
          itemLevel,
          itemQuality,
          elixir1,
          elixir2,
        });
      } else {
        equipmentEffectTooltip.push({
          offensePower: filterTooltip[i].tooltip[0].effect,
          additionalDamage: filterTooltip[i].tooltip[1].effect,
          level: removeFont,
          itemName,
          itemLevel,
          itemQuality,
          elixirTotalLevel: totalSum,
          activateElixir,
        });
      }
    }
  }

  if (sortAccessoriesTooltip[0] !== undefined) {
    const filterTooltip = [];
    for (let i = 0; i < sortAccessoriesTooltip.length; i++) {
      const filterValue = [];

      if (i !== sortAccessoriesTooltip.length) {
        // 특성
        for (let key in sortAccessoriesTooltip[i]) {
          if (sortAccessoriesTooltip[i][key].type === 'ItemPartBox') {
            filterValue.push({
              effect: sortAccessoriesTooltip[i][key].value['Element_001'],
            });
          }
        }

        // 각인
        for (let key in sortAccessoriesTooltip[i]) {
          if (sortAccessoriesTooltip[i][key].type === 'IndentStringGroup') {
            filterValue.push({
              engrave1:
                sortAccessoriesTooltip[i][key]?.value['Element_000']
                  ?.contentStr['Element_000']?.contentStr,
              engrave2:
                sortAccessoriesTooltip[i][key]?.value['Element_000']
                  ?.contentStr['Element_001']?.contentStr,
              engrave3:
                sortAccessoriesTooltip[i][key]?.value['Element_000']
                  ?.contentStr['Element_002']?.contentStr,
            });
          }
        }
      }

      // 팔찌
      if (i === sortAccessoriesTooltip.length) {
        for (let key in sortAccessoriesTooltip[i + 1]) {
          if (sortAccessoriesTooltip[i + 1][key].type === 'ItemPartBox') {
            filterValue.push({
              effect: sortAccessoriesTooltip[i + 1][key].value['Element_001'],
            });
          }
        }
      }

      filterTooltip.push({
        tooltip: filterValue,
      });
    }

    const removeSpecificString = (effect) => {
      return effect
        ?.replace(/(<([^>]+)>|\[|\]|<BR>)/gi, '')
        .replace(/(활성도\s*\+\s*\d+)/gi, '$1 ')
        .replace(/활성도\s+/gi, '');
    };

    const getEngravingEffect = (tooltip, index, number) => {
      if (Object.keys(tooltip).length === 2) {
        index -= 1;
      }
      const tooptipValue =
        number === 1
          ? tooltip[index]?.engrave1
          : number === 2
          ? tooltip[index]?.engrave2
          : tooltip[index]?.engrave3;
      return removeSpecificString(tooptipValue);
    };

    for (let i = 0; i < filterTooltip.length; i++) {
      const effectBR = filterTooltip[i].tooltip[1]?.effect?.split('<BR>');

      const engrave1 = getEngravingEffect(filterTooltip[i].tooltip, 2, 1);
      const engrave2 = getEngravingEffect(filterTooltip[i].tooltip, 2, 2);
      const engrave3 = getEngravingEffect(filterTooltip[i].tooltip, 2, 3);

      const breceletEffect = filterTooltip[
        filterTooltip.length - 1
      ].tooltip[0]?.effect
        ?.replace(/<\/?img[^>]*>/g, '')
        .replace(/undefined/g, '');

      let effectsplitBR = breceletEffect?.split('<BR>');

      if (effectsplitBR) {
        for (let j = 0; j < effectsplitBR.length; j++) {
          if (effectsplitBR[j].includes('[')) {
            const name = effectsplitBR[j].split('</FONT>]');
            effectsplitBR[j] = {
              name: name[0].replace('[', '').replace("<FONT COLOR=''>", ''),
              effect: name[1],
            };
          }

          // 팔찌효과 설명이 string이고, font태그가 들어가면 정규표현식을 이용해 추출함.
          if (
            typeof effectsplitBR[j] === 'string' &&
            effectsplitBR[j].includes('</FONT>')
          ) {
            effectsplitBR[j] = effectsplitBR[j].replace(/<\/?FONT[^>]*>/gi, '');
            // 팔찌 효과 이름이 특수효과면 name/effect로 객체로 나눠놨으므로 효과의 effect가 string이고 font태그가 들어가면 추출.
          } else if (
            typeof effectsplitBR[j].effect === 'string' &&
            effectsplitBR[j].effect.includes('</FONT>')
          ) {
            effectsplitBR[j].effect = effectsplitBR[j].effect.replace(
              /<\/?FONT[^>]*>/gi,
              ''
            );
          }
        }
      }

      if (i !== filterTooltip.length - 1) {
        accessoriesEffectTooltip.push({
          characteristic: effectBR,
          engrave1,
          engrave2,
          engrave3,
        });
      } else {
        accessoriesEffectTooltip.push({ breceletEffect: effectsplitBR });
      }
    }
  }

  const equipmentList = [
    {
      Type: '투구',
      Tooltip: '머리장식',
      ItemName: equipment && equipment[1].Name,
      TooltipValue: equipmentEffectTooltip[0],
    },
    {
      Type: '어깨',
      Tooltip: '견갑',
      ItemName: equipment && equipment[5].Name,
      TooltipValue: equipmentEffectTooltip[1],
    },
    {
      Type: '상의',
      Tooltip: '상의',
      ItemName: equipment && equipment[2].Name,
      TooltipValue: equipmentEffectTooltip[2],
    },
    {
      Type: '하의',
      Tooltip: '하의',
      ItemName: equipment && equipment[3].Name,
      TooltipValue: equipmentEffectTooltip[3],
    },
    {
      Type: '장갑',
      Tooltip: '장갑',
      ItemName: equipment && equipment[4].Name,
      TooltipValue: equipmentEffectTooltip[4],
    },
    {
      Type: '무기',
      ItemName: equipment && equipment[0].Name,
      TooltipValue: equipmentEffectTooltip[5],
    },
  ];

  const accessoriesList = [
    {
      Type: '목걸이',
      ItemName: equipment && equipment[6].Name,
      TooltipValue: accessoriesEffectTooltip[0],
    },
    {
      Type: '귀걸이',
      ItemName: equipment && equipment[7].Name,
      TooltipValue: accessoriesEffectTooltip[1],
    },
    {
      Type: '귀걸이',
      ItemName: equipment && equipment[8].Name,
      TooltipValue: accessoriesEffectTooltip[2],
    },
    {
      Type: '반지',
      ItemName: equipment && equipment[9].Name,
      TooltipValue: accessoriesEffectTooltip[3],
    },
    {
      Type: '반지',
      ItemName: equipment && equipment[10].Name,
      TooltipValue: accessoriesEffectTooltip[4],
    },
    {
      Type: '어빌리티 스톤',
      ItemName: equipment && equipment[11].Name,
      TooltipValue: accessoriesEffectTooltip[5],
    },
    {
      Type: '팔찌',
      ItemName: equipment && equipment[12].Name,
      TooltipValue: accessoriesEffectTooltip[6],
    },
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

  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return (
    <div>
      {(isPc || isTablet) && (
        <EquipmentWrap>
          <FlexWrap>
            <EquipmentInner>
              <EquipmentDetail
                equipment={equipment}
                equipmentList={equipmentList}
                sortEquipmentTooltip={sortEquipmentTooltip}
              />
              <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
              />
            </EquipmentInner>
            <AccessoriesInner>
              <AccessoriesDetail
                accessoriesList={accessoriesList}
                filterAccessories={filterAccessories}
                sortAccessoriesTooltip={sortAccessoriesTooltip}
                stoneAndBracelet={stoneAndBracelet}
                breceletEffectList={breceletEffectList}
                stoneIndex={stoneIndex}
              />
            </AccessoriesInner>
          </FlexWrap>
        </EquipmentWrap>
      )}
      {isMobile && (
        <EquipmentWrap>
          <FlexWrap>
            <div style={{ margin: '0 auto' }}>
              <EquipmentInner>
                <EquipmentDetail
                  equipment={equipment}
                  equipmentList={equipmentList}
                  sortEquipmentTooltip={sortEquipmentTooltip}
                />
              </EquipmentInner>
            </div>
            <hr width="100%" color="#292e33" size="2" />
            <div style={{ margin: '0 auto' }}>
              <AccessoriesInner>
                <AccessoriesDetail
                  accessoriesList={accessoriesList}
                  filterAccessories={filterAccessories}
                  sortAccessoriesTooltip={sortAccessoriesTooltip}
                  stoneAndBracelet={stoneAndBracelet}
                  breceletEffectList={breceletEffectList}
                  stoneIndex={stoneIndex}
                />
              </AccessoriesInner>
            </div>
            <div style={{ margin: '0 auto' }}>
              <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
              />
            </div>
          </FlexWrap>
        </EquipmentWrap>
      )}
    </div>
  );
};

export default CharacterEquipmentPart;

const EquipmentWrap = styled.div`
  width: auto;
  height: auto;
  background: #181c1e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;

  @media ${(props) => props.theme.mobile} {
    padding: 0 0 10px;
  }

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

const EquipmentInner = styled.div`
  min-width: 200px;
  max-width: 312px;
  display: flex;
  flex-direction: column;
  margin: 0 35px;
  justify-content: space-between;
  position: relative;
  height: auto;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    padding: 0;
  }

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

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }

        .name {
          font-size: 13px;
        }
      }
    }
  }
`;

const AccessoriesInner = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

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

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }

        .name {
          font-size: 13px;
        }
      }
    }
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;

    .mount {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
  }
`;
