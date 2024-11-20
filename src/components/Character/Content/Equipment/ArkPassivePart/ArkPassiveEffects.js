import styled from 'styled-components';

const ArkPassiveEffects = () => {
  return (
    <div>
      <ContentWrap>
        <CharacteristicsBox>아크패시브</CharacteristicsBox>
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
  padding: 10px 0 0;
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
`;
