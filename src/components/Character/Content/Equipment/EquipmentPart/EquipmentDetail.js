import styled from 'styled-components';
import { useState, Fragment } from 'react';
import EquipmentTooltip from './EquipmentTooltip';
import transcendence from '../../../../../asset/icon/transcendence.png';
import removeTag from '../../../../../utils/removeTag';

const EquipmentDetail = ({ equipment }) => {
  const EquipmentBox = ({ item, index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <>
        <div>
          {showTooltip && <EquipmentTooltip item={item} />}
          <Fragment key={item.Type}>
            <ImageBox
              onMouseOver={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <ImageBoxColor key={item.ItemName} exist={item.Grade}>
                <img src={item.Icon} alt="장비" />
              </ImageBoxColor>
            </ImageBox>
            <div className="desc">
              <div className="type">
                <span className="item single">
                  +{item.SingleText.slice(0, 2)}
                </span>
                <span className="item">{item.ItemName}</span>
              </div>
              <PercentBar quality={item.ItemTitle}>
                <span className="aR">
                  <img src={transcendence} width={20} alt="초월 아이콘" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: removeTag(
                        removeTag(
                          item.IndentStrings[0].IdenStringGroup2.split('총')[1],
                          'img'
                        ),
                        'FONT'
                      ).replace(/개$/, ''),
                    }}
                  />
                </span>
                <p>{item.ItemTitle}</p>
                <div>
                  <div></div>
                </div>
              </PercentBar>
            </div>
          </Fragment>

          {<div></div>}
        </div>
      </>
    );
  };

  return (
    <>
      {equipment.map((item, index) => (
        <EquipmentBox item={item} index={index} key={index} />
      ))}
    </>
  );
};

export default EquipmentDetail;

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

  .aR {
    color: #fff;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: inline-block;
    }
    div {
      background: transparent;
      display: inline-block;
      margin-bottom: 0;
      margin-top: 5px;
    }
  }
`;
