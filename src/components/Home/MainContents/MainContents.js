import React from 'react';
import { useEffect, useState } from 'react';
import {
  getCalenderIsland,
  getEventList,
} from '../../../api/LostArk/LostarkAxios';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';

import MoloaNotification from './MoloaNotification';
import Banner from './Banner';
import CalenderList from './CalenderList';
import EventList from './EventList';

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

const MainContents = () => {
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
      image: 'https://i.postimg.cc/CMv7s0wD/image.png',
    },
    {
      name: '유령선',
      emergence:
        (today === '화' && checkAfterFiveOClock(hour)) ||
        (today === '수' && checkBeforeFiveOClock(hour)) ||
        (today === '목' && checkAfterFiveOClock(hour)) ||
        (today === '금' && checkBeforeFiveOClock(hour)) ||
        (today === '토' && checkAfterFiveOClock(hour)) ||
        (today === '일' && checkBeforeFiveOClock(hour))
          ? true
          : false,
      image: 'https://ifh.cc/g/YjQa0m.jpg',
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
  const [islandList, setIslandList] = useState([]);
  const [amIslandList, setAmIslandList] = useState([]);
  const [pmIslandList, setPmIslandList] = useState([]);
  const [weekend, setWeekend] = useState(false);
  const [islandIsLoading, setIslandIsLoadig] = useState(true);

  function checkBeforeFiveOClock(hour) {
    return hour < 5 ? true : false;
  }

  function checkAfterFiveOClock(hour) {
    return hour > 5 ? true : false;
  }

  useEffect(() => {
    const currentDate =
      date.getHours() > 6 ? date : new Date(date.setDate(date.getDate() - 1));

    // 캘린더
    const loadCalender = async () => {
      try {
        const data = await getCalenderIsland();

        const setList = new Set();
        const setAmList = new Set();
        const setPmList = new Set();
        // 오늘에 해당하는 모험섬 목록 추출
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].CategoryName === '모험 섬' &&
            data[i].StartTimes !== null
          ) {
            for (let j = 0; j < data[i].StartTimes.length; j++) {
              const itemDate = new Date(Date.parse(data[i].StartTimes[j]));
              if (itemDate.getDate() === currentDate.getDate()) {
                setList.add(data[i]);
                // 주말은 모험섬을 2번 입장할 수 있으니 오전, 오후 타임으로 구분
                if (itemDate.getHours() === 9) {
                  setAmList.add(data[i]);
                }
                if (itemDate.getHours() === 19) {
                  setPmList.add(data[i]);
                }
              }
              setIslandIsLoadig(false);
            }
          }
        }
        const list = [...setList];
        const amList = [...setAmList];
        const pmList = [...setPmList];
        setIslandList(list);
        setAmIslandList(amList);
        setPmIslandList(pmList);
      } catch (err) {
        console.log(err);
        console.log('LostArk Calender error!!');
      }
    };

    if (
      (today === '토' && checkAfterFiveOClock(hour)) ||
      today === '일' ||
      (today === '월' && checkBeforeFiveOClock(hour))
    ) {
      setWeekend(true);
    }
    loadCalender();
  }, []);

  const { data: eventList, isLoading: eventIsLoading } = useQuery(
    'eventList',
    () => getEventList(),
    {
      refetchOnWindowFocus: false,
      staleTime: contentUpdateTime.getTime(),
    }
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
        islandList={islandList}
        amIslandList={amIslandList}
        pmIslandList={pmIslandList}
        islandIsLoading={islandIsLoading}
      />
      <EventList eventList={eventList} eventIsLoading={eventIsLoading} />
    </>
  );
};

export default MainContents;
