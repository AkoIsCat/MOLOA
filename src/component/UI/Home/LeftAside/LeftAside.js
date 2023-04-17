import styled from 'styled-components';
import React, { Fragment, useEffect, useState } from 'react';

import { HiOutlineSpeakerphone } from 'react-icons/hi';
import ContentBox from './ContentBox';
import SmallMenu from '../../SmallMenu';

// 원하는 Content의 height를 입력해야함
const InnerContent = styled.div`
  width: 226px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 60px 10px;
`;

const Speaker = styled(HiOutlineSpeakerphone)`
  margin-left: 5px;
  font-size: 19px;
`;

const lostArkKey =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMjc0MTYifQ.MIy7jDe9w81yjIX8Zh4VgGCVH2IR-vz7CGF6Ceh0zdc-5HfnY31XrIwJ86r_nz1ImkS-dPxW7bO_8AaZmuII6sbdJo_dWer-kbkpA5kx1aIrtGqpvhY_fWtXY-_wmWhZrdAFJTtB8t6yVHIua_ceA7CJWM0Bn1sQ6SNWxCbq9fsHb6BGRayKuJ5JV-qAIVC5VjNyVC4iIyAdJetDWgu0c7DTR_pVOeWHbsX-CbAqqKXvRPoNII1aop4Ioa9Sbhb99iD-BuA7pfn-_D-m6axvO0-0luLu4UbwXhrE5jEVPNs7Oxf215AqosVjFb5ObX74iGzf6vyt8YqjL08UkLS8NQ';

const MoloaNotiUrl = `https://lostark-bf0ba-default-rtdb.firebaseio.com/MoloaNoti.json`;

const LeftAside = () => {
  const [noti, setNoti] = useState([]);
  const [moloaNoti, setMoloaNoti] = useState([]);
  const [loaIsLoading, setLoaIsLoading] = useState(true);
  const [molosIsLoading, setMoloaIsLoading] = useState(true);

  // 렌더링 횟수
  // 1. noti랑 moloaNoti가 초기값인 빈 배열로 설정돼서 렌더링이 발생
  // 2. loadLostApi 실행 후 noti의 상태가 업데이트 되어서 렌더링이 발생
  // 3. loadMoloaNoti 실행 후 moloaNoti의 상태가 업데이트 되어서 렌더링이 발생

  useEffect(() => {
    const loadLostApi = async () => {
      try {
        const response = await fetch('/news/notices?type=%EA%B3%B5%EC%A7%80', {
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${lostArkKey}`,
          },
        });
        const responseData = await response.json();

        const sliceResponseDate = await responseData.slice(0, 5);

        setNoti((prev) => prev.concat(sliceResponseDate));
        setLoaIsLoading(false);
      } catch (err) {
        console.log('LostArk Notification error!!');
      }
    };

    // 모로아 공지사항
    const loadMoloaNoti = async () => {
      try {
        const response = await fetch(MoloaNotiUrl);
        const responseData = await response.json();

        setMoloaNoti(responseData);
        setMoloaIsLoading(false);
      } catch {
        console.log('MoloaNoti error');
      }
    };
    loadLostApi();
    loadMoloaNoti();
  }, []);

  console.log('left Aside');

  return (
    <Fragment>
      <InnerContent height="341px">
        <ContentBox
          title="로스트아크 공지사항"
          item={noti}
          icon={<Speaker />}
          loading={loaIsLoading}
        />
      </InnerContent>
      <InnerContent height="341px">
        <ContentBox
          title="모로아 공지사항"
          item={moloaNoti}
          icon={<Speaker />}
          loading={molosIsLoading}
        />
      </InnerContent>
      <SmallMenu />
    </Fragment>
  );
};

export default LeftAside;
