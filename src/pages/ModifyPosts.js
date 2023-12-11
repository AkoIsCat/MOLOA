import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import PostsButton from '../components/UI/PostsButton';
import Footer from '../components/UI/Footer';
import { useState } from 'react';

const ModifyPosts = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  let initialPosts = {
    title: state.post_title,
    contents: state.post_contents,
  };

  const [inputData, setInputData] = useState(initialPosts);

  const onChangeTitle = (e) => {
    setInputData({
      ...inputData,
      title: e.target.value,
    });
  };

  const onChangeContents = (e) => {
    setInputData({
      ...inputData,
      contents: e.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const isEmptyTitle = inputData.title.length === 0;
    const isEmptyContents = inputData.contents.length === 0;

    if (isEmptyTitle) {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (isEmptyContents) {
      alert('내용을 입력해 주세요.');
      return;
    }
  };

  const onConfirmBtn = () => {
    if (
      window.confirm('작성중인 게시글 내용이 사라집니다. 이동하시겠습니까?')
    ) {
      navigate('/community');
    }
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        <Title>게시글 수정</Title>
        <Form onSubmit={onSubmitForm}>
          <Input
            type="text"
            id="title"
            placeholder="제목을 입력해 주세요."
            value={inputData.title}
            onChange={onChangeTitle}
          />
          <Textarea
            id="contents"
            placeholder="내용을 입력해 주세요."
            value={inputData.contents}
            onChange={onChangeContents}
          />
          <ButtonWrap>
            <PostsButton onClick={() => onConfirmBtn()} name="목록" />
            <SubmitButton>수정</SubmitButton>
          </ButtonWrap>
        </Form>
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default ModifyPosts;

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
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  width: 8%;
  height: 40px;
  border-radius: 10px;
  border: 0;
  margin: 5px;
  outline: none;
  background: skyblue;
  cursor: pointer;
  font-family: 'Nanum Gothic';
  font-size: 14px;

  &:hover {
    background: #358ed0;
  }
`;
