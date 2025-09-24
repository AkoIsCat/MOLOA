import styled from 'styled-components';

const Notice = ({ Instructions }) => {
  return <NoticeBox>{Instructions}</NoticeBox>;
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
