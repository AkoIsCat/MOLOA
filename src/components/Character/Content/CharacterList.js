import styled from 'styled-components';

import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';

import ContentWrap from '../../UI/ContentWrap';

import {
  SpecialList as 스페셜리스트,
  HunterMale as 여헌터,
  HunterFemale as 남헌터,
  Delain as 암살자,
  Magician as 마법사,
  FighterMale as 남무도가,
  FighterFemale as 여무도가,
  Warrior as 남전사,
  Warlord as 워로드,
  Berserker as 버서커,
  Holyknight as 홀리나이트,
  Destoyer as 디스트로이어,
  BerserkerFemale as 슬레이어,
  BattleMaster as 배틀마스터,
  BattleMasterMale as 스트라이커,
  ForceMaster as 기공사,
  LanceMaster as 창술사,
  Infighter as 인파이터,
  Arcana as 아르카나,
  Bard as 바드,
  ElementalMaster as 소서리스,
  Summoner as 서머너,
  Demonic as 데모닉,
  Blade as 블레이드,
  Reaper as 리퍼,
  DevilHunter as 데빌헌터,
  DevilHunterFemale as 건슬링어,
  HawkEye as 호크아이,
  Blaster as 블래스터,
  Scouter as 스카우터,
  Aga as 도화가,
  WeatherArtist as 기상술사,
  SoulEater as 소울이터,
  WarriorFemale as 여전사,
} from '../../../asset/image/classImg'; // 직업 아이콘

const CharacterList = ({ holdingCharacter, selectMenuHandler }) => {
  const navigate = useNavigate();

  const holdingCharacterList = [];
  let serverNameList = [];

  if (holdingCharacter) {
    const sortHoldingCharacterList = holdingCharacter.sort((a, b) => {
      const itemMaxLevelA = parseFloat(a.ItemMaxLevel.replace(/,/g, '')); // 쉼표 제거 후 숫자로 변환
      const itemMaxLevelB = parseFloat(b.ItemMaxLevel.replace(/,/g, '')); // 쉼표 제거 후 숫자로 변환
      return itemMaxLevelB - itemMaxLevelA; // 내림차순으로 정렬
    });

    const classificationByServer = [];
    // 서버별로 합침
    sortHoldingCharacterList.forEach((obj) => {
      const name = obj.ServerName;
      if (!classificationByServer[name]) {
        classificationByServer[name] = [];
      }
      classificationByServer[name].push({ obj });
    });

    // 서버별 캐릭터 순으로 정렬(내림차순)
    const sortedObj = Object.keys(classificationByServer)
      .sort(
        (a, b) =>
          classificationByServer[b].length - classificationByServer[a].length
      )
      .reduce((acc, key) => {
        acc[key] = classificationByServer[key];
        return acc;
      }, {});

    const keys = Object.keys(sortedObj);
    serverNameList = keys.map((key) => `${key}`);

    // 배열 안에 대입
    for (let key in sortedObj) {
      holdingCharacterList.push({
        [key]: sortedObj[key],
      });
    }
  }

  return (
    <div style={{ padding: '0 10px', width: '100%' }}>
      <ContentWrap character="true">
        <div style={{ width: '100%', padding: '0 20px' }}>
          {serverNameList.map((serverName, index) => (
            <Fragment key={nanoid()}>
              <ServerNameBox>{serverName}</ServerNameBox>
              <CharacterProfileWrap>
                {holdingCharacterList[index][serverName].map((items) => (
                  <CharacterProfile
                    key={nanoid()}
                    CharacterClass={items.obj.CharacterClassName.replace(
                      /'/g,
                      ''
                    )}
                  >
                    <div className="profileWrap">
                      <div className="infoWrap">
                        <div className="classImg"></div>
                        <div className="classInfoCtn">
                          <div className="classNameWrap">
                            <div className="serverName">
                              {items.obj.ServerName}
                            </div>
                          </div>
                          <div className="classNameWrap">
                            <div className="className">
                              {items.obj.CharacterClassName}
                            </div>
                          </div>
                          <div className="classLevelWrap">
                            <div className="characterLevel">
                              Lv.{items.obj.CharacterLevel}
                            </div>
                            <div className="itemLevel">
                              {items.obj.ItemMaxLevel}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="characterName"
                        onClick={(e) => {
                          navigate(`/character/${items.obj.CharacterName}`);
                          selectMenuHandler(0);
                        }}
                      >
                        {items.obj.CharacterName}
                      </div>
                    </div>
                  </CharacterProfile>
                ))}
              </CharacterProfileWrap>
            </Fragment>
          ))}
        </div>
      </ContentWrap>
    </div>
  );
};

export default CharacterList;

const ServerNameBox = styled.div`
  width: auto;
  height: 45px;
  background: #292e33;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin: 20px 0;
  color: #fff;
  font-family: 'Nanum Gothic';
`;

const CharacterProfileWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CharacterProfile = styled.div`
  width: 28.3%;
  height: 100px;
  display: flex;
  align-items: center;
  background: #292e33;
  border-radius: 10px;
  padding: 10px;
  margin: 8px;
  font-family: 'Nanum Gothic';

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  .classImg {
    width: 45px;
    height: 45px;
    margin: 5px;
    background-image: url(${(props) =>
      props.CharacterClass === '워로드'
        ? 워로드
        : props.CharacterClass === '디스트로이어'
        ? 디스트로이어
        : props.CharacterClass === '홀리나이트'
        ? 홀리나이트
        : props.CharacterClass === '버서커'
        ? 버서커
        : props.CharacterClass === '슬레이어'
        ? 슬레이어
        : props.CharacterClass === '배틀마스터'
        ? 배틀마스터
        : props.CharacterClass === '기공사'
        ? 기공사
        : props.CharacterClass === '인파이터'
        ? 인파이터
        : props.CharacterClass === '창술사'
        ? 창술사
        : props.CharacterClass === '스트라이커'
        ? 스트라이커
        : props.CharacterClass === '데빌헌터'
        ? 데빌헌터
        : props.CharacterClass === '블래스터'
        ? 블래스터
        : props.CharacterClass === '호크아이'
        ? 호크아이
        : props.CharacterClass === '스카우터'
        ? 스카우터
        : props.CharacterClass === '건슬링어'
        ? 건슬링어
        : props.CharacterClass === '아르카나'
        ? 아르카나
        : props.CharacterClass === '소서리스'
        ? 소서리스
        : props.CharacterClass === '바드'
        ? 바드
        : props.CharacterClass === '서머너'
        ? 서머너
        : props.CharacterClass === '데모닉'
        ? 데모닉
        : props.CharacterClass === '블레이드'
        ? 블레이드
        : props.CharacterClass === '리퍼'
        ? 리퍼
        : props.CharacterClass === '기상술사'
        ? 기상술사
        : props.CharacterClass === '도화가'
        ? 도화가
        : props.CharacterClass === '스페셜리스트'
        ? 스페셜리스트
        : props.CharacterClass === '전사(남)'
        ? 남전사
        : props.CharacterClass === '헌터(남)'
        ? 남헌터
        : props.CharacterClass === '헌터(여)'
        ? 여헌터
        : props.CharacterClass === '무도가(남)'
        ? 남무도가
        : props.CharacterClass === '무도가(여)'
        ? 여무도가
        : props.CharacterClass === '암살자'
        ? 암살자
        : props.CharacterClass === '마법사'
        ? 마법사
        : props.CharacterClass === '소울이터'
        ? 소울이터
        : props.CharacterClass === '전사(여)'
        ? 여전사
        : ''});
    background-size: contain;
    background-repeat: no-repeat;
  }

  .profileWrap {
    display: flex;
    flex-direction: column;
  }

  .infoWrap {
    display: flex;
    align-items: center;
  }

  .classNameWrap {
    display: flex;
    margin-bottom: 6px;
    margin-left: 5px;

    .serverName {
      width: auto;
      color: #3875cc;
    }

    .className {
      color: #e56905;
    }
  }

  .classLevelWrap {
    display: flex;
    margin-left: 5px;

    .characterLevel {
      color: #c1c1c1;
      margin-right: 7px;
    }

    .itemLevel {
      color: #fff;
    }
  }

  .characterName {
    width: auto;
    color: #fff;
    margin: 10px 0 0 10px;
    cursor: pointer;
  }
`;
