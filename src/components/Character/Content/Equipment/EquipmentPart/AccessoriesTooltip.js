import styled from 'styled-components';
import StoneTooltip from './StoneTooltip';
import BraceletTooltip from './BraceletTooltip';

const AccessoriesTooltip = ({ item }) => {
  return item &&
    !item.partName.includes('팔찌') &&
    !item.partName.includes('스톤') ? (
    <AccessoriesTooltipWrap>
      <div className="defaultEffectWrap">
        <div
          style={{
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {item.ItemName}
        </div>
        <ItemContainer>
          {item.qualityValue !== -1 && (
            <QualityText quality={item.qualityValue}>
              품질 {item.qualityValue}
            </QualityText>
          )}
          {
            <div className="flex">
              <span>{item.Grade}</span>
              <span>{item.partName}</span>
            </div>
          }
          {<div>{item?.itemPartBox?.AwakeNumber}</div>}
        </ItemContainer>
        {
          <DefaultEffectBox>
            {item?.itemPartBox?.BasicEffect.split('<BR>').map((d) => (
              <div
                key={`${item.ItemName} ${d}`}
                dangerouslySetInnerHTML={{ __html: d }}
              />
            ))}
          </DefaultEffectBox>
        }
      </div>
      <div
        className="vitalityWrap"
        dangerouslySetInnerHTML={{ __html: item?.itemPartBox?.GrindingEffect }}
      />
    </AccessoriesTooltipWrap>
  ) : item.partName.includes('스톤') ? (
    <StoneTooltip item={item} />
  ) : (
    <BraceletTooltip item={item} />
  );
};

export default AccessoriesTooltip;

export const AccessoriesTooltipWrap = styled.div`
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
      // width: auto;
      margin: 0 auto;
      padding: 5px 0px;

      .px-1 {
        padding: 0 5px;
      }
    }
  }

  .no-line {
    border: 0;
  }

  .activate {
    color: #f8f5a4;
  }

  .decrease {
    color: #832c35;
  }

  .vitalityWrap {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    div {
      width: auto;
      margin: 0 auto;
      padding: 5px 0px;
    }

    .tooltip-text {
      display: block;
      text-align: center;
      white-space: normal; /* 기본 줄바꿈 허용 */
      word-break: keep-all; /* 한글은 어절 단위로만 끊기도록 */
      overflow-wrap: break-word; /* 박스를 넘어가면 줄바꿈 */
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

export const DefaultEffectBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #c1c1c1;
  font-size: 13px;
  width: 100%;

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
