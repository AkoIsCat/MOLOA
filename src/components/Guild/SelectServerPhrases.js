import styled from 'styled-components';

const SelectServerPhrases = () => {
  return (
    <SelectServerPhrasesBox>서버를 먼저 선택해 주세요.</SelectServerPhrasesBox>
  );
};

export default SelectServerPhrases;

const SelectServerPhrasesBox = styled.div`
  width: 60%;
  height: 10vh;
  font-family: 'Nanum Gothic';
  background: #373e44;
  color: #fff;
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  border-radius: 10px;

  @media ${(props) => props.theme.mobile} {
    font-size: 14px;
  }
`;
