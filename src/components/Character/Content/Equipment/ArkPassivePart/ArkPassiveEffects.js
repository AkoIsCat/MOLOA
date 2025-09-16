import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const ArkPassiveEffects = ({ arkpassive }) => {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const mobileScreen = isMobile;
  const fullScreen = isPc || isTablet;

  function extractionArkPassive(arkPassiveData) {
    const evolution = [];
    const enlightenment = [];
    const leap = [];

    for (let i = 0; i <= arkPassiveData.length - 1; i++) {
      if (arkPassiveData[i].Name === '깨달음') {
        evolution.push(arkPassiveData[i]);
      } else if (arkPassiveData[i].Name === '진화') {
        enlightenment.push(arkPassiveData[i]);
      } else {
        leap.push(arkPassiveData[i]);
      }
    }

    return { evolution, enlightenment, leap };
  }

  const arkPassiveEffectList =
    arkpassive?.IsArkPassive && extractionArkPassive(arkpassive?.Effects);

  return (
    <div>
      <ContentWrap>
        <CharacteristicsBox>아크패시브</CharacteristicsBox>
        <EffectsBox fullScreen={fullScreen} mobileScreen={mobileScreen}>
          <ItemBox fullScreen={fullScreen} mobileScreen={mobileScreen}>
            <ItemTitle type="진화">진화</ItemTitle>
            <Item>
              {arkPassiveEffectList.enlightenment.map((item, index) => (
                <div key={`진화${index}`}>
                  <img src={item.Icon} alt="진화 이미지" />
                  <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                </div>
              ))}
            </Item>
          </ItemBox>
          <ItemBox fullScreen={fullScreen} mobileScreen={mobileScreen}>
            <ItemTitle type="깨달음">깨달음</ItemTitle>
            <Item>
              {arkPassiveEffectList.evolution.map((item, index) => (
                <div key={`깨달음${index}`}>
                  <img src={item.Icon} alt="깨달음 이미지" />
                  <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                </div>
              ))}
            </Item>
          </ItemBox>
          <ItemBox fullScreen={fullScreen} mobileScreen={mobileScreen}>
            <ItemTitle type="도약">도약</ItemTitle>
            <Item>
              {arkPassiveEffectList.leap.map((item, index) => (
                <div key={`도약${index}`}>
                  <img src={item.Icon} alt="도약 이미지" />
                  <div dangerouslySetInnerHTML={{ __html: item.Description }} />
                </div>
              ))}
            </Item>
          </ItemBox>
        </EffectsBox>
      </ContentWrap>
    </div>
  );
};

export default ArkPassiveEffects;

const ContentWrap = styled.div`
  width: ${(props) => (props.characteristics ? '32%' : '100%')};
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #181c1e;
  border-radius: 10px;
  padding: 10px 0;
  margin: 20px 0 0 0;
`;

const CharacteristicsBox = styled.div`
  width: 103px;
  height: 35px;
  background: #292e33;
  border-radius: 50px;
  text-align: center;
  line-height: 35px;
  font-family: 'Nanum Gothic';
  color: #fff;
  margin-left: 10px;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin: 10px;
    padding: 0;
  }
`;

const EffectsBox = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: ${(props) => (props.fullScreen ? 'row' : 'column')};
  align-items: ${(props) => (props.fullScreen ? 'left' : 'center')};
`;

const ItemBox = styled.div`
  min-width: 240px;
  display: ${(props) => (props.fullScreen ? '' : 'flex')};
  flex-direction: ${(props) => (props.fullScreen ? 'row' : 'column')};
  align-items: ${(props) => (props.fullScreen ? 'left' : 'center')};
`;

const ItemTitle = styled.div`
  display: flex;
  margin: 10px 5px;
  justify-content: center;
  width: 50px;
  padding: 3px;
  background: ${(props) =>
    props.type === '진화'
      ? '#F1D594'
      : props.type === '깨달음'
      ? '#83E9FF'
      : '#C2EA55'};
  border-radius: 5px;
`;

const Item = styled.div`
  color: #fff;

  div {
    display: flex;
    margin: 4px;
    font-size: 15px;
  }

  img {
    width: 25px;
    height: 25px;
    border-radius: 7px;
  }
`;
