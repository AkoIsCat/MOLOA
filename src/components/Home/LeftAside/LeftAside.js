import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { getNotificationList } from '../../../api/LostarkAxios';
import { getFirebaseData } from '../../../api/FirebaseAxios';

import { HiOutlineSpeakerphone } from 'react-icons/hi';
import ContentBox from './ContentBox';
import SmallMenu from '../../UI/SmallMenu';

const LeftAside = () => {
  const [noti, setNoti] = useState([]);
  const [moloaNoti, setMoloaNoti] = useState([]);
  const [loaIsLoading, setLoaIsLoading] = useState(true);
  const [molosIsLoading, setMoloaIsLoading] = useState(true);

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

  useEffect(() => {
    const loadLostApi = async () => {
      try {
        const data = await getNotificationList();

        const sliceResponseDate = await data.slice(0, 5);

        setNoti((prev) => prev.concat(sliceResponseDate));
        setLoaIsLoading(false);
      } catch (err) {
        console.log('LostArk Notification error!!');
      }
    };

    // 모로아 공지사항
    const loadMoloaNoti = async () => {
      try {
        const data = await getFirebaseData('MoloaNoti');
        setMoloaNoti(data);
        setMoloaIsLoading(false);
      } catch {
        console.log('MoloaNoti error');
      }
    };
    loadLostApi();
    loadMoloaNoti();
  }, []);

  return (
    <LeftWrap>
      <InnerContent height="341px">
        <ContentBox
          title="로스트아크 공지사항"
          item={noti}
          icon={<Speaker />}
          loading={loaIsLoading}
          noti={true}
        />
      </InnerContent>
      <InnerContent height="auto">
        <ContentBox
          title="모로아 공지사항"
          item={moloaNoti}
          icon={<Speaker />}
          loading={molosIsLoading}
        />
      </InnerContent>
      {isPc && <SmallMenu />}
      {isMobile && <SmallMenu right="true" />}
    </LeftWrap>
  );
};

export default LeftAside;

// 원하는 Content의 height를 입력해야함
const InnerContent = styled.div`
  width: 226px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 60px 10px;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 0 0 60px;
    padding: 0;
  }
`;

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
