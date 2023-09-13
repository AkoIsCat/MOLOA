import styled from 'styled-components';

import InnerContent from '../../UI/InnerContent';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

const EventList = ({ eventIsLoading, eventList }) => {
  const eventListItem = eventList.map((item, index) => (
    <CarouselWrap key={index}>
      <CarouselImg key={index} src={item.Thumbnail} />
      <CarouselDate>
        {item.StartDate.slice(5, 10)} 부터 {item.EndDate.slice(5, 10)} 까지
      </CarouselDate>
    </CarouselWrap>
  ));

  return (
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
  );
};

export default EventList;

const Calendar = styled(MdOutlineCalendarMonth)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;

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
