import styled from 'styled-components';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { getNotificationList } from '../../../api/LostArk/LostarkAxios';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';

import { HiOutlineSpeakerphone } from 'react-icons/hi';
import ContentBox from './ContentBox';
import SmallMenu from '../../UI/SmallMenu';
import InnerContent from '../../UI/InnerContent';

const LeftAside = () => {
  const { data: lostarkNotification, isLoading: lostarkNotiIsLoading } =
    useQuery('loastarkNotification', () => getNotificationList(), {
      select: (item) => item.slice(0, 5),
      refetchOnWindowFocus: false,
    });

  const { data: moloaNotification, isLoading: moloaNotiIsLoading } = useQuery(
    'moloaNotification',
    () => getFirebaseData('MoloaNoti'),
    {
      select: (item) =>
        item[0].id !== item.length - 1 ? item.reverse() : item,
      refetchOnWindowFocus: false,
    }
  );

  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  // 렌더링 횟수
  // 1. noti랑 moloaNoti가 초기값인 빈 배열로 설정돼서 렌더링이 발생
  // 2. loadLostApi 실행 후 noti의 상태가 업데이트 되어서 렌더링이 발생
  // 3. loadMoloaNoti 실행 후 moloaNoti의 상태가 업데이트 되어서 렌더링이 발생

  return (
    <LeftWrap>
      <InnerContent height="auto" side={true}>
        <ContentBox
          title="로스트아크 공지사항"
          item={lostarkNotification}
          type="loa"
          icon={<Speaker />}
          loading={lostarkNotiIsLoading}
          noti={true}
        />
      </InnerContent>
      <InnerContent height="auto" side={true}>
        <ContentBox
          title="모로아 공지사항"
          item={moloaNotification}
          type="moloa"
          icon={<Speaker />}
          loading={moloaNotiIsLoading}
        />
      </InnerContent>
      {isPc && <SmallMenu />}
      {isMobile && <SmallMenu right="true" />}
    </LeftWrap>
  );
};

export default LeftAside;

const Speaker = styled(HiOutlineSpeakerphone)`
  margin-left: 5px;
  font-size: 19px;
`;

const LeftWrap = styled.div`
  width: auto;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;
