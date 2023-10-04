import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';
import { useNavigate } from 'react-router-dom';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import Footer from '../components/UI/Footer';
import Loading from '../components/UI/Loading';

const MoloaNotiList = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    'moloaNotification',
    () => getFirebaseData('MoloaNoti'),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Background>
      <Header />
      <ContainerBox>
        {isLoading && <Loading />}
        <PageTitle>공지사항</PageTitle>
        {
          <List>
            {!isLoading &&
              data.reverse().map((item, index) => (
                <ListItem
                  key={item.id}
                  end={index === data.length - 1 ? 'yes' : 'no'}
                  onClick={() => navigate(`/noti/${item.id}`)}
                >
                  {item.Title}
                </ListItem>
              ))}
          </List>
        }
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default MoloaNotiList;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h2`
  color: #fff;
`;

const List = styled.ul`
  width: 60%;
  height: auto;
  list-style: none;
  padding: 0;
  margin: 10px 50px;
  background: #252b2e;
  border-radius: 20px;
`;

const ListItem = styled.li`
  cursor: pointer;
  border-bottom: ${(props) =>
    props.end !== 'yes' ? '1px solid #fff' : 'none'};
  margin: 10px 20px;
  padding: 10px 20px;
  color: #fff;
  font-family: 'Nanum Gothic';
  font-size: 20px;
`;
