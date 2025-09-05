import styled from 'styled-components';
import transcendence from '../../../../../asset/icon/transcendence.png';

const EquipmentTooltip = ({ item }) => {
  return item.Type !== '무기' ? (
    <EquipmentTooltipWrap>
      <div className="defaultEffectWrap">
        <div
          style={{
            color: '#fff',
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {item.ItemName}
        </div>
        <ItemContainer>
          <QualityText quality={item.ItemTitle.qualityValue}>
            <span>품질</span>
            <span>{item.ItemTitle.qualityValue}</span>
          </QualityText>
          <ItemContainer>
            <p className="flex no-mp">
              <span className="no-mp">{item.Grade}</span>
              <span className="no-mp">{item.PartName}</span>
            </p>
          </ItemContainer>
          <div className="itemLevel">{item.ItemTitle.itemLevel}</div>
        </ItemContainer>
      </div>
      {item.PartBoxes && (
        <ItemPartBox className="itemPartBox">
          {item.PartBoxes.map((d) =>
            d.includes('진화') ? (
              <div
                key={d}
                dangerouslySetInnerHTML={{ __html: d.split('</FONT>')[0] }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: d }} />
            )
          )}
        </ItemPartBox>
      )}
      {item.IndentStrings && (
        <div className="elixirWrap">
          {item.IndentStrings.map((i) => (
            <div key={i.IdenStringGroup1}>
              <div dangerouslySetInnerHTML={{ __html: i.IdenStringGroup1 }} />
              {i.IdenStringGroup2?.includes('총') ? (
                <div className="row">
                  <img
                    src={transcendence}
                    alt="초월 이미지"
                    width={20}
                    height={20}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: i.IdenStringGroup2 }}
                  />
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: i.IdenStringGroup2 }} />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="levelWrap">
        {item.SingleText && (
          <div className="aR">상급재련 {item.SingleText}</div>
        )}
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
      {/* 엘릭서, 초월 총 합 (해야함) {!isNaN(item.TooltipValue.elixirTotalLevel) && (
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
            {item.TooltipValue.transcendenceStep && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    item.TooltipValue.transcendenceStep.split("'#FF9632'>")[1],
                }}
              ></span>
            )}
          </div>
        </div>
      )} */}
      <div className="levelWrap">
        <div>{item.TooltipValue.level}</div>
        <div>{item.TooltipValue.itemName}</div>
        <div>{item.TooltipValue.itemLevel}</div>
        {item.TooltipValue.advancedReforging && (
          <div className="aR">
            상급재련 {item.TooltipValue.advancedReforging}단계
          </div>
        )}
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
  width: 250px;
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
      padding-top: 5px;
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
    padding: 10px;
    text-align: center;

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

    .row {
      flex-direction: row;
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

    .itemLevel {
      color: rgb(254, 150, 0);
    }

    .aR {
      color: #85af3a;
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
      : '#FFCD12'};
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  justify-content: center;

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .no-mp {
    margin: 0;
    parring: 0;
  }
`;

const ItemPartBox = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
`;
