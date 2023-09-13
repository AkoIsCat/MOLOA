import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';

import { TbMessageCircle2Filled } from 'react-icons/tb';
import { GiFallingStar } from 'react-icons/gi';
import CouponList from './CouponList';
import PopularCharacterList from './PopularCharacterList';
import DiscordList from './DiscordList';
import InquiryAndSupportBox from './InquiryAndSupportBox';

const RightAside = () => {
  const [couponCode, setCouponCode] = useState([]);
  const [discord, setDiscord] = useState([]);
  const [popularCharacter, setPopularCharacter] = useState([]);
  const [jobEngravings, setJobEngravings] = useState([]);
  const [couponIsLoading, setCouponIsLoading] = useState(true);
  const [popularIsLoading, setPopularIsLoading] = useState(true);
  const [discordIsLoading, setDiscordIsLoading] = useState(true);

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

  return (
    <>
      <CouponList couponCode={couponCode} couponIsLoading={couponIsLoading} />
      <PopularCharacterList
        popularCharacter={popularCharacter}
        popularIsLoading={popularIsLoading}
        jobEngravings={jobEngravings}
      />
      <DiscordList discord={discord} discordIsLoading={discordIsLoading} />
      <InquiryAndSupportBox
        link="https://open.kakao.com/o/sXnbg8mf"
        icon={<KakakoTalk />}
        text="카카오톡 문의하기"
      />
      <InquiryAndSupportBox
        link="https://young-country-366.notion.site/998e702ff3ee4115b36382fc9a9da192"
        icon={<Star />}
        text="모로아 후원하기"
      />
    </>
  );
};

export default RightAside;

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
