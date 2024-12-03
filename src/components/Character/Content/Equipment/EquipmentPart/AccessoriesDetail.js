import styled from 'styled-components';
import { useState } from 'react';

import AccessoriesTooltip from './AccessoriesTooltip';
import { BsDot } from 'react-icons/bs';

const AccessoriesDetail = ({
  equipment,
  accessoriesList,
  sortAccessoriesTooltip,
  stoneAndBracelet,
  breceletEffectList,
  stoneIndex,
  transcendenceTotalNum,
}) => {
  const filterAccessories =
    equipment &&
    equipment.filter(
      (item) =>
        item.Type !== '투구' &&
        item.Type !== '무기' &&
        item.Type !== '상의' &&
        item.Type !== '하의' &&
        item.Type !== '어깨' &&
        item.Type !== '장갑' &&
        item.Type !== '부적' &&
        item.Type !== '나침반'
    );

  console.log(accessoriesList);

  const removeSpecificString = (elementNumber) => {
    return (
      stoneAndBracelet[0] !== undefined &&
      stoneAndBracelet[0][stoneIndex] &&
      stoneAndBracelet[0][stoneIndex].value['Element_000'].contentStr[
        elementNumber
      ].contentStr
        .split('</FONT>')[1]
        .replace(/[^0-9]/g, '')
    );
  };

  const AccessoriesBox = ({ item, index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const quality =
      sortAccessoriesTooltip &&
      sortAccessoriesTooltip[index] &&
      sortAccessoriesTooltip[index]['Element_001'].value.qualityValue;

    return (
      <>
        <div>
          {showTooltip && <AccessoriesTooltip item={item} quality={quality} />}
          {accessoriesList[index].TooltipValue !== undefined && (
            <>
              <ImageBox>
                <ImageBoxColor
                  key={filterAccessories && filterAccessories[index]?.Name}
                  exist={
                    filterAccessories[index] !== undefined &&
                    filterAccessories[index].Grade
                  }
                >
                  {filterAccessories && filterAccessories[index] && (
                    <img
                      key={filterAccessories[index].Icon}
                      src={filterAccessories[index].Icon}
                      alt="악세"
                      onMouseOver={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                  )}
                </ImageBoxColor>
                {index < 5 && (
                  <PercentBar
                    quality={quality}
                    key={`${quality} ${
                      filterAccessories && filterAccessories[index]?.Name
                    } `}
                  >
                    <p>{quality}</p>
                    <div>
                      <div></div>
                    </div>
                  </PercentBar>
                )}
              </ImageBox>
              <div className="desc">
                {index < 5 && (
                  <AcEffectBox>
                    <GradePoint>
                      <div>{item.TooltipValue.grade}</div>
                      <div>{item.TooltipValue.point}</div>
                    </GradePoint>
                    <AcEffect>
                      {item.TooltipValue?.trainingEffect
                        ?.split('<BR>')
                        .map((item) => (
                          <div>{item}</div>
                        ))}
                    </AcEffect>
                  </AcEffectBox>
                )}
                {index >= 5 && (
                  <p className="type">
                    {filterAccessories &&
                      filterAccessories[index] &&
                      filterAccessories[index]?.Name}
                  </p>
                )}
                {index === 5 && stoneAndBracelet[0][stoneIndex]?.value && (
                  <div>
                    <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                      {stoneAndBracelet[0][stoneIndex]?.value &&
                        removeSpecificString('Element_000')}
                    </p>
                    <BsDot />
                    <p style={{ margin: '0 8px', color: '#f8f5a4' }}>
                      {stoneAndBracelet[0][stoneIndex]?.value &&
                        removeSpecificString('Element_001')}
                    </p>
                    <BsDot />
                    <p style={{ margin: '0 8px', color: '#832c35' }}>
                      {stoneAndBracelet[0][stoneIndex]?.value &&
                        removeSpecificString('Element_002')}
                    </p>
                  </div>
                )}
                <div style={{ display: 'flex' }}>
                  {index === 6 &&
                    breceletEffectList.map((item) => (
                      <p
                        key={`${item.text} ${item.description}`}
                        style={{ margin: '0 2px 0 4px' }}
                      >
                        {item?.text}
                      </p>
                    ))}
                </div>
              </div>
            </>
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
          <AccessoriesBox
            item={item}
            index={index}
            key={`${index + 1} ${item.ItemName}`}
          />
        ))}
      <EffectTotal>
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lostark-bf0ba.appspot.com/o/transcendence.png?alt=media&token=cddea62b-27e1-489a-a571-07e8e43ff3bb"
            alt="초월 이미지"
            width="18"
            height="18"
          />
        </div>
        <div className="transcendence">초월 합 </div>
        <div className="activeExlixir">
          {transcendenceTotalNum?.length === 0 ? '0개' : transcendenceTotalNum}
        </div>
      </EffectTotal>
    </>
  );
};

export default AccessoriesDetail;

const ImageBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #292e33;
  position: relative;

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

const PercentBar = styled.div`\
  position: absolute;
  width: 95%;
  left: 2.5px;
    bottom: -17px;
  display: flex;

  p {
    position: absolute;
    width: 10px;
    color: black;
    margin: 1.5px 19px;
    font-size: 11px;
  }

  div {
    width: 100%;
    height: 13px;
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

const EffectTotal = styled.div`
  font-family: 'Nanum Gothic';
  color: #fff;
  display: flex;
  align-items: center;
  margin: 10px 0;

  img {
    margin: 5px 0 0 0;
}
  }

  .elixir {
    margin: 0 5px;
    color: rgb(254, 150, 0);
  }

  .activeExlixir {
    margin: 0 5px;
    color: #ffd200;
  }

  .transcendence {
    margin: 0 5px;
  }
`;

const AcEffectBox = styled.div`
  display: flex;
`;

const GradePoint = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const AcEffect = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  height: 50px;
  margin: 0 0 0 10px;

  div {
    width: 165px;
    padding: 0 0 0 10px;
  }
`;
