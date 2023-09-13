import React from 'react';
import { useEffect, useState } from 'react';
import {
  getCalenderIsland,
  getEventList,
} from '../../../api/LostArk/LostarkAxios';
import { getFirebaseData } from '../../../api/Firebase/FirebaseAxios';

import MoloaNotification from './MoloaNotification';
import Banner from './Banner';
import CalenderList from './CalenderList';
import EventList from './EventList';

const date = new Date();
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
const today = WEEKDAY[date.getDay()];
const hour = date.getHours();

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
        (today === '월' && checkAfterFiveOClock(hour)) ||
        (today === '화' && checkBeforeFiveOClock(hour)) ||
        (today === '목' && checkAfterFiveOClock(hour)) ||
        (today === '금' && checkBeforeFiveOClock(hour)) ||
        (today === '토' && checkAfterFiveOClock(hour)) ||
        (today === '일' && checkBeforeFiveOClock(hour))
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
  const [moloaNoti, setMoloaNoti] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [islandList, setIslandList] = useState([]);
  const [amIslandList, setAmIslandList] = useState([]);
  const [pmIslandList, setPmIslandList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [weekend, setWeekend] = useState(false);
  const [islandIsLoading, setIslandIsLoadig] = useState(true);
  const [eventIsLoading, setEventIsLoading] = useState(true);
  const [moloaIsLoading, setMoloaIsLoading] = useState(true);
  const [bannerIsLoading, setBannerIsLoading] = useState(true);

  function checkBeforeFiveOClock(hour) {
    return hour > 5 ? true : false;
  }

  function checkAfterFiveOClock(hour) {
    return hour > 5 ? true : false;
  }

  useEffect(() => {
    const todayDate = new Date();
    const currentDate =
      todayDate.getHours() > 6
        ? todayDate
        : new Date(todayDate.setDate(todayDate.getDate() - 1));

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
      (WEEKDAY[currentDate.getDay()] === '토' && checkAfterFiveOClock(hour)) ||
      (WEEKDAY[currentDate.getDay()] === '일' && checkAfterFiveOClock(hour))
    ) {
      setWeekend(true);
    }

    // 이벤트
    const loadEventList = async () => {
      try {
        const data = await getEventList();
        setEventList(data);
        setEventIsLoading(false);
      } catch (err) {
        console.log('LostArk EventList error!!');
      }
    };

    // 모로아 공지
    const loadMoloaNoti = async () => {
      try {
        const data = await getFirebaseData('MoloaNoti');
        setMoloaNoti(data.reverse().splice(undefined, 1));
        setMoloaIsLoading(false);
      } catch {
        console.log('MoloaNoti Error!!');
      }
    };

    // 배너
    const loadBanner = async () => {
      try {
        const data = await getFirebaseData('Banner');
        setBannerUrl(data.reverse().splice(undefined, 1));
        setBannerIsLoading(false);
      } catch {
        console.log('Banner Error!!');
      }
    };

    loadCalender();
    loadEventList();
    loadMoloaNoti();
    loadBanner();
  }, []);

  return (
    <>
      <MoloaNotification
        moloaIsLoading={moloaIsLoading}
        moloaNoti={moloaNoti}
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
