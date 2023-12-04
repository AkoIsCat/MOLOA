import styled from 'styled-components';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import Footer from '../components/UI/Footer';

const CreatePosts = () => {
  return (
    <Background>
      <Header />
      <ContainerBox>
        <Title>게시글 작성</Title>
        <Form>
          <Input placeholder="제목을 입력해 주세요." />
          <Textarea placeholder="내용을 입력해 주세요." />
        </Form>
        <ButtonWrap>
          <SubmitButton>등록</SubmitButton>
        </ButtonWrap>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default CreatePosts;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #c1c1c1;
  margin: 20px;
`;

const Form = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 25px;
  outline: none;
  margin: 20px 20px;
  padding: 0 10px;
  background: #1e2225;
  color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 300px;
  margin: 20px 20px;
  padding: 10px;
  font-size: 20px;
  outline: none;
  background: #1e2225;
  color: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  width: 70px;
  height: 50px;
  border-radius: 10px;
  border: 0;
  outline: none;
  background: #4b535a;
  cursor: pointer;
  color: #c1c1c1;
  font-size: 18px;

  &:hover {
    background: #6d7276;
  }
`;
