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
import { sortEquipment } from '../../../../../utils/sortEquipment';
import { equipmentBasicEffect } from '../../../../../utils/equipmentBasicEffect';

const CharacterEquipmentPart = ({ equipment, engraving, arkpassive }) => {
  const [sortedEquipment, setSortedEquipment] = useState();
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  useEffect(() => {
    if (equipment) {
      setSortedEquipment(sortEquipment(equipment));
    }
  }, [equipment]);

  const basicEffect = useMemo(
    () => equipmentBasicEffect(sortedEquipment),
    [sortedEquipment]
  );
  console.log(basicEffect);

  if (engraving === null) {
    return null;
  }

  if (!equipment) {
    return <Loading />;
  }

  console.log(equipment, 'equipment');
  console.log(sortedEquipment);

  // 장비들끼리 모으는 함수(투,어,상,하,장,무)
  // 악세들끼리 모으는 함수
  // 장비 정보 추출
  // 1. 기본, 추가효과, 세트레벨
  // 2. 엘릭서
  // 3. 초월
  // 4. 상급 재련

  // 악세 정보 추출
  // 일단 냅둬봐 장비 먼저 리팩토링

  // const equipmentTooltip = [];

  // for (const item in equipment) {
  //   equipmentTooltip.push(JSON.parse(equipment[item].Tooltip));
  // }

  // const sortEquipmentTooltip = [
  //   equipmentTooltip[1],
  //   equipmentTooltip[5],
  //   equipmentTooltip[2],
  //   equipmentTooltip[3],
  //   equipmentTooltip[4],
  //   equipmentTooltip[0],
  // ];

  // const sortAccessoriesTooltip = equipmentTooltip.slice(6, 13);

  // // 장비 툴팁 추출
  // const equipmentEffectTooltip = [];
  // const accessoriesEffectTooltip = []; // 악세 툴팁

  // // 자주 쓰이는 정규표현식
  // const removeFontTagRegex = /<\/?FONT[^>]*>/g;
  // const removeLevelRegex = /.*Lv\.(\d+).*/;

  // // 장비 정보 추출
  // if (sortEquipmentTooltip[0] !== undefined) {
  //   const filterTooltip = [];
  //   for (let i = 0; i <= sortEquipmentTooltip.length - 1; i++) {
  //     const filterValue = [];
  //     // console.log(sortEquipmentTooltip, 'tt', i);
  //     // 기본, 추가효과, 세트레벨
  //     for (let key in sortEquipmentTooltip[i]) {
  //       if (
  //         sortEquipmentTooltip[i][key] !== null &&
  //         sortEquipmentTooltip[i][key].type === 'ItemPartBox'
  //       ) {
  //         filterValue.push({
  //           effect: sortEquipmentTooltip[i][key].value['Element_001'],
  //         });
  //       }
  //     }
  //     // 엘릭서
  //     for (let _ in sortEquipmentTooltip[i]) {
  //       // console.log(
  //       //   sortEquipmentTooltip,
  //       //   i,
  //       //   tooltip,
  //       //   '장비툴팁',
  //       //   sortEquipmentTooltip[i]
  //       // );
  //       // 새롭게 엘릭서 데이터를 모아놓음. 이 이후에 어떻게 해야할지 고민.
  //       const tooltip2 = Object.values(sortEquipmentTooltip[i]).filter(
  //         (item) =>
  //           item?.type === 'IndentStringGroup' &&
  //           typeof item.value?.['Element_000']?.contentStr === 'object' &&
  //           Object.keys(item.value['Element_000'].contentStr).length === 2
  //       );
  //       // console.log('툴팁2', tooltip2, sortEquipmentTooltip[i], i);
  //       if (tooltip2 !== null) {
  //         // console.log('yes', tooltip2);
  //         const tooltipData = tooltip2 && tooltip2[0]?.value['Element_000'];
  //         const activateElixir =
  //           tooltip2 &&
  //           tooltipData[1]?.topStr.includes('단계') &&
  //           tooltipData[1]?.topStr
  //             .replace(removeFontTagRegex, '')
  //             .split('<br>')[1];
  //         filterValue.push({
  //           Elixir: tooltipData?.contentStr['Element_000']?.contentStr,
  //           Elixir2: tooltipData?.contentStr['Element_001']?.contentStr,
  //           activate: activateElixir,
  //         });
  //       }
  //       // console.log(filterValue, 'fv');
  //     }

  //     // 초월
  //     for (let key in sortEquipmentTooltip[i]) {
  //       const tooltip =
  //         sortEquipmentTooltip[i][key].value !== null &&
  //         sortEquipmentTooltip[i][key].value['Element_000'];
  //       if (
  //         tooltip !== false &&
  //         sortEquipmentTooltip[i][key].type === 'IndentStringGroup' &&
  //         Object.keys(sortEquipmentTooltip[i][key].value).length === 1 &&
  //         Object.keys(tooltip.contentStr).length >= 4 &&
  //         tooltip.topStr
  //       ) {
  //         const transcendence = tooltip.topStr;
  //         const transcendenceCount =
  //           tooltip.contentStr['Element_001'].contentStr;
  //         filterValue.push({
  //           transcendence,
  //           transcendenceCount,
  //         });
  //       }
  //     }

  //     // 상급 재련
  //     for (let key in sortEquipmentTooltip[i]) {
  //       const tooltip = sortEquipmentTooltip[i][key].value;
  //       if (typeof tooltip === 'string' && tooltip.includes('상급 재련')) {
  //         const level = tooltip
  //           .replace(removeFontTagRegex, '')
  //           .replace(/[^0-9]/g, '');
  //         filterValue.push({
  //           advancedReforging: +level,
  //         });
  //       }
  //     }
  //     // 각각의 아이템 정보
  //     for (let key in sortEquipmentTooltip[i]) {
  //       if (sortEquipmentTooltip[i][key].type === 'ItemTitle') {
  //         filterValue.push({
  //           itemName: sortEquipmentTooltip[i][key].value.leftStr0,
  //           quality: sortEquipmentTooltip[i][key].value.qualityValue,
  //           itemLevel: sortEquipmentTooltip[i][key].value.leftStr2,
  //         });
  //       }
  //     }

  //     filterTooltip.push({
  //       tooltip: filterValue,
  //     });
  //     // console.log(filterTooltip);
  //   }

  //   let sum1 = 0,
  //     sum2 = 0,
  //     totalSum = 0;
  //   let activateElixir = false;
  //   let transcendenceTotalNum = '';

  //   // 데이터를 추출한 filterValue를 이용해 더 세부적인 정보를 추출하고 최종 장비 tooltip 배열에 저장하는 함수
  //   const ExtractNeedEquipmentDataAndPush = (tooltipData) => {
  //     tooltipData.forEach((item, index) => {
  //       const splitBR = item.tooltip[0].effect.split('<BR>');
  //       const removeFont = item.tooltip[2]?.effect?.replace(
  //         removeFontTagRegex,
  //         ''
  //       );
  //       let elixir1, elixir2;
  //       const tier = arcPassiveDivision(item.tooltip);
  //       const transcendence = item.tooltip.filter((key) => key.transcendence);
  //       const transcendenceStep = transcendence[0]?.transcendence.replace(
  //         "<img src='emoticon_Transcendence_Grade'",
  //         '<img src="https://firebasestorage.googleapis.com/v0/b/lostark-bf0ba.appspot.com/o/transcendence.png?alt=media&token=cddea62b-27e1-489a-a571-07e8e43ff3bb"'
  //       );

  //       const transcendenceTotal = transcendence[0]?.transcendenceCount.replace(
  //         "<img src='emoticon_Transcendence_Grade'",
  //         '<img src="https://firebasestorage.googleapis.com/v0/b/lostark-bf0ba.appspot.com/o/transcendence.png?alt=media&token=cddea62b-27e1-489a-a571-07e8e43ff3bb"'
  //       );
  //       const transcendenceCount = transcendenceTotal
  //         ?.split('</img>')[1]
  //         .replace(/[^0-9]/g, '');

  //       if (transcendenceCount !== undefined) {
  //         transcendenceTotalNum = transcendenceCount;
  //       }
  //       if (
  //         item.tooltip &&
  //         activateElixir === false &&
  //         item.tooltip[4]?.activate !== undefined &&
  //         item.tooltip[0].effect.includes('공격력') === false
  //       ) {
  //         activateElixir = item.tooltip[4].activate;
  //       }

  //       if (index < filterTooltip.length - 1) {
  //         elixir1 = elixirEffectDivision(item, tier, 1);

  //         elixir2 = elixirEffectDivision(item, tier, 2);

  //         const elixir1Level =
  //           elixir1 &&
  //           elixir1 !== undefined &&
  //           parseInt(elixir1[0].replace(removeLevelRegex, '$1'));
  //         const elixir2Level =
  //           elixir2 &&
  //           elixir2 !== undefined &&
  //           parseInt(elixir2[0].replace(removeLevelRegex, '$1'));

  //         sum1 += elixir1Level !== undefined && elixir1Level;
  //         sum2 += elixir2Level !== undefined && elixir2Level;
  //       }

  //       totalSum = sum1 + sum2;

  //       const itemName = item.tooltip[item.tooltip.length - 1].itemName.replace(
  //         removeFontTagRegex,
  //         ''
  //       );

  //       const itemLevel = item.tooltip[
  //         item.tooltip.length - 1
  //       ].itemLevel.replace(removeFontTagRegex, '');

  //       const itemQuality = item.tooltip[item.tooltip.length - 1].quality;
  //       const advancedReforging = item.tooltip.filter(
  //         (key) => key.advancedReforging
  //       );

  //       if (index < 5) {
  //         equipmentEffectTooltip.push({
  //           physics: splitBR[0],
  //           magic: splitBR[1],
  //           characteristic: splitBR[2],
  //           health: splitBR[3],
  //           vitality: item.tooltip[1].effect,
  //           level: removeFont,
  //           itemName,
  //           itemLevel,
  //           itemQuality,
  //           elixir1,
  //           elixir2,
  //           transcendenceStep,
  //           transcendenceTotal,
  //           advancedReforging: advancedReforging[0]?.advancedReforging,
  //         });
  //       } else {
  //         equipmentEffectTooltip.push({
  //           offensePower: item.tooltip[0].effect,
  //           additionalDamage: item.tooltip[1].effect,
  //           level: removeFont,
  //           itemName,
  //           itemLevel,
  //           itemQuality,
  //           elixirTotalLevel: totalSum,
  //           activateElixir,
  //           transcendenceStep,
  //           transcendenceTotal,
  //           transcendenceTotalNum,
  //           advancedReforging: advancedReforging[0]?.advancedReforging,
  //         });
  //       }
  //     });
  //     return;
  //   };

  //   ExtractNeedEquipmentDataAndPush(filterTooltip);
  // }

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

  // const equipmentList = [
  //   {
  //     Type: '투구',
  //     Tooltip: '머리장식',
  //     ItemName: equipment[1].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[1].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[0],
  //   },
  //   {
  //     Type: '어깨',
  //     Tooltip: '견갑',
  //     ItemName: equipment[5].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[5].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[1],
  //   },
  //   {
  //     Type: '상의',
  //     Tooltip: '상의',
  //     ItemName: equipment[2].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[2].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[2],
  //   },
  //   {
  //     Type: '하의',
  //     Tooltip: '하의',
  //     ItemName: equipment[3].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[3].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[3],
  //   },
  //   {
  //     Type: '장갑',
  //     Tooltip: '장갑',
  //     ItemName: equipment[4].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[4].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[4],
  //   },
  //   {
  //     Type: '무기',
  //     ItemName: equipment[0].Name.replace(/[0-9]/g, '').replace('+', '').trim(),
  //     ItemEnforce: equipment[0].Name.replace(/[^0-9]/g, ''),
  //     TooltipValue: equipmentEffectTooltip[5],
  //   },
  // ];

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
      {/* {(isPc || isTablet) && (
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
                elixirTotalLevel={
                  equipment &&
                  equipmentList[5]?.TooltipValue?.elixirTotalLevel > 0
                    ? equipmentList[5]?.TooltipValue?.elixirTotalLevel
                    : 0
                }
                activateElixir={equipmentList[5]?.TooltipValue?.activateElixir}
                arkpassive={arkpassive}
              />
            </EquipmentInner>
            <AccessoriesInner>
              <AccessoriesDetail
                accessoriesList={accessoriesList}
                equipment={equipment}
                arkpassive={arkpassive}
                sortAccessoriesTooltip={sortAccessoriesTooltip}
                stoneAndBracelet={stoneAndBracelet}
                breceletEffectList={breceletEffectList}
                stoneIndex={stoneIndex}
                transcendenceTotalNum={
                  equipment &&
                  equipmentList[5]?.TooltipValue?.transcendenceTotalNum
                }
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
                  equipment={equipment}
                  sortAccessoriesTooltip={sortAccessoriesTooltip}
                  stoneAndBracelet={stoneAndBracelet}
                  breceletEffectList={breceletEffectList}
                  stoneIndex={stoneIndex}
                  arkpassive={arkpassive}
                  transcendenceTotalNum={
                    equipment &&
                    equipmentList[5]?.TooltipValue.transcendenceTotalNum
                      .length === 0
                      ? 0
                      : equipmentList[5]?.TooltipValue.transcendenceTotalNum
                  }
                />
              </AccessoriesInner>
            </div>
            <div style={{ margin: '0 auto' }}>
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
            </div>
          </FlexWrap>
        </EquipmentWrap>
      )} */}
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

      .item {
        margin: 0 2px;
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
