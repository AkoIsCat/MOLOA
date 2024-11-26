import { useState } from 'react';
import styled from 'styled-components';

import removeTag from '../../../../../utils/removeTag';

const EngravingEffectTooltip = ({ item }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <EffectWrap>
      {showTooltip && (
        <div className="tooltip">{removeTag(item.description, 'FONT')}</div>
      )}
      <div
        className="name"
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {item.name}
      </div>
      <div
        className="level"
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Lv. {item.level}
      </div>
    </EffectWrap>
  );
};

export default EngravingEffectTooltip;

const EffectWrap = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 10px;
    padding: 0;
  }

  .name {
    margin: 7px 0;
    color: #fff;
    font-family: 'Nanum Gothic';
  }

  .level {
    margin: 7px 0;
    color: #fff;
    font-family: 'Nanum Gothic';
  }

  .tooltip {
    position: absolute;
    width: 330px;
    height: auto;
    line-height: 1.7em;
    background-color: rgb(41, 46, 51);
    border-radius: 10px;
    top: 50%;
    left: -95%;
    transform: translate(-50%, -50%);

    @media ${(props) => props.theme.mobile} {
      left: 53%;
    }
    margin: 0;
    padding: 10px;
    color: #c1c1c1;
    font-family: 'Nanum Gothic';
  }
`;
