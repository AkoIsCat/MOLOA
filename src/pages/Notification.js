import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Loading from '../components/UI/Loading';

const Notification = () => {
  const [moloaNoti, setMoloaNoti] = useState([]);
  const [molosIsLoading, setMoloaIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadMoloaNoti = async () => {
      try {
        const data = await getFirebaseData(`MoloaNoti/${id}`);
        setMoloaNoti(data);
        setMoloaIsLoading(false);
      } catch {
        console.log('MoloaNoti error');
      }
    };
    loadMoloaNoti();
  }, [id]);

  return (
    <Background>
      <Header />
      <ContainerBox>
        {molosIsLoading && <Loading />}
        {!molosIsLoading && (
          <ContentWrap>
            <h1>{moloaNoti.Title}</h1>
            <p>{moloaNoti.Date}</p>
            <DivWrap>
              {moloaNoti.Content.split('\\n').map((item) => (
                <div key={moloaNoti.id}>{item}</div>
              ))}
            </DivWrap>
          </ContentWrap>
        )}
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Notification;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  color: rgb(255, 255, 255);
`;

const DivWrap = styled.div`
  div {
    margin: 10px 0;
  }
`;
