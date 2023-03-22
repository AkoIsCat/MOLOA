import React, { useState } from 'react';

function Example() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(
      `https://update-character-default-rtdb.firebaseio.com/nicknames/${searchInput}.json`
    );
    const data = await response.json();
    if (data) {
      // 이미 등록된 닉네임인 경우 조회수를 업데이트
      const updatedData = {
        ...data,
        views: data.views + 1,
      };
      await fetch(
        `https://update-character-default-rtdb.firebaseio.com/nicknames/${searchInput}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedData),
        }
      );
      setSearchResult(updatedData);
    } else {
      // 새로운 닉네임인 경우 데이터를 추가
      const newData = {
        views: 1,
      };
      await fetch(
        `https://update-character-default-rtdb.firebaseio.com/nicknames/${searchInput}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newData),
        }
      );
      setSearchResult(newData);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResult && (
        <p>
          Nickname: {searchInput}, Views: {searchResult.views}
        </p>
      )}
    </div>
  );
}

export default Example;
