import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirebaseData } from '../api/Firebase/FirebaseAxios';
import { useQuery } from 'react-query';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import Loading from '../components/UI/Loading';

const Notification = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery('notification', () =>
    getFirebaseData(`MoloaNoti/${id}`)
  );

  return (
    <Background>
      <Header />
      <ContainerBox>
        {isLoading && <Loading />}
        {!isLoading && (
          <ContentWrap>
            <h1>{data.Title}</h1>
            <p>{data.Date}</p>
            <DivWrap>
              {data.Content.split('\\n').map((item) => (
                <div key={data.id}>{item}</div>
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
