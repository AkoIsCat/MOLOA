import styled from 'styled-components';
import { useState, Fragment } from 'react';
import EquipmentTooltip from './EquipmentTooltip';

const EquipmentDetail = ({
  equipment,
  equipmentList,
  sortEquipmentTooltip,
}) => {
  const EquipmentBox = ({ item, index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <>
        <div>
          {showTooltip && <EquipmentTooltip item={item} />}
          {equipmentList[0].TooltipValue !== undefined &&
            equipment.map(
              (items) =>
                items.Type === item.Type && (
                  <Fragment key={item.Type}>
                    <ImageBox
                      onMouseOver={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <ImageBoxColor key={items.Tooltip} exist={items.Grade}>
                        <img src={items.Icon} alt="장비" />
                      </ImageBoxColor>
                    </ImageBox>
                    <div className="desc">
                      <div className="type">
                        <span className="item">+{item.ItemEnforce}</span>
                        <span className="item">{item.ItemName}</span>
                      </div>
                      <PercentBar
                        quality={
                          sortEquipmentTooltip[index] &&
                          sortEquipmentTooltip[index]['Element_001'].value
                            .qualityValue
                        }
                      >
                        {item.TooltipValue.advancedReforging && (
                          <span className="aR">
                            (+{item.TooltipValue.advancedReforging})
                          </span>
                        )}
                        <p>
                          {sortEquipmentTooltip[index] &&
                            sortEquipmentTooltip[index]['Element_001'].value
                              .qualityValue}
                        </p>
                        <div>
                          <div></div>
                        </div>
                      </PercentBar>
                    </div>
                  </Fragment>
                )
            )}
          {equipmentList[0].TooltipValue === undefined && <div></div>}
        </div>
      </>
    );
  };

  return (
    <>
      {equipmentList.map((item, index) => (
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
    color: #85af3a;
  }
`;
