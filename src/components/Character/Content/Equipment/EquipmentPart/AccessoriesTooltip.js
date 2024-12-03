import styled from 'styled-components';

const AccessoriesTooltip = ({ item, quality }) => {
  console.log('tooltip', item);
  return item && item.Type !== '팔찌' ? (
    <AccessoriesTooltipWrap>
      <div className="defaultEffectWrap">
        <div
          style={{
            color: 'rgb(254, 150, 0)',
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {item.ItemName}
        </div>
        {quality !== -1 && (
          <QualityText quality={quality}>품질 {quality}</QualityText>
        )}
        <DefaultEffectBox>
          {item.TooltipValue.defaultEffect.split('<BR>').map((item) => (
            <div key={item.slice(0, 2)}>{item}</div>
          ))}
        </DefaultEffectBox>
        <div>{item.TooltipValue.grade}</div>
        <div>{item.TooltipValue.point}</div>
        {item.TooltipValue.characteristic && (
          <div>
            {item.TooltipValue.characteristic &&
              item?.TooltipValue?.characteristic[0] &&
              item?.TooltipValue?.characteristic[0]}
          </div>
        )}
        {item.TooltipValue.characteristic && (
          <div>
            {item.TooltipValue.characteristic &&
              item?.TooltipValue?.characteristic[1] &&
              item?.TooltipValue?.characteristic[1]}
          </div>
        )}
      </div>
      <div className="vitalityWrap">
        <div>{item.TooltipValue.engrave1}</div>
        <div>{item.TooltipValue.engrave2}</div>
        <div className="decrease">{item.TooltipValue.engrave3}</div>
      </div>
    </AccessoriesTooltipWrap>
  ) : (
    <AccessoriesTooltipWrap>
      <div className="vitalityWrap">
        <div
          style={{
            color: 'rgb(254, 150, 0)',
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {item.ItemName}
        </div>
        {item.TooltipValue.breceletEffect.map((items, index) =>
          !items.name ? (
            <div key={index}>{items}</div>
          ) : (
            <div className="elixirWrap" key={index}>
              <div>{items.name}</div>
              <div>{items.effect}</div>
            </div>
          )
        )}
      </div>
    </AccessoriesTooltipWrap>
  );
};

export default AccessoriesTooltip;

const AccessoriesTooltipWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  background-color: rgb(41, 46, 51, 1);
  border-radius: 10px;
  width: 240px;
  transform: translate(25%, 0%);
  color: #fff;
  font-family: 'Nanum Gothic';
  font-size: 15px;
  z-index: 100;

  @media ${(props) => props.theme.mobile} {
    left: 27%;
    font-size: 13px;
    width: 180px;
  }

  div {
    margin: 0;
    padding: 0;
  }

  .defaultEffectWrap {
    width: 80%;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #c1c1c1;
    div {
      width: auto;
      margin: 0 auto;
      padding: 5px 0px;
    }
  }

  .vitalityWrap {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    .decrease {
      color: #d32614;
    }

    div {
      width: auto;
      margin: 0 auto;
      padding: 5px 0px;
    }
  }

  .elixirWrap {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    div {
      width: auto;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      padding: 5px 0px;
      text-align: center;
    }
  }

  .levelWrap {
    width: 80%;
    height: 50px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    div {
      display: flex;
      margin: 0 auto;
      padding: 5px 0px;
    }
  }
`;

const QualityText = styled.div`
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
      : '#FFCD12'};
`;

const DefaultEffectBox = styled.div`
  display: flex;
  flex-direction: column;
`;
