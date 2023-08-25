import React, { Fragment } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCalenderIsland, getEventList } from '../../../../api/LostarkAxios';
import { getFirebaseData } from '../../../../api/FirebaseAxios';

import { Head } from '../RightAside/CommonContentBox';
import { AiOutlineCompass } from 'react-icons/ai';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import CommonContentBoxMain from '../RightAside/CommonContentBoxMain';
import CommonContentBox from '../RightAside/CommonContentBox';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../../Loading';

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

const MainContents = () => {
  const date = new Date();
  const calender = [
    {
      name: '필드보스',
      emergence:
        WEEKDAY[date.getDay()] === '화' ||
        (WEEKDAY[date.getDay()] === '수' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '금' ||
            (WEEKDAY[date.getDay()] === '토' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '일' ||
            (WEEKDAY[date.getDay()] === '월' && date.getHours() <= 6)
          ? true
          : false,
      image: 'https://i.postimg.cc/CMv7s0wD/image.png',
    },
    {
      name: '유령선',
      emergence:
        WEEKDAY[date.getDay()] === '화' ||
        (WEEKDAY[date.getDay()] === '수' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '목' ||
            (WEEKDAY[date.getDay()] === '금' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '토' ||
            (WEEKDAY[date.getDay()] === '일' && date.getHours() <= 6)
          ? true
          : false,
      image: 'https://ifh.cc/g/YjQa0m.jpg',
    },
    {
      name: '카오스게이트',
      emergence:
        WEEKDAY[date.getDay()] === '월' ||
        (WEEKDAY[date.getDay()] === '화' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '목' ||
            (WEEKDAY[date.getDay()] === '금' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '토' ||
            (WEEKDAY[date.getDay()] === '일' && date.getHours() <= 6)
          ? true
          : WEEKDAY[date.getDay()] === '일' ||
            (WEEKDAY[date.getDay()] === '월' && date.getHours() <= 6)
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
  const [eventList, setEventList] = useState([]);
  const [weekend, setWeekend] = useState(false);
  const [islandIsLoading, setIslandIsLoadig] = useState(true);
  const [eventIsLoading, setEventIsLoading] = useState(true);
  const [moloaNoti, setMoloaNoti] = useState([]);
  const [molosIsLoading, setMoloaIsLoading] = useState(true);

  useEffect(() => {
    const currentDate = new Date();

    // 캘린더
    const loadCalender = async () => {
      try {
        const data = await getCalenderIsland();

        const setList = new Set();
        const setAmList = new Set();
        const setPmList = new Set();
        // 오늘에 해당하는 모험섬 목록 추출
        for (let i = 0; i < data.length; i++) {
          // 스케줄에서 카테고리가 모험섬이고 모험섬이 시작되는 시간이 들어있으면 리스트에 추가
          if (data[i].CategoryName === '모험 섬') {
            if (data[i].StartTimes !== null) {
              for (let j = 0; j < data[i].StartTimes.length; j++) {
                // 아이템 날짜를 문자열에서 Date로 변환
                const itemDate = new Date(Date.parse(data[i].StartTimes[j]));
                if (itemDate.getDate() === currentDate.getDate()) {
                  setList.add(data[i]);
                  // 주말은 모험섬을 2번 입장할 수 있으니 오전, 오후 타임으로 구분
                  if (itemDate.getHours() === 9) {
                    setAmList.add(data[i]);
                  } else if (itemDate.getHours() === 19) {
                    setPmList.add(data[i]);
                  }
                }

                setIslandIsLoadig(false);
              }
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
      WEEKDAY[currentDate.getDay()] === '토' ||
      WEEKDAY[currentDate.getDay()] === '일'
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
        setMoloaNoti(data.splice(undefined, 1));
        setMoloaIsLoading(false);
      } catch {
        console.log('MoloaNoti Error!!');
      }
    };
    loadCalender();
    loadEventList();
    loadMoloaNoti();
  }, []);

  const islandItem = islandList.map((item, index) =>
    islandList.length === index + 1 ? (
      <IslandItem key={index}>{item.ContentsName}</IslandItem>
    ) : (
      <IslandItem key={index} border="true">
        {item.ContentsName}
      </IslandItem>
    )
  );

  const amIslandItem = amIslandList.map((item, index) => (
    <IslandItem key={index}>{item.ContentsName}</IslandItem>
  ));

  const pmIslandItem = pmIslandList.map((item, index) => (
    <IslandItem key={index}>{item.ContentsName}</IslandItem>
  ));

  const calenderListItem = calender.map((item, index) =>
    // 마지막 요소
    calender.length === index + 1 ? (
      <CommonContentBoxMain key={index} id={index} main="true" rightBtm="true">
        <LineDivision>{item.name}</LineDivision>
        <LineDivision>오늘 출현 {item.emergence ? 'O' : 'X'}</LineDivision>
        <ImageContent>
          <MainBanner src={item.image} alt="모험섬" rightBtm="true" />
          <Absolute>
            {!weekend
              ? islandItem
              : weekend && date.getHours <= 1
              ? amIslandItem
              : pmIslandItem}
          </Absolute>
        </ImageContent>
      </CommonContentBoxMain>
    ) : // 첫 요소
    index === 0 ? (
      <CommonContentBoxMain
        key={index}
        id={index}
        main="true"
        leftBtm="true"
        rightBrd="true"
      >
        <LineDivision>{item.name}</LineDivision>
        <LineDivision>오늘 출현 {item.emergence ? 'O' : 'X'}</LineDivision>
        <ImageContent>
          <MainBanner src={item.image} alt="이미지" leftBtm="true" />
        </ImageContent>
      </CommonContentBoxMain>
    ) : (
      // 가운데 요소
      <CommonContentBoxMain
        key={index}
        id={index}
        main="true"
        sideBorder="true"
        rightBrd="true"
      >
        <LineDivision>{item.name}</LineDivision>
        <LineDivision>오늘 출현 {item.emergence ? 'O' : 'X'}</LineDivision>
        <ImageContent>
          <MainBanner src={item.image} alt="이미지" calender="true" />
        </ImageContent>
      </CommonContentBoxMain>
    )
  );

  const eventListItem = eventList.map((item, index) => (
    <CarouselWrap key={index}>
      <CarouselImg key={index} src={item.Thumbnail} />
      <CarouselDate>
        {item.StartDate.slice(5, 10)} 부터 {item.EndDate.slice(5, 10)} 까지
      </CarouselDate>
    </CarouselWrap>
  ));

  const setting = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: false,
    draggable: true,
    fade: false,
    vertical: false,
  };

  return (
    <Fragment>
      <HeadStyle border="true">
        {molosIsLoading && <Loading />}
        {!molosIsLoading && moloaNoti[0]?.Title}
      </HeadStyle>
      <MainBannerWrap border="true" height="361px">
        <MainBanner
          src="https://cdn-lostark.game.onstove.com/uploadfiles/banner/638964cdc5074a51a5a295f35a267aa0.jpg"
          alt="업데이트 이미지"
          big="true"
        />
      </MainBannerWrap>
      <InnerContent height="360px">
        <CommonContentBox
          title="프로키온의 나침반"
          main="true"
          icon={<Compass />}
          itemList={calenderListItem}
          loading={islandIsLoading}
        />
      </InnerContent>
      <InnerContent height="auto">
        <CommonContentBox
          title="진행중인 이벤트"
          main="true"
          icon={<Calendar />}
          loading={eventIsLoading}
          click={true}
        />
        <Description>
          <div>* 화살표를 이용해 이벤트를 확인하실 수 있습니다. </div>
        </Description>
        <CommonContentBoxMain
          event="true"
          equipment="true"
          border="true"
          carousel="true"
        >
          <Slider {...setting}>{eventListItem}</Slider>
        </CommonContentBoxMain>
      </InnerContent>
    </Fragment>
  );
};

export default MainContents;

const Description = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: flex-end;
  background: rgb(41, 46, 51);
  font-size: 15px;
  padding-top: 10px;
  color: gray;
  font-family: 'Nanum Gothic';

  div {
    padding-right: 5px;
  }
`;

const InnerContent = styled.div`
  width: 662px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 40px 10px;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 20px 0;
    padding: 0;
  }
`;

const HeadStyle = styled(Head)`
  width: 657px;
  height: ${(props) => props.height || ''};
  margin: 10px 10px 25px 10px;
  text-align: center;
  justify-content: center;
  padding: 0;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 0;
  }
`;

const MainBannerWrap = styled.div`
  width: 657px;
  height: ${(props) => props.height || ''};
  margin: 10px 10px 25px 10px;
  text-align: center;
  justify-content: center;
  padding: 0;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 10px 0;
    padding: 0;
  }
`;

const MainBanner = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  border-radius: ${(props) =>
    props.leftBtm
      ? '0 0 0px 10px'
      : props.rightBtm
      ? '0 0 10px 0 '
      : props.big
      ? '10px'
      : ''};
`;

const Compass = styled(AiOutlineCompass)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;

const Calendar = styled(MdOutlineCalendarMonth)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;

const LineDivision = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px 0;
    padding: 0;
  }
`;

const ImageContent = styled.div`
  width: 164px;
  height: 242px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const CarouselWrap = styled.div`
  width: 183px;
  height: 155px;
  margin: 10px;
  outline: none;

  @media ${(props) => props.theme.mobile} {
    margin: 5px;
  }
`;

const CarouselImg = styled.img`
  object-fit: cover;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  // cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    object-fit: fill;
    width: 95%;
    margin: 5px 0;
    padding: 0;
  }
`;

const CarouselDate = styled.div`
  width: auto;
  font-family: 'Nanum Gothic';
  padding-left: 10px;
  margin-top: 10px;
  font-size: 13px;

  @media ${(props) => props.theme.mobile} {
    font-size: 11px;
    width: 95%;
    margin: 0;
    padding: 0;
  }
`;

const IslandItem = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: ${(props) => (props.border ? '2px solid rgb(75, 83, 90)' : 0)};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Absolute = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
