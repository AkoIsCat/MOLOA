import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const BackgroundSearch = styled.div`
  width: 1302px;
  height: 128px;
  background: linear-gradient(to right, #252b2e 50%, #202427);
  border-bottom: 1px solid #373e44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SearchForm = styled.form`
  width: auto;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`;

const SearchInput = styled.input`
  width: 944px;
  height: 44px;
  background: linear-gradient(to right, #252b2e 30%, #1e2225);
  border: 1px solid #373e44;
  border-radius: 8px;
  margin-bottom: 22px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  line-height: 44px;
  padding-left: 15px;
  font-family: 'Nanum Gothic';
  &:focus {
    outline: none;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SearchIcon = styled.button`
  position: absolute;
  top: 13px;
  right: 15px;
  color: #373e44;
  font-size: 22px;
  cursor: pointer;
  background-color: transparent;
  border: 0;

  @media ${(props) => props.theme.mobile} {
    top: 18%;
    right: 0%;
  }
`;

const Title = styled.h1`
  color: white;
  margin: 5px;
  cursor: pointer;
`;

const NavLinkTitle = styled(NavLink)`
  text-decoration: none;
`;

const lostArkKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMjc0MTYifQ.MIy7jDe9w81yjIX8Zh4VgGCVH2IR-vz7CGF6Ceh0zdc-5HfnY31XrIwJ86r_nz1ImkS-dPxW7bO_8AaZmuII6sbdJo_dWer-kbkpA5kx1aIrtGqpvhY_fWtXY-_wmWhZrdAFJTtB8t6yVHIua_ceA7CJWM0Bn1sQ6SNWxCbq9fsHb6BGRayKuJ5JV-qAIVC5VjNyVC4iIyAdJetDWgu0c7DTR_pVOeWHbsX-CbAqqKXvRPoNII1aop4Ioa9Sbhb99iD-BuA7pfn-_D-m6axvO0-0luLu4UbwXhrE5jEVPNs7Oxf215AqosVjFb5ObX74iGzf6vyt8YqjL08UkLS8NQ';

const commonCharacterUrl = `https://developer-lostark.game.onstove.com/armories/characters`;

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const trimInput = searchInput.trim();

  const engraving = [
    '분노의 망치',
    '중력 수련',
    '처단자',
    '포식자',
    '광기',
    '광전사의 비기',
    '고독한 기사',
    '전투 태세',
    '심판자',
    '축복의 오라',
    '세맥타통',
    '역천지체',
    '오의 강화',
    '초심',
    '일격필살',
    '오의난무',
    '극의: 체술',
    '충격 단련',
    '절정',
    '절제',
    '사냥의 시간',
    '피스메이커',
    '강화 무기',
    '핸드거너',
    '포격 강화',
    '화력 강화',
    '아르데타인의 기술',
    '진화의 유산',
    '두 번째 동료',
    '죽음의 습격',
    '절실한 구원',
    '진실된 용맹',
    '상급 소환사',
    '넘치는 교감',
    '점화',
    '환류',
    '황제의 칙령',
    '황후의 은총',
    '멈출 수 없는 충동',
    '완벽한 억제',
    '갈증',
    '달의 소리',
    '잔재된 기운',
    '버스트',
    '만개',
    '회귀',
    '이슬비',
    '질풍노도',
  ];

  const navigate = useNavigate();

  useEffect(() => {
    document.cookie = 'safeCookie1=foo; SameSite=Lax';
    document.cookie = 'safeCookie2=foo';
    document.cookie = 'crossCookie=bar; SameSite=None; Secure';
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (trimInput.length !== 0) {
      navigate(`/character/${trimInput}`);
      setSearchInput('');
    }

    const response = await fetch(
      `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`
    );
    const data = await response.json();

    // 존재하는 캐릭터만 데이터를 추가할 수 있음.
    const responseCharacter = await fetch(
      `https://developer-lostark.game.onstove.com/characters/${trimInput}/siblings`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${lostArkKey}`,
        },
      }
    );

    const characterData = await responseCharacter.json();

    // 캐릭터 정보 조회
    const responseCharacterProfile = await fetch(
      `${commonCharacterUrl}/${trimInput}/profiles`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${lostArkKey}`,
        },
      }
    );
    const profileData = await responseCharacterProfile.json();

    // 각인 조회 & 활성화 된 직각 추출 & db등록
    const checkEngravings = async () => {
      // 각인 조회
      const responseEngravings = await fetch(
        `${commonCharacterUrl}/${trimInput}/engravings`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        }
      );
      const engravingsData = await responseEngravings.json();

      let engravingItem = []; // 각인을 담을 배열

      // 활성화 된 직각 추출
      if (engravingsData) {
        for (let i = 0; i < engraving.length; i++) {
          for (let j = 0; j < engravingsData.Effects.length; j++) {
            const split = engravingsData.Effects[j].Name.split(' Lv. ');
            if (split[0] === engraving[i]) {
              engravingItem.push({ name: split[0], level: split[1] });
            }
          }
        }
      }

      // DB 등록
      if (data) {
        // 이미 등록된 닉네임인 경우 조회수를 업데이트
        const updatedData = {
          ...data,
          views: data.views + 1,
          level: profileData.ItemMaxLevel,
          engravings: engravingItem,
          guild: profileData.GuildName,
        };
        await fetch(
          `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`,
          {
            method: 'PUT',
            body: JSON.stringify(updatedData),
          }
        );

        // db에 존재하지 않고, 로아에 실제로 있는 캐릭터만 추가 가능
      } else if (!data && characterData) {
        // 새로운 닉네임인 경우 데이터를 추가

        const newData = {
          name: trimInput,
          views: 1,
          server: profileData.ServerName,
          level: profileData.ItemMaxLevel,
          class: profileData.CharacterClassName,
          engravings: engravingItem,
          guild: profileData.GuildName,
        };
        await fetch(
          `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`,
          {
            method: 'PUT',
            body: JSON.stringify(newData),
          }
        );
      }
    };

    checkEngravings();
  };

  return (
    <BackgroundSearch>
      <NavLinkTitle to="/">
        <Title>MOLOA</Title>
      </NavLinkTitle>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchInput
          type="text"
          placeholder="캐릭터 검색"
          onChange={(e) => setSearchInput(e.target.value)}
          value={trimInput || ''}
        />
        <SearchIcon type="submit">
          <BsSearch />
        </SearchIcon>
      </SearchForm>
    </BackgroundSearch>
  );
};

export default Search;
