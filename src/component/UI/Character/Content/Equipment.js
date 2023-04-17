import Characteristics from './Equipment/Characteristics';
import CharacterEquipmentPart from './Equipment/CharacterEquipmentPart';
import CharacterGemsPart from './Equipment//CharacterGemsPart';
import CharacterCards from './Equipment/CharacterCards';

import React from 'react';

const Equipment = ({
  equipment,
  engraving,
  gems,
  combatSkills,
  profile,
  cards,
}) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', padding: '0 20px' }}
    >
      <CharacterEquipmentPart equipment={equipment} engraving={engraving} />
      <CharacterGemsPart gems={gems} />
      <Characteristics
        combatSkills={combatSkills}
        profile={profile}
        engraving={engraving}
      />
      <CharacterCards cards={cards} />
    </div>
  );
};

export default React.memo(Equipment);
