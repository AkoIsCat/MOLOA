import styled from 'styled-components';

import { AiOutlineCompass } from 'react-icons/ai';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';
import InnerContent from '../../UI/InnerContent';

const CalenderList = ({
  calender,
  weekend,
  adventureIslandList,
  adventureIslandIsLoading,
}) => {
  const date = new Date();

  const islandItem =
    adventureIslandList &&
    adventureIslandList.weekdayList &&
    adventureIslandList.weekdayList.map((item, index) =>
      adventureIslandList.weekdayList.length === index + 1 ? (
        <IslandItem key={item.ContentsName}>{item.ContentsName}</IslandItem>
      ) : (
        <IslandItem key={item.ContentsName} border="true">
          {item.ContentsName}
        </IslandItem>
      )
    );

  const amIslandItem =
    adventureIslandList &&
    adventureIslandList.weekendAmList &&
    adventureIslandList.weekendAmList.map((item, index) =>
      adventureIslandList.weekendAmList.length === index + 1 ? (
        <IslandItem key={item.ContentsName}>{item.ContentsName}</IslandItem>
      ) : (
        <IslandItem key={item.ContentsName} border="true">
          {item.ContentsName}
        </IslandItem>
      )
    );

  const pmIslandItem =
    adventureIslandList &&
    adventureIslandList.weekendPmList &&
    adventureIslandList.weekendPmList.map((item, index) =>
      adventureIslandList.weekendPmList.length === index + 1 ? (
        <IslandItem key={item.ContentsName}>{item.ContentsName}</IslandItem>
      ) : (
        <IslandItem key={item.ContentsName} border="true">
          {item.ContentsName}
        </IslandItem>
      )
    );

  const calenderListItem = calender.map((item, index) =>
    // 마지막 요소
    calender.length === index + 1 ? (
      <CommonContentBoxMain
        key={item.name}
        id={item.name}
        main="true"
        rightBtm="true"
      >
        <LineDivision>{item.name}</LineDivision>
        <LineDivision>오늘 출현 {item.emergence ? 'O' : 'X'}</LineDivision>
        <ImageContent>
          <MainBanner src={item.image} alt="모험섬" rightBtm="true" />
          <Absolute>
            {!weekend
              ? islandItem
              : weekend && date.getHours() <= 1
              ? amIslandItem
              : pmIslandItem}
          </Absolute>
        </ImageContent>
      </CommonContentBoxMain>
    ) : // 첫 요소
    index === 0 ? (
      <CommonContentBoxMain
        key={item.name}
        id={item.name}
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
        key={item.name}
        id={item.name}
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

  return (
    <InnerContent height="360px">
      <CommonContentBox
        title="프로키온의 나침반"
        main="true"
        icon={<Compass />}
        itemList={calenderListItem}
        loading={adventureIslandIsLoading}
      />
    </InnerContent>
  );
};

export default CalenderList;

const Compass = styled(AiOutlineCompass)`
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
  width: 220px;
  height: 242px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const MainBanner = styled.img`
  object-fit: cover;
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

const Absolute = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
