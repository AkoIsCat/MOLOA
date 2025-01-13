import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirebaseData } from '../../api/Firebase/FirebaseAxios';
import { useGetLostArkData } from '../../hooks/useGetLostArkData';
import { updateCharacter } from '../../utils/updateCharacter';
import { getArkpassive } from '../../api/LostArk/LostarkAxios';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';

import { BsSearch } from 'react-icons/bs';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const trimInput = searchInput.trim();

  const navigate = useNavigate();

  const { data: jobEngravings } = useQuery(
    'jobEngravings',
    () => getFirebaseData('JobEngraving'),
    {
      select: (data) => Object.values(data),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const { refetch } = useGetLostArkData(
    'arkpassive',
    trimInput,
    getArkpassive,
    {
      enabled: false, // 자동으로 실행되지 않도록 설정
    }
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (trimInput.length !== 0) {
      try {
        // Arkpassive 데이터 요청
        const { data: arkpassiveData } = await refetch();
        console.log('앜패', arkpassiveData);
        // 데이터가 받아와지면 처리
        if (arkpassiveData) {
          updateCharacter(
            trimInput,
            jobEngravings,
            arkpassiveData.IsArkPassive,
            arkpassiveData.Effects
          );
          navigate(`/character/${trimInput}`);
          setSearchInput('');
        }
      } catch (error) {
        console.error('Failed to fetch arkpassive data:', error);
      }
    }
  };
  return (
    <BackgroundSearch>
      <NavLinkTitle to="/">
        <Title>MOLOA</Title>
      </NavLinkTitle>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchInput
          autoComplete="off"
          id="search-input"
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

const BackgroundSearch = styled.div`
  width: 1302px;
  height: 128px;
  background: linear-gradient(to right, #252b2e 50%, #202427);
  border-bottom: 1px solid #373e44;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SearchForm = styled.form`
  width: auto;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
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

  @media ${(props) => props.theme.mobile} {
    width: 100%;
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

  @media ${(props) => props.theme.mobile} {
    top: 18%;
    right: 0%;
  }
`;

const Title = styled.h1`
  color: white;
  margin: 5px;
  cursor: pointer;
`;

const NavLinkTitle = styled(NavLink)`
  text-decoration: none;
`;
