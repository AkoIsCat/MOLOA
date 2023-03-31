import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HiOutlineTicket } from 'react-icons/hi';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { GiFallingStar } from 'react-icons/gi';
import { FaDiscord } from 'react-icons/fa';
import { Head } from './CommonContentBox';
import CommonContentBoxMain from './CommonContentBoxMain';
import CommonContentBox from './CommonContentBox';

// 원하는 Content의 height를 입력해야함
const InnerContent = styled.div`
  width: 226px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 40px 10px;
`;

const Coupon = styled(HiOutlineTicket)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;

const Discord = styled(FaDiscord)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;

const KakakoTalk = styled(TbMessageCircle2Filled)`
  margin-right: 10px;
  margin-bottom: 4px;
  font-size: 19px;
  color: yellow;
`;

const Star = styled(GiFallingStar)`
  margin-right: 10px;
  margin-bottom: 4px;
  font-size: 19px;
  color: #ffdd65;
`;

const HeadStyle = styled(Head)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;
`;

const LineDivision = styled.div`
  display: block;
`;

const PopularText = styled.span`
  font-family: 'Nanum Gothic';
  margin: 20px 10px;
  padding: 0 5px;
  color: ${(props) =>
    props.index === 1
      ? '#ffd700'
      : props.index === 2
      ? '#dbe4eb'
      : props.index === 3
      ? '#cd7f32'
      : '#c1c1c1'};
  border-bottom: ${(props) =>
    props.index === 1
      ? '2px solid #ffd700'
      : props.index === 2
      ? '2px solid #dbe4eb'
      : props.index === 3
      ? '2px solid #cd7f32'
      : 'none'};
  cursor: pointer;
`;

const CouponCode = `https://lostark-bf0ba-default-rtdb.firebaseio.com/Coupon.json`;
const DiscordUrl = `https://lostark-bf0ba-default-rtdb.firebaseio.com/Discord.json`;
const PopularCharacterUrl = `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch.json`;

const RightAside = () => {
  const [couponCode, setCouponCode] = useState([]);
  const [discord, setDiscord] = useState([]);
  const [popularCharacter, setPopularCharacter] = useState([]);
  const [couponIsLoading, setCouponIsLoading] = useState(true);
  const [popularIsLoading, setPopularIsLoading] = useState(true);
  const [discordIsLoading, setDiscordIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // 쿠폰코드
    const loadCouponCode = async () => {
      try {
        const response = await fetch(CouponCode);
        const responseData = await response.json();
        setCouponCode(responseData);
        setCouponIsLoading(false);
      } catch {
        console.log('CouponCode error');
      }
    };

    // 디스코드
    const loadDiscord = async () => {
      try {
        const response = await fetch(DiscordUrl);
        const responseData = await response.json();

        setDiscord(responseData);
        setDiscordIsLoading(false);
      } catch {
        console.log('Discord error!!');
      }
    };

    // 실시간 인기 캐릭터
    const loadPopularCharacter = async () => {
      try {
        const response = await fetch(PopularCharacterUrl);
        const responseData = await response.json();

        // 객체를 객체 배열로 만들기
        const popularCharacterArray = [];
        for (const [key, value] of Object.entries(responseData)) {
          popularCharacterArray.push({ name: value.name, views: value.views });
        }

        // 조회수 별로 내림차순으로 정렬
        const AscPopularCharacter = popularCharacterArray
          .sort((a, b) => {
            return b.views - a.views;
          })
          .splice(0, 5);

        setPopularCharacter(AscPopularCharacter);
        setPopularIsLoading(false);
      } catch {
        console.log('PopularCharacter error!!');
      }
    };

    loadCouponCode();
    loadDiscord();
    loadPopularCharacter();
  }, []);

  // 컨텐츠 별 ItemList
  const couponItemList = couponCode ? (
    couponCode.map((items, index) =>
      couponCode.length === index + 1 ? (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          height="20"
          align="center"
          border="true"
        >
          <LineDivision style={{ color: '#46f1ff', fontSize: '15px' }}>
            {items.CouponName}
          </LineDivision>
          <LineDivision style={{ fontSize: '10px' }}>{items.Term}</LineDivision>
          <LineDivision style={{ color: '#fff', fontSize: '12px' }}>
            {items.Name}
          </LineDivision>
        </CommonContentBoxMain>
      ) : couponCode.length === 0 ? (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          height="20"
          align="center"
          border="true"
        >
          -
        </CommonContentBoxMain>
      ) : (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          height="20"
          align="center"
        >
          <LineDivision style={{ color: '#46f1ff', fontSize: '15px' }}>
            {items.CouponName}
          </LineDivision>
          <LineDivision style={{ fontSize: '10px' }}>{items.Term}</LineDivision>
          <LineDivision style={{ color: '#fff', fontSize: '12px' }}>
            {items.Name}
          </LineDivision>
        </CommonContentBoxMain>
      )
    )
  ) : (
    <CommonContentBoxMain
      key={1}
      id={1}
      font="13"
      height="20"
      align="center"
      border="true"
    >
      -
    </CommonContentBoxMain>
  );

  const discordItemList = discord.map((items, index) =>
    discord.length === index + 1 ? (
      <CommonContentBoxMain
        key={index}
        id={index}
        font="13"
        height="15"
        align="center"
        border="true"
        link="true"
      >
        <LineDivision style={{ fontSize: '14px' }}>
          {items.ServerName}
        </LineDivision>
        <LineDivision
          style={{ fontSize: '10px', cursor: 'pointer' }}
          onClick={() => window.open(`${items.Address}`, '_blank')}
        >
          {items.Address}
        </LineDivision>
      </CommonContentBoxMain>
    ) : (
      <CommonContentBoxMain
        key={index}
        id={index}
        font="13"
        height="15"
        align="center"
        link="true"
      >
        <LineDivision style={{ fontSize: '14px' }}>
          {items.ServerName}
        </LineDivision>
        <LineDivision
          style={{ fontSize: '10px', cursor: 'pointer' }}
          onClick={() => window.open(`${items.Address}`, '_blank')}
        >
          {items.Address}
        </LineDivision>
      </CommonContentBoxMain>
    )
  );

  const popularCharacterList = popularCharacter.map((items, index) =>
    popularCharacter.length === index + 1 ? (
      <CommonContentBoxMain key={index} id={index} font="13" border="true">
        <LineDivision style={{ margin: '5px 0' }}>
          <PopularText style={{ fontSize: '17px' }} index={index + 1}>
            {index + 1}
          </PopularText>
          <PopularText
            style={{ fontSize: '15px', color: '#fff' }}
            onClick={() => {
              navigate(`/character/${items.name}`);
            }}
          >
            {items.name}
          </PopularText>
        </LineDivision>
      </CommonContentBoxMain>
    ) : (
      <CommonContentBoxMain key={index} id={index} font="13">
        <LineDivision style={{ margin: '5px 0' }}>
          <PopularText style={{ fontSize: '17px' }} index={index + 1}>
            {index + 1}
          </PopularText>
          <PopularText
            style={{ fontSize: '15px', color: '#fff' }}
            onClick={() => {
              navigate(`/character/${items.name}`);
            }}
          >
            {items.name}
          </PopularText>
        </LineDivision>
      </CommonContentBoxMain>
    )
  );

  return (
    <Fragment>
      <InnerContent height="auto">
        <CommonContentBox
          title="로스트아크 쿠폰코드"
          itemList={couponItemList}
          icon={<Coupon />}
          loading={couponIsLoading}
        />
      </InnerContent>
      <InnerContent height="auto">
        <CommonContentBox
          title="실시간 인기 캐릭터"
          itemList={popularCharacterList}
          loading={popularIsLoading}
        />
      </InnerContent>
      <InnerContent height="auto">
        <CommonContentBox
          title="서버 디스코드"
          itemList={discordItemList}
          icon={<Discord />}
          loading={discordIsLoading}
        />
      </InnerContent>
      <InnerContent height="94px">
        <HeadStyle border="true">
          카카오톡 문의하기
          <KakakoTalk />
        </HeadStyle>
        <HeadStyle border="true">
          모로아 후원하기
          <Star />
        </HeadStyle>
      </InnerContent>
    </Fragment>
  );
};

export default RightAside;
