import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Loading from '../../UI/Loading';
import { Head } from '../../UI/CommonContentBox';

const MoloaNotification = ({ moloaIsLoading, moloaNoti }) => {
  const navigate = useNavigate();

  return (
    <HeadStyle border="true">
      {moloaIsLoading && <Loading />}
      {!moloaIsLoading && (
        <p onClick={() => navigate(`/noti/${moloaNoti[0].id}`)}>
          {moloaNoti[0]?.Title}
        </p>
      )}
    </HeadStyle>
  );
};

export default MoloaNotification;

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

  p {
    cursor: pointer;
  }
`;
