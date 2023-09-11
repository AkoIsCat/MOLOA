import styled from 'styled-components';

const Notice = () => {
  return (
    <NoticeBox>※ 길드 순위는 서버별로 일정 순위까지만 표시됩니다.</NoticeBox>
  );
};

export default Notice;

const NoticeBox = styled.div`
  color: #c1c1c1;
  font-family: 'Nanum Gothic';
  margin: 30px 20px;

  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;
