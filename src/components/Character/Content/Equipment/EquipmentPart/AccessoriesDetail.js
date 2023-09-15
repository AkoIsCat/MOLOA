import styled from 'styled-components';
import { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';

import AccessoriesTooltip from './AccessoriesTooltip';
import { BsDot } from 'react-icons/bs';

const AccessoriesDetail = ({
  accessoriesList,
  filterAccessories,
  sortAccessoriesTooltip,
  stoneAndBracelet,
  breceletEffectList,
  stoneIndex,
}) => {
  const removeSpecificString = (elementNumber) => {
    return (
      stoneAndBracelet[0] &&
      stoneAndBracelet[0][stoneIndex] &&
      stoneAndBracelet[0][stoneIndex].value['Element_000'].contentStr[
        elementNumber
      ].contentStr.replace(/.*\+(\d+).*/, '$1')
    );
  };

  const AccessoriesBox = ({ item, index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <>
        <div key={nanoid()}>
          {showTooltip && <AccessoriesTooltip item={item} />}
          {accessoriesList[0].TooltipValue !== undefined && (
            <Fragment key={nanoid()}>
              <ImageBox>
                <ImageBoxColor
                  key={nanoid()}
                  exist={
                    filterAccessories[index] !== undefined &&
                    filterAccessories[index].Grade
                  }
                >
                  {filterAccessories && filterAccessories[index] && (
                    <img
                      key={nanoid()}
                      src={filterAccessories[index].Icon}
                      alt="아바타"
                      onMouseOver={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                  )}
                </ImageBoxColor>
              </ImageBox>
              <div className="desc">
                <p className="type">
                  {filterAccessories &&
                    filterAccessories[index] &&
                    filterAccessories[index].Name}
                </p>
                {index < 5 && (
                  <PercentBar
                    quality={
                      sortAccessoriesTooltip &&
                      sortAccessoriesTooltip[index] &&
                      sortAccessoriesTooltip[index]['Element_001'].value
                        .qualityValue
                    }
                    key={nanoid()}
                  >
                    <p>
                      {sortAccessoriesTooltip &&
                        sortAccessoriesTooltip[index] &&
                        sortAccessoriesTooltip[index]['Element_001'].value
                          .qualityValue}
                    </p>
                    <div>
                      <div></div>
                    </div>
                  </PercentBar>
                )}
                {index === 5 && (
                  <div>
                    <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                      {removeSpecificString('Element_000')}
                    </p>
                    <BsDot />
                    <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                      {removeSpecificString('Element_001')}
                    </p>
                    <BsDot />
                    <p style={{ margin: '0 8px', color: '#832c35' }}>
                      {removeSpecificString('Element_002')}
                    </p>
                  </div>
                )}
                <div style={{ display: 'flex' }}>
                  {index === 6 &&
                    breceletEffectList.map((item, index) => (
                      <p key={nanoid()} style={{ margin: '0 2px 0 4px' }}>
                        {item.text}
                      </p>
                    ))}
                </div>
              </div>
            </Fragment>
          )}
          {accessoriesList[0].TooltipValue === undefined && <div></div>}
        </div>
      </>
    );
  };

  return (
    <>
      {accessoriesList &&
        accessoriesList.map((item, index) => (
          <AccessoriesBox item={item} index={index} key={nanoid()} />
        ))}
    </>
  );
};

export default AccessoriesDetail;

const ImageBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #292e33;

  img {
    border-radius: 10px;
    object-fit: contain;
  }

  @media ${(props) => props.theme.mobile} {
    width: 45px;
    height: 45px;
  }
`;

const ImageBoxColor = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.exist === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.exist === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.exist === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : props.exist === '고대'
      ? 'linear-gradient(135deg, #3d3325 0%, #dcc999 100%)'
      : props.exist === '유물'
      ? 'linear-gradient(135deg, #341a09 0%, #a24006 100%)'
      : '#292e33'};
  border-radius: 10px;
`;

const PercentBar = styled.div`
  width: 190px;
  height: 20px;
  margin: 0 5px;
  display: flex;

  p {
    width: 40px;
    color: ${(props) =>
      props.quality === 0
        ? '#fff'
        : props.quality > 0 && props.quality < 11
        ? '#ff0000'
        : props.quality < 30
        ? '#ffd200'
        : props.quality >= 30 && props.quality < 70
        ? '#91fe02'
        : props.quality >= 70 && props.quality < 90
        ? '#00b5ff'
        : props.quality >= 90 && props.quality < 100
        ? '#ce43fc'
        : '#fe9600'};
    margin: 2px 5px;
    text-align: center;
  }

  div {
    width: 100%;
    height: 20px;
    background: #292e33;
    border-radius: 10px;

    div {
      width: ${(props) => props.quality}%;
      background: ${(props) =>
        props.quality === 0
          ? '#fff'
          : props.quality > 0 && props.quality < 11
          ? '#ff0000'
          : props.quality > 10 && props.quality < 30
          ? '#ffd200'
          : props.quality >= 30 && props.quality < 70
          ? '#91fe02'
          : props.quality >= 70 && props.quality < 90
          ? '#00b5ff'
          : props.quality >= 90 && props.quality < 100
          ? '#ce43fc'
          : '#fe9600'};
    }
  }
`;
