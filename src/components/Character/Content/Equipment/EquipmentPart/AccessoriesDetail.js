import styled from 'styled-components';
import { useState } from 'react';

import AccessoriesTooltip from './AccessoriesTooltip';
import StoneDetail from './StoneDetail';

const AccessoriesDetail = ({ accessories, stone, bracelet }) => {
  if (!accessories) {
    return;
  }
  const FullData = [...accessories, stone, bracelet].filter(Boolean); // 악세, 스톤, 팔찌를 모두 합친 데이터

  const AccessoriesBox = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const stoneIsTrue = item.partName.includes('스톤');
    const braceletIsTrue = item.partName.includes('팔찌');

    return (
      <>
        <div>
          {showTooltip && (
            <AccessoriesTooltip item={item} quality={item.qualityValue} />
          )}
          {
            <Wrap>
              <ImageBox>
                <ImageBoxColor exist={item.Grade}>
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt="악세"
                      onMouseOver={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    />
                  )}
                </ImageBoxColor>
                {!(
                  item.partName.includes('스톤') ||
                  item.partName.includes('팔찌')
                ) && (
                  <PercentBar
                    quality={item.qualityValue}
                    key={`${item.qualityValue} ${item.ItemName} `}
                  >
                    <p>{item.qualityValue}</p>
                    <div>
                      <div></div>
                    </div>
                  </PercentBar>
                )}
              </ImageBox>
              {!(stoneIsTrue || braceletIsTrue) && (
                <div className="desc">
                  {<p className="type">{item.ItemName}</p>}
                  {
                    <AcEffectBox>
                      <GradePoint className="m-l-5">
                        <div>{item?.Grade}</div>
                        <div>
                          {item?.itemPartBox?.AwakeNumber.split(' ')[1]}
                        </div>
                      </GradePoint>
                      <AcEffect>
                        {item?.itemPartBox?.GrindingEffect.split('<br>').map(
                          (data) => (
                            <div
                              key={data}
                              dangerouslySetInnerHTML={{ __html: data }}
                            />
                          )
                        )}
                      </AcEffect>
                    </AcEffectBox>
                  }
                </div>
              )}
              {stoneIsTrue && <StoneDetail item={stone} />}
              {braceletIsTrue && (
                <div className="desc">
                  <p className="type">{item.itemName}</p>
                  <p className="type">
                    <span>{item.partName}</span>
                  </p>
                </div>
              )}
            </Wrap>
          }
          {accessories === undefined && <div></div>}
        </div>
      </>
    );
  };

  return (
    <>
      {accessories &&
        FullData.map((item, index) => (
          <AccessoriesBox
            item={item}
            index={index}
            stone={stone}
            bracelet={bracelet}
            key={`${index + 1} ${item.ItemName}`}
          />
        ))}
      {/* <EffectTotal>
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
      </EffectTotal> */}
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

// const EffectTotal = styled.div`
//   font-family: 'Nanum Gothic';
//   color: #fff;
//   display: flex;
//   align-items: center;
//   margin: 10px 0;

//   img {
//     margin: 5px 0 0 0;
// }
//   }

//   .elixir {
//     margin: 0 5px;
//     color: rgb(254, 150, 0);
//   }

//   .activeExlixir {
//     margin: 0 5px;
//     color: #ffd200;
//   }

//   .transcendence {
//     margin: 0 5px;
//   }
// `;

const AcEffectBox = styled.div`
  display: flex;
`;

const GradePoint = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: 5px;
`;

const AcEffect = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11.5px;
  height: 50px;
  margin: 0 0 0 10px;

  div {
    width: 165px;
    padding: 0 0 0 10px;
    font-size: 10px;
  }
`;

const Wrap = styled.div`
  margin-bottom: 6px;
`;
