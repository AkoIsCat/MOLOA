import React from 'react';
import {
  getCalenderIsland,
  getEventList,
} from '../../../api/LostArk/LostarkAxios';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';
import { useGetLostArkDataNotId } from '../../../hooks/useGetLostArkData';

import MoloaNotification from './MoloaNotification';
import Banner from './Banner';
import CalenderList from './CalenderList';
import EventList from './EventList';

const MainContents = () => {
  const date = new Date();
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const today = WEEKDAY[date.getDay()];
  const hour = date.getHours();
  const contentUpdateTime = new Date();
  contentUpdateTime.setDate(
    date.getDate() + (date.getDay() - WEEKDAY.indexOf('수') + 1)
  );
  contentUpdateTime.setHours(10);
  contentUpdateTime.setMinutes(0);
  contentUpdateTime.setSeconds(0);

  const calender = [
    {
      name: '필드보스',
      emergence:
        (today === '화' && checkAfterFiveOClock(hour)) ||
        (today === '수' && checkBeforeFiveOClock(hour)) ||
        (today === '금' && checkAfterFiveOClock(hour)) ||
        (today === '토' && checkBeforeFiveOClock(hour)) ||
        (today === '일' && checkAfterFiveOClock(hour)) ||
        (today === '월' && checkBeforeFiveOClock(hour))
          ? true
          : false,
      image:
        'https://cdn-lostark.game.onstove.com/uploadfiles/notice/4e0f58d616094915827ee388a255475a.jpg',
    },
    {
      name: '카오스게이트',
      emergence:
        today === '월' ||
        (today === '화' && checkBeforeFiveOClock(hour)) ||
        (today === '목' && checkAfterFiveOClock(hour)) ||
        (today === '금' && checkBeforeFiveOClock(hour)) ||
        (today === '토' && checkAfterFiveOClock(hour)) ||
        today === '일'
          ? true
          : false,
      image: 'https://i.postimg.cc/dVJGbSQv/image.jpg',
    },
    {
      name: '모험섬',
      emergence: true,
      image: 'https://i.ibb.co/yp9315G/heart.png',
    },
  ];

  const weekend =
    (today === '토' && checkAfterFiveOClock(hour)) ||
    today === '일' ||
    (today === '월' && checkBeforeFiveOClock(hour));

  function checkBeforeFiveOClock(hour) {
    return hour < 5 ? true : false;
  }

  function checkAfterFiveOClock(hour) {
    return hour > 5 ? true : false;
  }

  function extractAdventureIsland(data) {
    const isIsland = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.CategoryName === '모험 섬' && item.StartTimes !== null) {
        isIsland.push(data[i]);
      }
    }
    return isIsland;
  }

  function divideAdventureIslandsDayWeek(adventureIslandList) {
    const setWeekdayList = new Set();
    const setWeekendAmList = new Set();
    const setWeekendPmList = new Set();
    const currentDate =
      date.getHours() > 6 ? date : new Date(date.setDate(date.getDate() - 1));

    adventureIslandList.forEach((item) => {
      for (let i = 0; i < item.StartTimes.length; i++) {
        const itemDate = new Date(Date.parse(item.StartTimes[i]));
        if (itemDate.getDate() === currentDate.getDate()) {
          if (!weekend) {
            setWeekdayList.add(item);
          }
          // 주말은 모험섬을 2번 입장할 수 있으니 오전, 오후 타임으로 구분
          if (weekend && itemDate.getHours() === 9) {
            setWeekendAmList.add(item);
          }
          if (weekend && itemDate.getHours() === 19) {
            setWeekendPmList.add(item);
          }
        }
      }
    });
    const weekdayList = [...setWeekdayList];
    const weekendAmList = [...setWeekendAmList];
    const weekendPmList = [...setWeekendPmList];

    return { weekdayList, weekendAmList, weekendPmList };
  }

  function islandSelectFn(data) {
    const extractList = extractAdventureIsland(data);
    return divideAdventureIslandsDayWeek(extractList);
  }

  const { data, isLoading: adventureIslandIsLoading } = useGetLostArkDataNotId(
    'adventureIsland',
    getCalenderIsland,
    contentUpdateTime.getTime() - date.getTime(),
    islandSelectFn
  );

  const { data: eventList, isLoading: eventIsLoading } = useGetLostArkDataNotId(
    'eventList',
    getEventList,
    contentUpdateTime.getTime() - date.getTime()
  );

  const { data: recentMoloaNotification, recentMoloaNotificationIsLoading } =
    useQuery('moloaNotification', () => getFirebaseData('MoloaNoti'), {
      refetchOnWindowFocus: false,
      select: (data) => data.slice(0, 1),
    });

  const { data: bannerUrl, isLoading: bannerIsLoading } = useQuery(
    'banner',
    () => getFirebaseData('Banner'),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  return (
    <>
      <MoloaNotification
        moloaIsLoading={recentMoloaNotificationIsLoading}
        moloaNoti={recentMoloaNotification}
      />
      <Banner bannerUrl={bannerUrl} isLoading={bannerIsLoading} />
      <CalenderList
        calender={calender}
        weekend={weekend}
        adventureIslandList={data}
        adventureIslandIsLoading={adventureIslandIsLoading}
      />
      <EventList eventList={eventList} eventIsLoading={eventIsLoading} />
    </>
  );
};

export default MainContents;
