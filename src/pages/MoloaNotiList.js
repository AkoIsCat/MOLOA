import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import Footer from '../components/UI/Footer';
import Loading from '../components/UI/Loading';

const MoloaNotiList = () => {
  const { data, isLoading } = useQuery('notification', () =>
    getFirebaseData('MoloaNoti')
  );

  return (
    <Background>
      <Header />
      <ContainerBox>
        {isLoading && <Loading />}
        <ul>
          {!isLoading &&
            data.reverse().map((data) => <li key={data.id}>{data.Title}</li>)}
        </ul>
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
`;
