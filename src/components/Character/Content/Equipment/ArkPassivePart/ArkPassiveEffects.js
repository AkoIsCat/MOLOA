import styled from 'styled-components';

const ArkPassiveEffects = ({ arkpassive }) => {
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
        <EffectsBox>
          <ItemBox>
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
          <ItemBox>
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
          <ItemBox>
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
`;

const EffectsBox = styled.div`
  display: flex;
  margin-left: 10px;
`;

const ItemBox = styled.div`
  min-width: 230px;
`;

const ItemTitle = styled.div`\
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
    margin: 5px;
  }

  img {
    width: 25px;
    height: 25px;
    border-radius: 7px;
  }
`;
