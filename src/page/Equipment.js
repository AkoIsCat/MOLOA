import styled from 'styled-components';
import Header from '../component/header/Header';
import Background from '../component/UI/BackBox';

import { Container } from './Home';
import CommonContentBox from '../component/UI/Home/RightAside/CommonContentBox';
import Portal from '../component/Modal/Portal';

import { useState } from 'react';
import Modal from '../component/Modal/Modal';
import Footer from '../component/UI/Footer';

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 100vh;
  height: auto;
  position: relative;
`;

const InnerMargin = styled.div`
  margin: 100px 100px 0 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    margin: 0;
  }
`;

const InnerContent = styled.div`
  width: 387px;
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 60px 40px 90px;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const ContentBox = styled.div`
  width: 387px;
  background: #292e33;
  height: ${(props) => (props.height ? props.height : '')};
  color: #c1c1c1;
  border-radius: 0 0 10px 10px;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;

const Text = styled.div`
  padding: 25px;

  @media ${(props) => props.theme.mobile} {
    padding: 15px;
    font-size: 14px;
  }
`;

const Equipment = () => {
  const [modalOn, setModalOn] = useState(false);

  const modalHandler = () => {
    setModalOn(!modalOn);
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <InnerMargin>
          <InnerContent height="151px" onClick={modalHandler}>
            <CommonContentBox title="경매 계산기 (쌀산기)" equipment="true" />
            <ContentBox height="110px">
              <Text>
                던전, 레이드 종료 후 전리품 경매 시 최적 입찰금액을 계산합니다.
              </Text>
            </ContentBox>
          </InnerContent>
          {modalOn && (
            <Portal>
              <Modal onClose={modalHandler} />
            </Portal>
          )}
          <InnerContent
            height="151px"
            onClick={() => window.open(`https://loa.icepeng.com/`, '_blank')}
          >
            <CommonContentBox
              title="아이스펭 (로스트아크 최적화 계산기)"
              equipment="true"
            />
            <ContentBox height="110px">
              <Text>
                재련 최적화, 각인 최적화 등 로스트아크를 효율적으로 즐기고
                싶으실 때 도움이 되는 사이트입니다.
              </Text>
            </ContentBox>
          </InnerContent>
          <InnerContent
            height="151px"
            onClick={() => window.open(`https://ialy1595.me/kouku/`, '_blank')}
          >
            <CommonContentBox title="빙파고" equipment="true" />
            <ContentBox height="110px">
              <Text>
                쿠크세이튼 3관문 0줄 빙고 기믹을 보다 쉽게 클리어할 수 있게
                해주는 도우미입니다.
              </Text>
            </ContentBox>
          </InnerContent>
          <InnerContent
            height="151px"
            onClick={() => window.open(`https://heehoon.kim/dolpago`, '_blank')}
          >
            <CommonContentBox title="돌파고" equipment="true" />
            <ContentBox height="110px">
              <Text>
                어빌리티 스톤이 목표한 세공 수치에 도달하도록 확률을 계산하여
                선택을 추천해줍니다.
              </Text>
            </ContentBox>
          </InnerContent>
        </InnerMargin>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Equipment;
