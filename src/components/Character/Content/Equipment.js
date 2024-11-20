import Characteristics from './Equipment/CharacteristicsPart/Characteristics';
import CharacterEquipmentPart from './Equipment/EquipmentPart/CharacterEquipmentPart';
import CharacterGemsPart from './Equipment/CharacterGemsPart/CharacterGemsPart';
import CharacterCards from './Equipment/CharacterCards';
import Loading from '../../UI/Loading';
import ArkPassiveEffectsComponent from './Equipment/ArkPassivePart/ArkPassiveEffects';

import React from 'react';
import styled from 'styled-components';
import ArkPassiveEffects from './Equipment/ArkPassivePart/ArkPassiveEffects';

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
  arkpassive,
}) => {
  const getGemsList = (data) => {
    getGems(data);
  };
  console.log(arkpassive);

  return (
    <Wrap>
      {equipmentIsLoading || engravingIsLoading ? (
        <Loading />
      ) : (
        <CharacterEquipmentPart
          equipment={equipment}
          engraving={engraving}
          arkpassive={arkpassive}
        />
      )}
      {gemsIsLoading ? (
        <Loading />
      ) : (
        <CharacterGemsPart gems={gems} getGemsList={getGemsList} />
      )}
      {combatSkillsIsLoading || profileIsLoading || engravingIsLoading ? (
        <Loading />
      ) : (
        <Characteristics
          combatSkills={combatSkills}
          profile={profile}
          engraving={engraving}
          arkpassive={arkpassive}
        />
      )}
      {arkpassive?.IsArkPassive && (
        <ArkPassiveEffectsComponent arkpassive={arkpassive} />
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
