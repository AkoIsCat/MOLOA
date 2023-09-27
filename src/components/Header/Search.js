import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getFirebaseData } from '../../api/Firebase/FirebaseAxios';
import { updateCharacter } from '../../utils/updateCharacter';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const trimInput = searchInput.trim();
  const [JobEngravings, setJobEngravings] = useState([]);

  const engraving = JobEngravings;

  const navigate = useNavigate();

  useEffect(() => {
    const loadEngravings = async () => {
      const data = await getFirebaseData('JobEngraving');
      setJobEngravings(Object.values(data));
    };
    loadEngravings();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (trimInput.length !== 0) {
      navigate(`/character/${trimInput}`);
      setSearchInput('');
    }
    updateCharacter(trimInput, engraving);
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
