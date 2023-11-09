import { Fragment } from 'react';

import { ServerListBox, ServerListli, ServerWrap } from './ServerList';
import CommonContentBox from '../UI/CommonContentBox';

const EngravingsListBox = ({
  classList,
  className,
  selectEngraving1,
  selectEngraving2,
  engraving1,
  engraving2,
  classNumber,
}) => {
  const classEngravingItem = (
    <ServerListBox>
      <ul>
        {classList &&
          classList.map(
            (item, index) =>
              className &&
              classNumber === index && (
                <Fragment
                  key={`${
                    classList && classList[classNumber].engraving.engraving1
                  } ${
                    classList && classList[classNumber].engraving.engraving2
                  }`}
                >
                  <ServerListli
                    borderFirst="true"
                    key={`${
                      classList && classList[classNumber].engraving.engraving1
                    } 1`}
                    onClick={() => {
                      selectEngraving1({
                        engraving: item.engraving.engraving1,
                      });
                    }}
                    active={engraving1 && 'true'}
                    style={{ width: '45%' }}
                  >
                    <div className="engravings">
                      <div>
                        {classList &&
                          classList[classNumber].engraving.engraving1}
                      </div>
                    </div>
                  </ServerListli>
                  <ServerListli
                    borderFirst="true"
                    key={`${
                      classList && classList[classNumber].engraving.engraving2
                    } 2`}
                    onClick={() => {
                      selectEngraving2({
                        engraving: item.engraving.engraving2,
                      });
                    }}
                    active2={engraving2 && 'true'}
                    style={{ width: '45%' }}
                  >
                    <div className="engravings">
                      <div>
                        {classList &&
                          classList[classNumber].engraving.engraving2}
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
