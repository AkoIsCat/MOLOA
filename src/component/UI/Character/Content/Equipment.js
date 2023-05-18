import Characteristics from './Equipment/Characteristics';
import CharacterEquipmentPart from './Equipment/CharacterEquipmentPart';
import CharacterGemsPart from './Equipment//CharacterGemsPart';
import CharacterCards from './Equipment/CharacterCards';

import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 20px 0;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;

const Equipment = ({
  equipment,
  engraving,
  gems,
  combatSkills,
  profile,
  cards,
  getGems,
}) => {
  const getGemsList = (data) => {
    getGems(data);
  };

  useEffect(() => {
    document.cookie = 'safeCookie1=foo; SameSite=Lax';
    document.cookie = 'safeCookie2=foo';
    document.cookie = 'crossCookie=bar; SameSite=None; Secure';
  }, []);

  return (
    <Wrap>
      <CharacterEquipmentPart equipment={equipment} engraving={engraving} />
      <CharacterGemsPart gems={gems} getGemsList={getGemsList} />
      <Characteristics
        combatSkills={combatSkills}
        profile={profile}
        engraving={engraving}
      />
      <CharacterCards cards={cards} />
    </Wrap>
  );
};

export default React.memo(Equipment);
