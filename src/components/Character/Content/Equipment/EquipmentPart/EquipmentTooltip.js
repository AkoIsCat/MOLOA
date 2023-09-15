import styled from 'styled-components';

const EquipmentTooltip = ({ item }) => {
  return item.Type !== '무기' ? (
    <EquipmentTooltipWrap>
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
        <QualityText quality={item.TooltipValue.itemQuality}>
          품질 {item.TooltipValue.itemQuality}
        </QualityText>
        <div>{item.TooltipValue.physics}</div>
        <div>{item.TooltipValue.magic}</div>
        <div>{item.TooltipValue.characteristic}</div>
        <div>{item.TooltipValue.health}</div>
      </div>
      {item.TooltipValue.vitality && (
        <div className="vitalityWrap">
          {item.TooltipValue.vitality !== undefined &&
            item.TooltipValue.vitality.includes('<BR>') !== undefined && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{item.TooltipValue.vitality.split('<BR>')[0]}</div>
                <div>{item.TooltipValue.vitality.split('<BR>')[1]}</div>
                <div>{item.TooltipValue.vitality.split('<BR>')[2]}</div>
              </div>
            )}
          {item.TooltipValue.vitality !== undefined &&
            item.TooltipValue.vitality.includes('<BR>') === undefined && (
              <div>{item.TooltipValue.vitality}</div>
            )}
        </div>
      )}
      {item.TooltipValue.elixir1 !== undefined && (
        <div className="elixirWrap">
          <div>
            {item.TooltipValue.elixir1 &&
              item.TooltipValue.elixir1.map((item, index) => (
                <EffectNameColorBox key={index} color={index}>
                  {item}
                </EffectNameColorBox>
              ))}
          </div>
          <div>
            {item.TooltipValue.elixir2 &&
              item.TooltipValue.elixir2.map((item, index) => (
                <EffectNameColorBox key={index} color={index}>
                  {item}
                </EffectNameColorBox>
              ))}
          </div>
        </div>
      )}
      <div className="levelWrap">
        <div>{item.TooltipValue.level}</div>
        <div>{item.TooltipValue.itemName}</div>
        <div>{item.TooltipValue.itemLevel}</div>
      </div>
    </EquipmentTooltipWrap>
  ) : (
    <EquipmentTooltipWrap>
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
        <QualityText quality={item.TooltipValue.itemQuality}>
          품질 {item.TooltipValue.itemQuality}
        </QualityText>
        <div>{item.TooltipValue.offensePower}</div>
      </div>
      {item.TooltipValue.additionalDamage && (
        <div className="vitalityWrap">
          <div>{item.TooltipValue.additionalDamage}</div>
        </div>
      )}
      {!isNaN(item.TooltipValue.elixirTotalLevel) && (
        <div className="ElixirWrap">
          <div className="totalElixir">
            <div className="ElixirItem">
              연성 레벨 합 :
              <div className="level">
                {item.TooltipValue.elixirTotalLevel &&
                  item.TooltipValue.elixirTotalLevel}
              </div>
            </div>
            <div className="ElixirItem">{item.TooltipValue.activateElixir}</div>
          </div>
        </div>
      )}

      <div className="levelWrap">
        <div>{item.TooltipValue.level}</div>
        <div>{item.TooltipValue.itemName}</div>
        <div>{item.TooltipValue.itemLevel}</div>
      </div>
    </EquipmentTooltipWrap>
  );
};

export default EquipmentTooltip;

const EquipmentTooltipWrap = styled.div`
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
    left: 25%;
    font-size: 13px;
    width: 200px;
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
    border-bottom: 1px solid #c1c1c1;
    padding: 10px;

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
    border-bottom: 1px solid #c1c1c1;
    padding: 10px;

    div {
      width: auto;
      margin: 0 auto;
    }
  }

  .ElixirWrap {
    margin: 5px 0;
  }

  .totalElixir {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #c1c1c1;
    padding: 0px;

    .level {
      margin-left: 5px;
      color: #e4ba27;
    }
  }

  .ElixirItem {
    margin: 5px 0;
  }

  .elixirWrap {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #c1c1c1;
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

const EffectNameColorBox = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: ${(props) => props.color === 0 && '#e4b021'};

  div {
    width: auto;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 5px 0px;
    text-align: center;
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
      : '#fe9600'};
`;
