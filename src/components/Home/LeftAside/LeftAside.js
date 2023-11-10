import styled from 'styled-components';
import React from 'react';
import { getNotificationList } from '../../../api/LostArk/LostarkAxios';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';
import { useGetLostArkDataNotId } from '../../../hooks/useGetLostArkData';

import { HiOutlineSpeakerphone } from 'react-icons/hi';
import ContentBox from './ContentBox';
import InnerContent from '../../UI/InnerContent';

const LeftAside = () => {
  function sliceList(data) {
    const sliceArray = [];
    for (let i = 0; i < 5; i++) {
      sliceArray.push(data[i]);
    }
    return sliceArray;
  }
  const { data: lostarkNotification, isLoading: lostarkNotiIsLoading } =
    useGetLostArkDataNotId(
      'loastarkNotification',
      getNotificationList,
      0,
      sliceList
    );

  const { data: moloaNotification, isLoading: moloaNotiIsLoading } = useQuery(
    'moloaNotification',
    () => getFirebaseData('MoloaNoti'),
    {
      select: (item) => {
        const sliceData = item.length > 5 ? item.slice(0, 5) : item;
        const reverseData =
          sliceData[0].id !== sliceData.length - 1
            ? sliceData.reverse()
            : sliceData;
        return reverseData;
      },
      refetchOnWindowFocus: false,
    }
  );

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
