import styled from 'styled-components';
import { useState } from 'react';

const CoreTooltip = ({ item }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <EffectWrap>
      {showTooltip && (
        <div
          className="tooltip"
          dangerouslySetInnerHTML={{ __html: item.Effect }}
        />
      )}
      <div key={item.CoreName} className="arkgrid">
        <img src={item.Icon} alt="코어 이미지" width={40} height={40} />
        <div
          className="skillName coreName"
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <CoreName Grade={item.Grade}>{item.CoreName}</CoreName>
        </div>
      </div>
    </EffectWrap>
  );
};

export default CoreTooltip;

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
    left: 100%;
    transform: translate(-10%, -50%);
    z-index: 9999;

    @media ${(props) => props.theme.mobile} {
      left: 53%;
      top: 100%;
      transform: translate(-50%, 0);
      margin-top: 5px;
    }

    margin: 0;
    padding: 10px;
    color: #c1c1c1;
    font-family: 'Nanum Gothic';
  }
`;

const CoreName = styled.div`
  color: ${(props) =>
    props.Grade === '전설'
      ? '#FFC310'
      : props.Grade === '영웅'
      ? '#ce43fc'
      : props.Grade === '유물'
      ? '#ff8740'
      : '#fff'};
`;
