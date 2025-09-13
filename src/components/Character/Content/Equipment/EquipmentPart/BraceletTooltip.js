import { AccessoriesTooltipWrap } from './AccessoriesTooltip';

const BraceletTooltip = ({ item }) => {
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
        <div className="flex">
          <span>{item.partName}</span>
          <span>{item.partTier}</span>
        </div>
      </div>
      <div className="vitalityWrap">
        {item.effect
          .replace(/<img[^>]*>|<\/img>/gi, '')
          .split('<BR>')
          .map((d, idx) => (
            <div
              className="tooltip-text"
              key={`${d} ${idx}`}
              dangerouslySetInnerHTML={{ __html: d }}
            />
          ))}
      </div>
    </AccessoriesTooltipWrap>
  );
};

export default BraceletTooltip;
