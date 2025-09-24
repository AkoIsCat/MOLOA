import { ServerListBox, ServerListli, ServerWrap } from './ServerList';
import CommonContentBox from '../UI/CommonContentBox';

const ClassListBox = ({
  classList,
  isLoading,
  selectClass,
  classNumber,
  initialEngraving,
}) => {
  const classListItem = (
    <ServerListBox>
      <ul>
        {classList &&
          classList.map((item, index) => (
            <ServerListli
              borderFirst="true"
              key={item.fullName}
              onClick={() => {
                selectClass({ class: item.fullName, classNumber: index });
                initialEngraving();
              }}
              active={classNumber === index && 'true'}
              style={{
                width: '15%',
                fontSize: '12px',
              }}
            >
              <div className="itemWrap">
                <img src={item.image} alt={item.name} />
                <div style={{ textAlign: 'center' }}>{item.name}</div>
              </div>
            </ServerListli>
          ))}
      </ul>
    </ServerListBox>
  );

  return (
    <ServerWrap>
      <CommonContentBox
        title="직업"
        equipment="true"
        rank="true"
        itemList={classListItem}
        loading={isLoading}
      />
    </ServerWrap>
  );
};

export default ClassListBox;
