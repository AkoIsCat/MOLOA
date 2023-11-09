import { useState, useEffect, useCallback } from 'react';

import { ServerListBox, ServerListli, ServerWrap } from './ServerList';
import CommonContentBox from '../UI/CommonContentBox';

const ClassListBox = ({
  classList,
  getSelectedClassData,
  isLoading,
  selectClass,
  classNumber,
}) => {
  const [currentClassTab, setCurrentClassTab] = useState(); // 직업 네비게이션
  const [className, setClassName] = useState(); // 선택된 직업 이름
  const [currentClassEngraving, setCurrentClassEngraving] = useState({
    click: false,
  }); // 직각 네비게이션
  const [currentClassEngraving2, setCurrentClassEngraving2] = useState({
    click: false,
  }); // 직각2 네비게이션

  const selectClassMenuHandler = (index) => {
    setCurrentClassTab(index);
  };

  const initialEngravings = () => {
    setCurrentClassEngraving(false);
    setCurrentClassEngraving2(false);
  };

  const sendData = useCallback(() => {
    getSelectedClassData(
      className,
      currentClassEngraving,
      currentClassEngraving2,
      currentClassTab
    );
  }, [
    className,
    currentClassEngraving,
    currentClassEngraving2,
    currentClassTab,
    getSelectedClassData,
  ]);

  useEffect(() => {
    if (className !== '') {
      sendData();
    }
  }, [className, sendData]);

  const classListItem = (
    <ServerListBox>
      <ul style={{ justifyContent: 'center' }}>
        {classList &&
          classList.map((item, index) => (
            <ServerListli
              borderFirst="true"
              key={item.fullName}
              onClick={() => {
                selectClassMenuHandler(index);
                setClassName(item.fullName);
                initialEngravings();
                selectClass({ class: item.fullName, classNumber: index });
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
