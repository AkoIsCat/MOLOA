import { useReducer } from 'react';

import PopularCharacterContext from './PopularCharacter-context';

const defaultCharacterState = {
  items: [
    {
      name: '설기',
      views: 1,
    },
  ],
};

let idNumber = 0;

const characterReducer = (state, action) => {
  console.log(state.items);

  // if (action.type === 'SEARCH') {
  //   const foundIndex = state.findIndex((data) => data.nickname === action.name);

  //   const existingCartItem = state.items[exitingItemIndex];
  //   let updatedItems;

  //   if (existingCartItem !== -1) {
  //     console.log('yes!!');
  //     const updatedItem = {
  //       ...existingCartItem,
  //       views: state.items[exitingItemIndex].views++,
  //     };
  //     updatedItems = [...state.items];
  //     updatedItems[exitingItemIndex] = updatedItem;
  //     console.log('update3', updatedItem);
  //   } else {
  //     console.log('no..');
  //     const updatedItems = state.items.concat({
  //       name: action.name,
  //       views: state.items.views++,
  //     });

  //     return {
  //       items: updatedItems,
  //     };
  //   }
  // }
};

const PopularCharacterProvider = (props) => {
  const [populerCharacterState, dispatchSearchAction] = useReducer(
    characterReducer,
    defaultCharacterState
  );

  const searchCharacter = (name) => {
    dispatchSearchAction({
      type: 'SEARCH',
      item: { name: name },
    });
  };

  const popularCharacterContext = {
    items: populerCharacterState,
    searchCharacter: searchCharacter,
  };

  return (
    <PopularCharacterContext.Provider value={popularCharacterContext}>
      {props.children}
    </PopularCharacterContext.Provider>
  );
};

export default PopularCharacterProvider;
