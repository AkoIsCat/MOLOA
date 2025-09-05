import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { arcPassiveDivision } from '../../../../../utils/arcPassiveDivision';

import styled from 'styled-components';
import EquipmentDetail from './EquipmentDetail';
import MountedEngraving from './MountedEngraving';
import AccessoriesDetail from './AccessoriesDetail';
import Loading from '../../../../UI/Loading';
import { elixirEffectDivision } from '../../../../../utils/elixirEffectDivision';
import removeTag from '../../../../../utils/removeTag';
import { sortEquipment } from '../../../../../utils/equipment/sortEquipment';
import { equipmentSummary } from '../../../../../utils/equipment/equipmentSummary';
import { accessoriesSummary } from '../../../../../utils/accessories/accessoriesSummary';
import { StoneSummary } from '../../../../../utils/stone/StoneSummary';
import { braceletSummary } from '../../../../../utils/bracelet/braceletSummary';

const CharacterEquipmentPart = ({ equipment, engraving, arkpassive }) => {
  // const [sortedEquipment, setSortedEquipment] = useState();
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  // 장비 순서 정렬
  const sortedEquipment = useMemo(
    () => (equipment ? sortEquipment(equipment) : undefined),
    [equipment]
  );
  // 장비 필요 데이터 가공
  const equipmentData = useMemo(
    () => equipmentSummary(sortedEquipment),
    [sortedEquipment]
  );

  const accessories = useMemo(() => accessoriesSummary(equipment), [equipment]);
  const stone = useMemo(() => StoneSummary(equipment), [equipment]);
  const bracelet = useMemo(() => braceletSummary(equipment), [equipment]);

  console.log('equipmentData', equipmentData);
  console.log('accessoriesData', accessories);
  console.log('stone', stone);
  console.log('bracelet', bracelet);

  if (engraving === null) {
    return null;
  }

  if (!equipment) {
    return <Loading />;
  }

  console.log(equipment, 'equipment');

  // 장비들끼리 모으는 함수(투,어,상,하,장,무)
  // 악세들끼리 모으는 함수
  // 장비 정보 추출
  // 1. 기본, 추가효과, 세트레벨 o
  // 2. 엘릭서 o
  // 3. 초월 o
  // 4. 상급 재련 o
  // 5. 무기 이름 o
  // 6. 무기 등급 o
  // 7. 부위 이름 o
  // 8. 품질 o

  // 악세 정보 추출
  // 1. 악세 이름 o
  // 2. 악세 품질 "ItemTitle" o
  // 3. 악세 효과 "ItemPartBox" o
  // 4. 깨달음 수치 "ItemPartBox" o
  // 5. 악세 등급 o
  // 6. 기본 효과 "ItemPartBox" o
  // 7. 악세 부위 o

  // 어빌리티 스톤
  // 돌 이름 o
  // 티어(고대 어빌리티 스톤 항목도 같이) "ItemTitle" o
  // 기본 효과 "ItemPartBox" o
  // 세공 단계 보너스 "ItemPartBox" o
  // 활성화 각인 "IndentStringGroup" o
  // 감소 "IndentStringGroup" o

  // 팔찌
  // 팔찌 이름 o
  // 팔찌 티어 (어빌리티 스톤과 동일) "ItemTitle" o
  // 팔찌 효과 "ItemPartBox" o

  // 엘릭서, 초월 합계 함수 새로 작성하기

  // todo
  // 보석
  // 트포, 스킬탭 트포 레벨
  // 보유 캐릭터
  // 아이템 레벨, 전투력
  // 아크그리드
  // 전 레벨대 아크패시브 적용 이후 접속한 적이 없는 캐릭터는 안내 문구 or 아무것도 안보여주기
  // 고칠거 개많고..

  // const sortAccessoriesTooltip = equipmentTooltip.slice(6, 13);

  // // 악세 정보 추출
  // if (sortAccessoriesTooltip[0] !== undefined) {
  //   const filterTooltip = [];
  //   for (let i = 0; i < sortAccessoriesTooltip.length; i++) {
  //     const filterValue = [];

  //     // 노앜패
  //     if (!arkpassive?.IsArkPassive) {
  //       if (i !== sortAccessoriesTooltip.length) {
  //         // 특성
  //         for (let key in sortAccessoriesTooltip[i]) {
  //           if (sortAccessoriesTooltip[i][key].type === 'ItemPartBox') {
  //             filterValue.push({
  //               effect: sortAccessoriesTooltip[i][key].value['Element_001'],
  //             });
  //           }
  //         }

  //         // 각인
  //         for (let key in sortAccessoriesTooltip[i]) {
  //           if (
  //             sortAccessoriesTooltip[i][key].type === 'IndentStringGroup' &&
  //             sortAccessoriesTooltip[i][key].value !== null
  //           ) {
  //             filterValue.push({
  //               engrave1:
  //                 sortAccessoriesTooltip[i][key]?.value['Element_000']
  //                   ?.contentStr['Element_000']?.contentStr,
  //               engrave2:
  //                 sortAccessoriesTooltip[i][key]?.value['Element_000']
  //                   ?.contentStr['Element_001']?.contentStr,
  //               engrave3:
  //                 sortAccessoriesTooltip[i][key]?.value['Element_000']
  //                   ?.contentStr['Element_002']?.contentStr,
  //             });
  //           }
  //         }
  //       }
  //     }

  //     // 앜패
  //     if (arkpassive?.IsArkPassive) {
  //       if (i !== sortAccessoriesTooltip.length - 1) {
  //         for (let key in sortAccessoriesTooltip[i]) {
  //           const itemArray = [];
  //           // 악세 이름
  //           if (sortAccessoriesTooltip[i][key].type === 'NameTagBox') {
  //             itemArray.push({
  //               Name: removeTag(
  //                 removeTag(sortAccessoriesTooltip[i][key].value, 'FONT'),
  //                 'P'
  //               ),
  //             });
  //           }

  //           // 악세 품질, 등급
  //           if (sortAccessoriesTooltip[i][key].type === 'ItemTitle') {
  //             itemArray.push({
  //               quality: sortAccessoriesTooltip[i][key].value.qualityValue,
  //               grade: removeTag(
  //                 sortAccessoriesTooltip[i][key].value.leftStr0,
  //                 'FONT'
  //               ).split(' ')[0],
  //             });
  //           }

  //           // 악세 효과(기본, 연마, 깨포)
  //           if (sortAccessoriesTooltip[i][key].type === 'ItemPartBox') {
  //             itemArray.push({
  //               effects: removeTag(
  //                 removeTag(
  //                   sortAccessoriesTooltip[i][key].value['Element_001'],
  //                   'FONT'
  //                 ),
  //                 'img'
  //               ),
  //             });
  //           }

  //           // 어빌리티 스톤(각인)
  //           if (
  //             sortAccessoriesTooltip[i][key].type === 'ItemTitle' &&
  //             sortAccessoriesTooltip[i][key].value.leftStr0.includes(
  //               '어빌리티 스톤'
  //             )
  //           ) {
  //             for (let key in sortAccessoriesTooltip[i]) {
  //               if (
  //                 sortAccessoriesTooltip[i][key].type === 'IndentStringGroup' &&
  //                 sortAccessoriesTooltip[i][key].value
  //               ) {
  //                 const commonness =
  //                   sortAccessoriesTooltip[i][key].value['Element_000'];
  //                 const engrave1 = removeTag(
  //                   commonness.contentStr['Element_000'].contentStr,
  //                   'FONT'
  //                 ).replace('<BR>', '');
  //                 const engrave2 = removeTag(
  //                   commonness.contentStr['Element_001'].contentStr,
  //                   'FONT'
  //                 ).replace('<BR>', '');
  //                 const engrave3 = removeTag(
  //                   commonness.contentStr['Element_002'].contentStr,
  //                   'FONT'
  //                 ).replace('<BR>', '');

  //                 itemArray.push({ engrave1, engrave2, engrave3 });
  //               }
  //             }
  //           }

  //           itemArray && filterValue.push(...itemArray);
  //         }
  //       }
  //     }

  //     // 팔찌
  //     if (i === sortAccessoriesTooltip.length - 1) {
  //       const itemArray = [];
  //       for (let key in sortAccessoriesTooltip[i]) {
  //         if (sortAccessoriesTooltip[i][key].type === 'ItemPartBox') {
  //           itemArray.push(
  //             removeTag(
  //               removeTag(
  //                 sortAccessoriesTooltip[i][key].value['Element_001'],
  //                 'FONT'
  //               ),
  //               'img'
  //             ).split('<BR>')
  //           );
  //         }
  //       }
  //       itemArray && filterValue.push(...itemArray);
  //     }

  //     filterTooltip.push({
  //       tooltip: filterValue,
  //     });
  //   }

  //   const removeSpecificString = (effect) => {
  //     return effect
  //       ?.replace(/(<([^>]+)>|\[|\]|<BR>)/gi, '')
  //       .replace(/(활성도\s*\+\s*\d+)/gi, '$1 ')
  //       .replace(/활성도\s+/gi, '');
  //   };

  //   const getEngravingEffect = (tooltip, index, number) => {
  //     if (Object.keys(tooltip).length === 2) {
  //       index -= 1;
  //     }
  //     const tooptipValue =
  //       number === 1
  //         ? tooltip[index]?.engrave1
  //         : number === 2
  //         ? tooltip[index]?.engrave2
  //         : tooltip[index]?.engrave3;
  //     return removeSpecificString(tooptipValue);
  //   };

  //   for (let i = 0; i < filterTooltip.length; i++) {
  //     const effectBR = filterTooltip[i].tooltip[1]?.effect?.split('<BR>');
  //     // 어빌리티 스톤 각인, 활성화 수치를 따로 분리해주는 함수 getEngravingEffects, revemoSpecificString
  //     const engrave1 = getEngravingEffect(filterTooltip[i].tooltip, 2, 1);
  //     const engrave2 = getEngravingEffect(filterTooltip[i].tooltip, 2, 2);
  //     const engrave3 = getEngravingEffect(filterTooltip[i].tooltip, 2, 3);

  //     const breceletEffect = filterTooltip[
  //       filterTooltip.length - 1
  //     ].tooltip[0]?.effect
  //       ?.replace(/<\/?img[^>]*>/g, '')
  //       .replace(/undefined/g, '');

  //     let effectsplitBR = breceletEffect?.split('<BR>');

  //     if (effectsplitBR) {
  //       for (let j = 0; j < effectsplitBR.length; j++) {
  //         if (effectsplitBR[j].includes('[')) {
  //           const name = effectsplitBR[j].split('</FONT>]');
  //           effectsplitBR[j] = {
  //             name: removeTag(name[0], 'FONT').replace('[', ''),
  //             effect: name[1],
  //           };
  //         }

  //         // 팔찌효과 설명이 string이고, font태그가 들어가면 정규표현식을 이용해 추출함.
  //         if (
  //           typeof effectsplitBR[j] === 'string' &&
  //           effectsplitBR[j].includes('</FONT>')
  //         ) {
  //           effectsplitBR[j] = effectsplitBR[j].replace(removeFontTagRegex, '');
  //           // 팔찌 효과 이름이 특수효과면 name/effect로 객체로 나눠놨으므로 효과의 effect가 string이고 font태그가 들어가면 추출.
  //         } else if (
  //           typeof effectsplitBR[j].effect === 'string' &&
  //           effectsplitBR[j].effect.includes('</FONT>')
  //         ) {
  //           effectsplitBR[j].effect = effectsplitBR[j].effect.replace(
  //             removeFontTagRegex,
  //             ''
  //           );
  //         }
  //       }
  //     }

  //     if (arkpassive?.IsArkPassive) {
  //       // 악세
  //       if (i < filterTooltip.length - 2) {
  //         accessoriesEffectTooltip.push({
  //           defaultEffect: filterTooltip[i]?.tooltip[2]?.effects,
  //           trainingEffect: filterTooltip[i]?.tooltip[3]?.effects,
  //           point: filterTooltip[i].tooltip[4]?.effects,
  //           grade: filterTooltip[i].tooltip[1]?.grade,
  //           quality: filterTooltip[i].tooltip[1]?.quality,
  //         });
  //         // 돌
  //       } else if (i !== filterTooltip.length - 1) {
  //         accessoriesEffectTooltip.push({
  //           defaultEffect: filterTooltip[i]?.tooltip[3]?.effects,
  //           plusEffect: filterTooltip[i]?.tooltip[4]?.effects,
  //           engrave1,
  //           engrave2,
  //           engrave3,
  //         });
  //         // 팔찌
  //       } else {
  //         accessoriesEffectTooltip.push({
  //           breceletEffect: filterTooltip[i].tooltip[0],
  //           point: filterTooltip[i].tooltip[1],
  //         });
  //       }
  //     }

  //     if (!arkpassive?.IsArkPassive) {
  //       if (i !== filterTooltip.length - 1) {
  //         accessoriesEffectTooltip.push({
  //           characteristic: effectBR,
  //           engrave1,
  //           engrave2,
  //           engrave3,
  //         });
  //       } else {
  //         accessoriesEffectTooltip.push({ breceletEffect: effectsplitBR });
  //       }
  //     }
  //   }
  // }

  // const accessoriesList = [
  //   {
  //     Type: '목걸이',
  //     ItemName: equipment && equipment[6].Name,
  //     TooltipValue: accessoriesEffectTooltip[0],
  //   },
  //   {
  //     Type: '귀걸이',
  //     ItemName: equipment && equipment[7].Name,
  //     TooltipValue: accessoriesEffectTooltip[1],
  //   },
  //   {
  //     Type: '귀걸이',
  //     ItemName: equipment && equipment[8].Name,
  //     TooltipValue: accessoriesEffectTooltip[2],
  //   },
  //   {
  //     Type: '반지',
  //     ItemName: equipment && equipment[9].Name,
  //     TooltipValue: accessoriesEffectTooltip[3],
  //   },
  //   {
  //     Type: '반지',
  //     ItemName: equipment && equipment[10].Name,
  //     TooltipValue: accessoriesEffectTooltip[4],
  //   },
  //   {
  //     Type: '어빌리티 스톤',
  //     ItemName: equipment && equipment[11]?.Name,
  //     TooltipValue: accessoriesEffectTooltip[5],
  //   },
  //   {
  //     Type: '팔찌',
  //     ItemName:
  //       equipment && equipment[12] !== undefined ? equipment[12].Name : -1,
  //     TooltipValue: accessoriesEffectTooltip[6],
  //   },
  // ];
  // const stoneAndBracelet = [];
  // // equipment에서 스톤과 팔찌를 추출한다.
  // if (equipment) {
  //   for (const key in equipment) {
  //     if (
  //       equipment[key].Type !== '무기' &&
  //       equipment[key].Type !== '투구' &&
  //       equipment[key].Type !== '상의' &&
  //       equipment[key].Type !== '하의' &&
  //       equipment[key].Type !== '장갑' &&
  //       equipment[key].Type !== '어깨' &&
  //       equipment[key].Type !== '나침반' &&
  //       equipment[key].Type !== '부적' &&
  //       equipment[key].Type !== '목걸이' &&
  //       equipment[key].Type !== '귀걸이' &&
  //       equipment[key].Type !== '반지'
  //     ) {
  //       stoneAndBracelet.push({ ...equipmentTooltip[key] });
  //     }
  //   }
  // }

  // let stoneIndex = -1;
  // let braceletIndex = -1;
  // const breceletEffectList = [];
  // // 팔찌효과 추출
  // if (stoneAndBracelet) {
  //   // 어빌리티 스톤 각인 활성화가 들어있는 인덱스를 탐색하는 for..in문
  //   for (const key in stoneAndBracelet[0]) {
  //     if (stoneAndBracelet[0][key].type === 'IndentStringGroup') {
  //       stoneIndex = key;
  //       break;
  //     }
  //   }
  //   // 팔찌에서 팔찌 효과가 들어있는 인덱스를 탐색
  //   if (stoneAndBracelet[1] !== undefined) {
  //     for (const key in stoneAndBracelet[1]) {
  //       if (stoneAndBracelet[1][key].type === 'ItemPartBox') {
  //         braceletIndex = key;
  //         break;
  //       }
  //     }
  //     const braceletEffect =
  //       stoneAndBracelet &&
  //       stoneAndBracelet[1] !== undefined &&
  //       stoneAndBracelet[1][braceletIndex].value['Element_001'];

  //     const braceletElements = braceletEffect.split('<BR>');
  //     const regularExpressionResult = [];
  //     for (let i = 0; i < braceletElements.length; i++) {
  //       const text = braceletElements[i]
  //         .replace(/<[^>]+>/g, '')
  //         .replace(/\[|\]/g, '')
  //         .replace(/['"]/g, '')
  //         .trim();

  //       if (text[text.length - 1] === ')' || !isNaN(text[text.length - 1])) {
  //         regularExpressionResult.push(text);
  //         const textSplit = text.split(':');

  //         if (textSplit.length > 1) {
  //           breceletEffectList.push({
  //             text: textSplit[0],
  //             description: textSplit[1],
  //           });
  //         } else {
  //           const textSplice = text.split(' ');
  //           breceletEffectList.push({
  //             text: textSplice[0],
  //             description: textSplice[1],
  //           });
  //         }
  //       } else {
  //         regularExpressionResult.concat(text);
  //       }
  //     }
  //   }
  // }

  // // 장착 각인

  // const mountedEngraving = engraving && engraving.Engravings;
  // const mountedEngravingTooltip = [];

  // // 문자열로 되어있는 객체를 객체로 변환
  // mountedEngraving &&
  //   mountedEngraving.map((item) =>
  //     mountedEngravingTooltip.push(JSON.parse(item.Tooltip))
  //   );

  // // 장착된 각인 활성화를 추출한다.
  // const mountedEngravingItem = mountedEngravingTooltip
  //   .map((obj) => obj.Element_001)
  //   .filter((obj) => obj.type === 'EngraveSkillTitle')
  //   .map((obj) => obj.value.leftText);

  return (
    <div>
      리팩토링중
      {(isPc || isTablet) && (
        <EquipmentWrap>
          <FlexWrap>
            <EquipmentInner>
              <EquipmentDetail equipment={equipmentData} />
              {/* <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
                elixirTotalLevel={
                  equipment &&
                  equipmentList[5]?.TooltipValue?.elixirTotalLevel > 0
                    ? equipmentList[5]?.TooltipValue?.elixirTotalLevel
                    : 0
                }
                activateElixir={equipmentList[5]?.TooltipValue?.activateElixir}
                arkpassive={arkpassive}
              /> */}
            </EquipmentInner>
            <AccessoriesInner>
              <AccessoriesDetail
                // accessoriesList={accessoriesList}
                accessories={accessories}
                equipment={equipment}
                // arkpassive={arkpassive}
                // sortAccessoriesTooltip={sortAccessoriesTooltip}
                // stoneAndBracelet={stoneAndBracelet}
                // breceletEffectList={breceletEffectList}
                // stoneIndex={stoneIndex}
                // transcendenceTotalNum={
                //   equipment &&
                //   equipmentList[5]?.TooltipValue?.transcendenceTotalNum
                // }
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
                <EquipmentDetail equipment={equipmentData} />
              </EquipmentInner>
            </div>
            <hr width="100%" color="#292e33" size="2" />
            <div style={{ margin: '0 auto' }}>
              <AccessoriesInner>
                <AccessoriesDetail
                  // accessoriesList={accessoriesList}
                  accessories={accessories}
                  equipment={equipment}
                  // sortAccessoriesTooltip={sortAccessoriesTooltip}
                  // stoneAndBracelet={stoneAndBracelet}
                  // breceletEffectList={breceletEffectList}
                  // stoneIndex={stoneIndex}
                  // arkpassive={arkpassive}
                  // transcendenceTotalNum={
                  //   equipment &&
                  //   equipmentList[5]?.TooltipValue.transcendenceTotalNum
                  //     .length === 0
                  //     ? 0
                  //     : equipmentList[5]?.TooltipValue.transcendenceTotalNum
                  // }
                />
              </AccessoriesInner>
            </div>
            {/* <div style={{ margin: '0 auto' }}>
              <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
                elixirTotalLevel={
                  equipment &&
                  equipmentList[5]?.TooltipValue.elixirTotalLevel !== isNaN
                    ? 0
                    : equipmentList[5]?.TooltipValue.elixirTotalLevel
                }
                activateElixir={equipmentList[5]?.TooltipValue.activateElixir}
              />
            </div> */}
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

    .itemPartBox {
      margin-bottom: 0;
      margin-top: 1rem;
    }

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        font-size: 15px;
        color: #fff;
        margin: 5px;
      }

      .item {
        margin: 0 2px;
      }

      .single {
        color: #85af3a;
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
