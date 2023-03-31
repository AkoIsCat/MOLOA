import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackgroundSearch = styled.div`
  width: 1302px;
  height: 128px;
  background: linear-gradient(to right, #252b2e 50%, #202427);
  border-bottom: 1px solid #373e44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  width: auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 944px;
  height: 44px;
  background: linear-gradient(to right, #252b2e 30%, #1e2225);
  border: 1px solid #373e44;
  border-radius: 8px;
  margin-bottom: 22px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  line-height: 44px;
  padding-left: 15px;
  font-family: 'Nanum Gothic';
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.button`
  position: absolute;
  top: 13px;
  right: 15px;
  color: #373e44;
  font-size: 22px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

const Title = styled.h1`
  color: white;
  margin: 5px;
  cursor: pointer;
`;

const NavLinkTitle = styled(NavLink)`
  text-decoration: none;
`;

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const trimInput = searchInput.trim();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (trimInput.length !== 0) {
      navigate(`/character/${trimInput}`);
      setSearchInput('');
    }

    const response = await fetch(
      `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`
    );
    const data = await response.json();

    if (data) {
      // 이미 등록된 닉네임인 경우 조회수를 업데이트
      const updatedData = {
        ...data,
        views: data.views + 1,
      };
      await fetch(
        `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        }
      );
    } else {
      // 새로운 닉네임인 경우 데이터를 추가
      const newData = {
        name: trimInput,
        views: 1,
      };
      await fetch(
        `https://lostark-bf0ba-default-rtdb.firebaseio.com/CharacterSearch/${trimInput}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newData),
        }
      );
    }
  };

  return (
    <BackgroundSearch>
      <NavLinkTitle to="/home">
        <Title>MOLOA.GG</Title>
      </NavLinkTitle>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchInput
          type="text"
          placeholder="캐릭터 검색"
          onChange={(e) => setSearchInput(e.target.value)}
          value={trimInput || ''}
        />
        <SearchIcon type="submit">
          <BsSearch />
        </SearchIcon>
      </SearchForm>
    </BackgroundSearch>
  );
};

export default Search;
