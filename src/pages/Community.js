import styled from 'styled-components';
import Background from '../components/UI/BackBox';
import Header from '../components/Header/Header';
import Footer from '../components/UI/Footer';
import { Container } from './Home';
import { Message } from './Character';
import SignIn from '../components/Community/SignIn';
import { useEffect, useState } from 'react';
import { getNickname, signInData } from '../api/Sign/SignAxios';
import SignButton from '../components/UI/SignButton';

const list = [
  {
    post_id: 1,
    post_title: '첫 글',
    author: '으네',
    comment_count: 0,
    post_date: 0,
    view_count: 0,
    like_count: 0,
  },
];

const Coummunity = () => {
  const toggle = false;
  const [nickname, setNickname] = useState(undefined);

  const getNicknameData = async () => {
    const response = await getNickname();
    setNickname(response.nickname);
  };

  useEffect(() => {
    toggle && getNicknameData();
  }, [toggle, nickname]);

  const onClickSignIn = async (data) => {
    const response = await signInData(data);
    if (response.success) {
      localStorage.setItem('userId', data.id);
      const nicknameRes = await getNickname();
      setNickname(nicknameRes.nickname);
      alert('로그인에 성공하였습니다.');
    } else if (response.data.error) {
      alert('아이디나 비밀번호가 일치하지 않습니다.');
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem('userId');
    setNickname(undefined);
  };

  return (
    <Background>
      <Header />
      <ContainerBox>
        {!toggle && <Message>페이지 준비 중 입니다.</Message>}
        {toggle && (
          <>
            <Side>
              <SignIn
                nickname={nickname}
                onClickLogout={onClickLogout}
                onClickSignIn={onClickSignIn}
              />
            </Side>
            <Section>
              <h1>커뮤니티</h1>
              <Table border="1">
                <thead>
                  <tr>
                    <th className="number">번호</th>
                    <th className="title">제목</th>
                    <th className="writer">작성자</th>
                    <th className="date">등록일</th>
                    <th className="views">조회수</th>
                    <th className="like">좋아요</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr>
                      <td className="number">{item.post_id}</td>
                      <td className="title">{item.post_title}</td>
                      <td className="writer">{item.author}</td>
                      <td className="date">{item.post_date}</td>
                      <td className="views">{item.view_count}</td>
                      <td className="like">{item.like_count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ButtonWrap>
                <SignButton name="목록" />
                <SignButton name="글쓰기" />
              </ButtonWrap>
            </Section>
          </>
        )}
      </ContainerBox>
      <Footer />
    </Background>
  );
};

export default Coummunity;

const ContainerBox = styled(Container)`
  width: 100%;
  min-height: 75vh;
  height: auto;
  position: relative;
`;

const Side = styled.aside`
  width: 20vw;
  height: auto;
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Section = styled.section`
  width: 95%;

  h1 {
    color: #c1c1c1;
    margin-right: 20px;
    text-align: center;
  }
`;

const Table = styled.table`
  margin-right: 20px;
  border: none;
  border-top: 1px solid lightgray;
  color: #c1c1c1;
  border-collapse: collapse;

  td {
    border-bottom: 1px solid lightgray;
  }

  thead {
    height: 30px;
    border-bottom: 1px solid lightgray;
    background: ;
  }

  tbody {
    height: 30px;
  }

  .number,
  .writer,
  .date,
  .views,
  .like {
    width: 5vw;
    text-align: center;
  }

  .title {
    width: 35vw;
  }
`;

const ButtonWrap = styled.div`
  margin: 10px 45px;
  display: flex;
  justify-content: flex-end;
`;
