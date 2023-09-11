import { Fragment, useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

import { ServerListBox, ServerListli, ServerWrap } from './ServerList';
import CommonContentBox from '../UI/CommonContentBox';

const EngravingsListBox = ({
  classList,
  className,
  currentClassTab,
  getSelectedEngravingsData,
}) => {
  const [currentClassEngraving, setCurrentClassEngraving] = useState({
    click: false,
  }); // 직각 네비게이션
  const [currentClassEngraving2, setCurrentClassEngraving2] = useState({
    click: false,
  }); // 직각2 네비게이션

  const sendData = useCallback(() => {
    getSelectedEngravingsData(currentClassEngraving, currentClassEngraving2);
  }, [
    currentClassEngraving,
    currentClassEngraving2,
    getSelectedEngravingsData,
  ]);

  useEffect(() => {
    sendData();
  }, [sendData]);

  const selectedEngreving1 = (index, item) => {
    setCurrentClassEngraving({
      index,
      name: item.engraving.engraving1,
      click: !currentClassEngraving.click,
    });
  };

  const selectedEngreving2 = (index, item) => {
    setCurrentClassEngraving2({
      index,
      name: item.engraving.engraving2,
      click: !currentClassEngraving2.click,
    });
  };

  const classEngravingItem = (
    <ServerListBox>
      <ul>
        {classList &&
          classList.map(
            (item, index) =>
              className &&
              currentClassTab === index && (
                <Fragment key={nanoid()}>
                  <ServerListli
                    borderFirst="true"
                    key={nanoid()}
                    onClick={() => {
                      selectedEngreving1(index, item);
                    }}
                    active={currentClassEngraving.click && 'true'}
                    style={{ width: '45%' }}
                  >
                    <div className="engravings">
                      <div>
                        {classList &&
                          classList[currentClassTab].engraving.engraving1}
                      </div>
                    </div>
                  </ServerListli>
                  <ServerListli
                    borderFirst="true"
                    key={nanoid()}
                    onClick={() => {
                      selectedEngreving2(index, item);
                    }}
                    active2={currentClassEngraving2.click && 'true'}
                    style={{ width: '45%' }}
                  >
                    <div className="engravings">
                      <div>
                        {classList &&
                          classList[currentClassTab].engraving.engraving2}
                      </div>
                    </div>
                  </ServerListli>
                </Fragment>
              )
          )}
      </ul>
    </ServerListBox>
  );

  return (
    <ServerWrap>
      <CommonContentBox
        title="직업 각인"
        equipment="true"
        rank="true"
        itemList={classEngravingItem}
      />
    </ServerWrap>
  );
};

export default EngravingsListBox;
