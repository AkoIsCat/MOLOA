import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { updateCharacter } from '../../../utils/updateCharacter';

import { HiOutlineTicket } from 'react-icons/hi';
import { TbMessageCircle2Filled } from 'react-icons/tb';
import { GiFallingStar } from 'react-icons/gi';
import { FaDiscord } from 'react-icons/fa';
import { Head } from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';
import CommonContentBox from '../../UI/CommonContentBox';

const RightAside = () => {
  const [couponCode, setCouponCode] = useState([]);
  const [discord, setDiscord] = useState([]);
  const [popularCharacter, setPopularCharacter] = useState([]);
  const [couponIsLoading, setCouponIsLoading] = useState(true);
  const [popularIsLoading, setPopularIsLoading] = useState(true);
  const [discordIsLoading, setDiscordIsLoading] = useState(true);
  const [JobEngravings, setJobEngravings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 쿠폰코드
    const loadCouponCode = async () => {
      try {
        const data = await getFirebaseData('Coupon');
        setCouponCode(data);
        setCouponIsLoading(false);
      } catch {
        console.log('CouponCode error');
      }
    };

    // 디스코드
    const loadDiscord = async () => {
      try {
        const data = await getFirebaseData('Discord');
        setDiscord(data);
        setDiscordIsLoading(false);
      } catch {
        console.log('Discord error!!');
      }
    };

    // 실시간 인기 캐릭터
    const loadPopularCharacter = async () => {
      try {
        const data = await getFirebaseData('CharacterSearch');
        // 객체를 객체 배열로 만들기
        const popularCharacterArray = Object.entries(data).map(
          ([key, value]) => ({
            key,
            name: value.name,
            views: value.views,
          })
        );

        // 조회수 별로 내림차순으로 정렬
        const AscPopularCharacter = popularCharacterArray
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);

        setPopularCharacter(AscPopularCharacter);
        setPopularIsLoading(false);
      } catch {
        console.log('PopularCharacter error!!');
      }
    };

    const loadEngravings = async () => {
      const data = await getFirebaseData('JobEngraving');
      setJobEngravings(Object.values(data));
    };
    loadEngravings();
    loadCouponCode();
    loadDiscord();
    loadPopularCharacter();
  }, []);

  // 컨텐츠 별 ItemList
  const renderCouponContent = (items, index, length) => {
    const isLast = index === length - 1;
    const couponNameStyle = {
      color: '#46f1ff',
      fontSize: '15px',
    };
    const termStyle = {
      fontSize: '10px',
    };
    const nameStyle = {
      color: '#fff',
      fontSize: '12px',
    };

    if (items) {
      return (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          height="20"
          align="center"
          border={isLast ? 'true' : undefined}
        >
          <LineDivision style={couponNameStyle}>
            {items.CouponName}
          </LineDivision>
          <LineDivision style={termStyle}>{items.Term}</LineDivision>
          <LineDivision style={nameStyle}>{items.Name}</LineDivision>
        </CommonContentBoxMain>
      );
    } else {
      return (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          height="20"
          align="center"
          border={isLast ? 'true' : undefined}
        >
          -
        </CommonContentBoxMain>
      );
    }
  };

  const couponItemList = (
    <div>
      {couponCode && couponCode.length > 0
        ? couponCode.map((items, index) =>
            renderCouponContent(items, index, couponCode.length)
          )
        : renderCouponContent(null, 1, 1)}
    </div>
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
        zero="true"
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
        zero="true"
      >
        <LineDivision style={{ fontSize: '14px', padding: '0 10px' }}>
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
      <CommonContentBoxMain
        key={index}
        id={index}
        font="13"
        border="true"
        zero="true"
      >
        <LineDivision>
          <PopularText style={{ fontSize: '17px' }} index={index + 1}>
            {index + 1}
          </PopularText>
          <PopularText
            style={{ fontSize: '15px', color: '#fff' }}
            onClick={() => {
              navigate(`/character/${items.name}`);
              updateCharacter(items.name, JobEngravings);
            }}
          >
            {items.name}
          </PopularText>
        </LineDivision>
      </CommonContentBoxMain>
    ) : (
      <CommonContentBoxMain key={index} id={index} font="13" zero="true">
        <LineDivision>
          <PopularText style={{ fontSize: '17px' }} index={index + 1}>
            {index + 1}
          </PopularText>
          <PopularText
            style={{ fontSize: '15px', color: '#fff' }}
            onClick={() => {
              navigate(`/character/${items.name}`);
              updateCharacter(items.name, JobEngravings);
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
          <div
            className="content"
            onClick={() => {
              window.open('https://open.kakao.com/o/sXnbg8mf', '_blank');
            }}
          >
            카카오톡 문의하기
          </div>
          <KakakoTalk />
        </HeadStyle>
        <HeadStyle border="true">
          <div
            className="content"
            onClick={() => {
              window.open(
                'https://young-country-366.notion.site/998e702ff3ee4115b36382fc9a9da192',
                '_blank'
              );
            }}
          >
            모로아 후원하기
          </div>
          <Star />
        </HeadStyle>
      </InnerContent>
    </Fragment>
  );
};

export default RightAside;

// 원하는 Content의 height를 입력해야함
const InnerContent = styled.div`
  width: 226px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 40px 10px;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 0 0 60px;
    padding: 0;
  }
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

  .content {
    padding-left: 10px;
  }
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
