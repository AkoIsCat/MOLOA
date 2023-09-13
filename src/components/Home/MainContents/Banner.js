import styled from 'styled-components';
import Loading from '../../UI/Loading';

const Banner = ({ bannerUrl, isLoading }) => {
  return (
    <MainBannerWrap border="true" height="361px">
      {isLoading && <Loading />}
      {!isLoading && (
        <MainBanner src={bannerUrl[0].image} alt="업데이트 이미지" big="true" />
      )}
    </MainBannerWrap>
  );
};

export default Banner;

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
