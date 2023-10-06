import styled from 'styled-components';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';

import { TbMessageCircle2Filled } from 'react-icons/tb';
import { GiFallingStar } from 'react-icons/gi';
import CouponList from './CouponList';
import PopularCharacterList from './PopularCharacterList';
import DiscordList from './DiscordList';
import InquiryAndSupportBox from './InquiryAndSupportBox';

const RightAside = () => {
  const { data: couponCode, isLoading: couponIsLoading } = useQuery(
    'couponCode',
    () => getFirebaseData('Coupon'),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: discord, isLoading: discordIsLoading } = useQuery(
    'discord',
    () => getFirebaseData('Discord'),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const { data: popularCharacter, isLoading: popularIsLoading } = useQuery(
    'populerCharacter',
    () => getFirebaseData('CharacterSearch'),
    {
      select: (data) => {
        const changeArray = changeObjectToObjectArray(data);
        return changeArray.sort((a, b) => b.views - a.views).slice(0, 5);
      },
    }
  );

  const { data: jobEngravings } = useQuery(
    'engravings',
    () => getFirebaseData('JobEngraving'),
    {
      select: (data) => Object.values(data),
      refetchOnWindowFocus: false,
    }
  );

  function changeObjectToObjectArray(data) {
    const changeObjectArray = Object.entries(data).map(([key, value]) => ({
      key,
      name: value.name,
      views: value.views,
    }));

    return changeObjectArray;
  }

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
