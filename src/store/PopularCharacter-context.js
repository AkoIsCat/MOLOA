import React from 'react';

const PopularCharacterContext = React.createContext({
  items: [],
  searchCharacter: (name) => {},
});

export default PopularCharacterContext;
