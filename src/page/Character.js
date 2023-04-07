import styled from 'styled-components';

import Aside from '../component/UI/Character/Side/Aside';
import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';
import { Container } from './Home';
import Avatar from '../component/UI/Character/Content/Avatar';

import { BsDot } from 'react-icons/bs';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';

const ContainerBox = styled(Container)`
  height: auto;
  position: relative;
`;

const Message = styled.div`
  width: 60vw;
  height: 10vh;
  background: #373e44;
  color: white;
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 1150px;
  height: auto;
  background: #1e2225;
  margin: 0 auto;
`;

const Section = styled.section`
  width: 820px;
  height: auto;
  background: #181c1e;
  float: right;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30px;
`;

// 네비
const Navigation = styled.nav`
  width: 354px;
  height: 41px;
  background: #292e33;
  margin: 25px 0 20px 30px;
  border-radius: 10px;
  display: flex;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const NavItem = styled.li`
  color: #fff;
  font-family: 'Nanum Gothic';
  width: auto;
  margin: 0;
  padding: 11px 9px;
  font-size: 16px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#40444f' : '')};
  border-radius: ${(props) =>
    props.borderFirst
      ? '10px 0 0 10px'
      : props.borderEnd
      ? '0 10px 10px 0'
      : ''};

  &:hover {
    background: #40444f;
  }
`;

const InnerSection = styled.div`
  width: 760px;
  height: auto;
  background: #292e33;
  padding: 30px 0;
  margin: 0 5px 0 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 컨텐츠 박스
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

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #181c1e;
  border-radius: 10px;
  padding: 10px 0 35px 0px;
  margin: 20px 0 0 0;
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

const GemsItemWrap = styled.div`
  position: relative;
  width: auto;
  height: 50px;
  border-radius: 10px 10px 0 0;
  margin: 0px 5px;
  padding: 10px 0 10px 0;

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
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

const lostArkKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMjc0MTYifQ.MIy7jDe9w81yjIX8Zh4VgGCVH2IR-vz7CGF6Ceh0zdc-5HfnY31XrIwJ86r_nz1ImkS-dPxW7bO_8AaZmuII6sbdJo_dWer-kbkpA5kx1aIrtGqpvhY_fWtXY-_wmWhZrdAFJTtB8t6yVHIua_ceA7CJWM0Bn1sQ6SNWxCbq9fsHb6BGRayKuJ5JV-qAIVC5VjNyVC4iIyAdJetDWgu0c7DTR_pVOeWHbsX-CbAqqKXvRPoNII1aop4Ioa9Sbhb99iD-BuA7pfn-_D-m6axvO0-0luLu4UbwXhrE5jEVPNs7Oxf215AqosVjFb5ObX74iGzf6vyt8YqjL08UkLS8NQ';

const Character = () => {
  const [isExist, setIsExist] = useState();
  const [profile, setProfile] = useState(); // 기본 스탯
  const [equipment, setEquipment] = useState(); // 장비
  const [avatars, setAvatars] = useState(); // 아바타
  const [combatSkills, setCombatSkills] = useState(); // 스킬
  const [engraving, setEngraving] = useState(); // 각인
  const [cards, setCards] = useState(); // 카드
  const [gems, setGems] = useState(); // 보석
  // const [colosseums, setColosseums] = useState(); // PVP
  // const [collectibles, setCollectibles] = useState(); // 수집품

  const [currentTab, setCurrentTab] = useState(0);

  const { id } = useParams();
  const commonCharacterUrl = `https://developer-lostark.game.onstove.com/armories/characters`;
  const loadCharacterUrl = `https://developer-lostark.game.onstove.com/characters`;

  useEffect(() => {
    // 캐릭터 존재 여부(원정대 캐릭터)
    const loadCharacterTrue = async () => {
      try {
        const response = await fetch(`${loadCharacterUrl}/${id}/siblings`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        if (responseData) {
          setIsExist(true);
        } else {
          setIsExist(false);
        }
      } catch (err) {
        console.log('LostArk Character True of False error!!');
      }
    };

    const loadProfile = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setProfile(responseData);
      } catch (err) {
        console.log('LostArk Profile error!!');
      }
    };

    const loadEquipment = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/equipment`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setEquipment(responseData);
      } catch (err) {
        console.log('LostArk Equipment error!!');
      }
    };

    const loadAvatars = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/avatars`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setAvatars(responseData);
      } catch (err) {
        console.log('LostArk Avatars error!!');
      }
    };

    const loadCombatSkills = async () => {
      try {
        const response = await fetch(
          `${commonCharacterUrl}/${id}/combat-skills`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `bearer ${lostArkKey}`,
            },
          }
        );
        const responseData = await response.json();

        setCombatSkills(responseData);
      } catch (err) {
        console.log('LostArk CombatSkills error!!');
      }
    };

    const loadEngravings = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/engravings`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setEngraving(responseData);
      } catch (err) {
        console.log('LostArk Engravings error!!');
      }
    };

    const loadCards = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/cards`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setCards(responseData);
      } catch (err) {
        console.log('LostArk Cards error!!');
      }
    };

    const loadGems = async () => {
      try {
        const response = await fetch(`${commonCharacterUrl}/${id}/gems`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        setGems(responseData);
      } catch (err) {
        console.log('LostArk Gems error!!');
      }
    };

    // const loadColosseums = async () => {
    //   try {
    //     const response = await fetch(`${commonCharacterUrl}/${id}/colosseums`, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         authorization: `bearer ${lostArkKey}`,
    //       },
    //     });
    //     const responseData = await response.json();

    //     setColosseums(responseData);
    //   } catch (err) {
    //     console.log('LostArk Colosseumn error!!');
    //   }
    // };

    // const loadCollectibles = async () => {
    //   try {
    //     const response = await fetch(
    //       `${commonCharacterUrl}/${id}/collectibles`,
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           authorization: `bearer ${lostArkKey}`,
    //         },
    //       }
    //     );
    //     const responseData = await response.json();

    //     setCollectibles(responseData);
    //   } catch (err) {
    //     console.log('LostArk Collectibles error!!');
    //   }
    // };

    loadCharacterTrue();
    loadProfile();
    loadEquipment();
    loadAvatars();
    loadCombatSkills();
    loadEngravings();
    loadCards();
    loadGems();
    // loadColosseums();
    // loadCollectibles();
  }, [loadCharacterUrl, commonCharacterUrl, id]);

  // console.log(gems);

  // ------------------------- 장비 탭

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

  // ------------------------- 요까지 장비 정보 조회

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

  // 보석
  const gemsList = [];
  const extinction = []; // 멸화
  const prominence = []; // 홍염

  if (gems) {
    const gemsRegex = /<FONT[^>]*>(.*?)<\/FONT>/;
    const effectRegex = /<FONT COLOR='#[^>]+>([^<]+)<\/FONT>\s*([^\n]+)/;

    // 필요한 데이터만 추출
    for (let i = 0; i < gems.Gems.length; i++) {
      const tooltip = JSON.parse(gems.Gems[i].Tooltip)['Element_004'].value[
        'Element_001'
      ];

      const event_tooltip = JSON.parse(gems.Gems[i].Tooltip)['Element_005']
        .value['Element_001'];
      const skillEffect_event = !tooltip && event_tooltip.match(effectRegex);
      const skillEffect = tooltip && tooltip.match(effectRegex);

      skillEffect_event &&
        gemsList.push({
          name: gems.Gems[i].Name.match(gemsRegex)[1],
          level: gems.Gems[i].Level,
          icon: gems.Gems[i].Icon,
          skillName: skillEffect_event[1],
          skillShame: skillEffect_event[2].trim(),
          grade: gems.Gems[i].Grade,
        });

      skillEffect &&
        gemsList.push({
          name: gems.Gems[i].Name.match(gemsRegex)[1],
          level: gems.Gems[i].Level,
          icon: gems.Gems[i].Icon,
          skillName: skillEffect[1],
          skillShame: skillEffect[2].trim(),
          grade: gems.Gems[i].Grade,
        });
    }

    for (let i = 0; i < gemsList.length; i++) {
      if (gemsList[i].name.includes('멸화')) {
        extinction.push(gemsList[i]);
      } else {
        prominence.push(gemsList[i]);
      }
      // 보석 레벨 순으로 정렬
      extinction.sort((a, b) => b.level - a.level);
    }
  }
  console.log(gems);
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

  const equipmentItem = equipment && (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EquipmentWrap>
        <FlexWrap>
          <TrueInner>
            {equipmentList.map((item, index) => (
              <div key={index}>
                {equipment.map(
                  (items, indexs) =>
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
                            <p key={index} style={{ margin: '0 2px 0 5px' }}>
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
      <ContentWrap>
        {extinction.map((item, index) => (
          <GemsItem key={index} item={item} />
        ))}
        {prominence.map((item, index) => (
          <GemsItem key={index} item={item} />
        ))}
      </ContentWrap>
    </div>
  );

  // ------------------------- 요까지 장비

  const navMenu = [
    {
      name: '전투',
      first: true,
      content: equipmentItem,
    },
    {
      name: '스킬',
      content: '스킬탭',
    },
    {
      name: '수집',
      content: '수집탭',
    },
    {
      name: '아바타',
      content: <Avatar profile={profile} avatars={avatars} />,
    },
    {
      name: '보유 캐릭터',
      content: '보유 캐릭터탭',
    },
    {
      name: '길드',
      end: true,
      content: '길드탭',
    },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  // console.log(equipment);

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!isExist && (
          <Message>
            전투정보실에서 검색이 불가능한 캐릭터거나 존재하지 않는 캐릭터
            입니다.
          </Message>
        )}
        {isExist && (
          <ContentBox>
            <Aside />
            <Section>
              <Navigation>
                <ul>
                  {navMenu.map((item, index) =>
                    item.first ? (
                      <NavItem
                        borderFirst="true"
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    ) : item.end ? (
                      <NavItem
                        borderEnd="true"
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    ) : (
                      <NavItem
                        key={index}
                        active={currentTab === index && 'true'}
                        onClick={() => selectMenuHandler(index)}
                      >
                        {item.name}
                      </NavItem>
                    )
                  )}
                </ul>
              </Navigation>
              <InnerSection>{navMenu[currentTab].content}</InnerSection>
            </Section>
          </ContentBox>
        )}
      </ContainerBox>
    </Background>
  );
};

export default Character;
