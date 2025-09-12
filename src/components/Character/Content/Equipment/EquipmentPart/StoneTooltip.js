import {
  AccessoriesTooltipWrap,
  ItemContainer,
  DefaultEffectBox,
} from './AccessoriesTooltip';

const StoneTooltip = ({ item }) => {
  return (
    <AccessoriesTooltipWrap>
      <div className="defaultEffectWrap">
        <div
          style={{
            fontSize: '17px',
            textAlign: 'center',
          }}
        >
          {item.itemName}
        </div>
        <ItemContainer>
          {
            <div className="flex">
              <span>{item.partName}</span>
            </div>
          }
        </ItemContainer>
        {
          <DefaultEffectBox>
            <div>{item.stamina.BasicEffect}</div>
            <div>{item.stamina.BonusEffect}</div>
          </DefaultEffectBox>
        }
      </div>
      <div className="defaultEffectWrap no-line">
        <div className="activate">
          <div className="px-1">{item.indentStringGroup.activate1.name}</div>
          <div className="px-1">{item.indentStringGroup.activate1.level}</div>
        </div>
        <div className="activate">
          <div className="px-1">{item.indentStringGroup.activate2.name}</div>
          <div className="px-1">{item.indentStringGroup.activate2.level}</div>
        </div>
        <div className="decrease">
          <div className="px-1">{item.indentStringGroup.decrease.name}</div>
          <div className="px-1">{item.indentStringGroup.decrease.level}</div>
        </div>
      </div>
    </AccessoriesTooltipWrap>
  );
};

export default StoneTooltip;
