import Characteristics from './Equipment/Characteristics';
import CharacterEquipmentPart from './Equipment/EquipmentPart/CharacterEquipmentPart';
import CharacterGemsPart from './Equipment/CharacterGemsPart';
import CharacterCards from './Equipment/CharacterCards';
import Loading from '../../UI/Loading';

import React from 'react';
import styled from 'styled-components';

const Equipment = ({
  equipment,
  equipmentIsLoading,
  engraving,
  engravingIsLoading,
  gems,
  gemsIsLoading,
  combatSkills,
  combatSkillsIsLoading,
  profile,
  profileIsLoading,
  cards,
  cardsIsLoading,
  getGems,
}) => {
  const getGemsList = (data) => {
    getGems(data);
  };

  return (
    <Wrap>
      {equipmentIsLoading && engravingIsLoading ? (
        <Loading />
      ) : (
        <CharacterEquipmentPart equipment={equipment} engraving={engraving} />
      )}
      {gemsIsLoading ? (
        <Loading />
      ) : (
        <CharacterGemsPart gems={gems} getGemsList={getGemsList} />
      )}
      {combatSkillsIsLoading && profileIsLoading && engravingIsLoading ? (
        <Loading />
      ) : (
        <Characteristics
          combatSkills={combatSkills}
          profile={profile}
          engraving={engraving}
        />
      )}
      {cardsIsLoading ? <Loading /> : <CharacterCards cards={cards} />}
    </Wrap>
  );
};

export default React.memo(Equipment);

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 20px 0;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;
