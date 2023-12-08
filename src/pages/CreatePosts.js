import styled from 'styled-components';
import { useRef } from 'react';
import { writingPosts } from '../api/Posts/PostAxios';
import { useNavigate } from 'react-router-dom';

import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import { Container } from './Home';
import Footer from '../components/UI/Footer';
import PostsButton from '../components/UI/PostsButton';
import { useEffect } from 'react';

const CreatePosts = () => {
  const titleRef = useRef();
  const contentsRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      alert('로그인 후 작성 가능합니다.');
      navigate('/community');
    }
  }, [navigate]);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const isEmptyTitle = titleRef.current?.value.length === 0;
    const isEmptyContents = contentsRef.current?.value?.length === 0;

    if (isEmptyTitle) {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (isEmptyContents) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const data = {
      id: localStorage.getItem('userId'),
      post_title: titleRef.current.value,
      post_contents: contentsRef.current.value,
    };

    const response = await writingPosts(data);

    if (response) {
      alert(response);
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
        <Title>게시글 작성</Title>
        <Form onSubmit={onSubmitForm}>
          <Input placeholder="제목을 입력해 주세요." ref={titleRef} />
          <Textarea placeholder="내용을 입력해 주세요." ref={contentsRef} />
          <ButtonWrap>
            <PostsButton onClick={() => onConfirmBtn()} name="목록" />
            <SubmitButton>등록</SubmitButton>
          </ButtonWrap>
        </Form>
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
