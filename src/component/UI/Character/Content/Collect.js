import styled from 'styled-components';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import ContentWrap from '../../ContentWrap';

import {
  collect1,
  collect2,
  collect3,
  collect4,
  collect5,
  collect6,
  collect7,
  collect8,
  collect9,
} from '../../../../asset/icon/index';

const TendenciesBox = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  font-family: 'Nanum Gothic';
  font-size: 20px;
  justify-content: center;

  .Type {
    color: #c1c1c1;
    margin: 0 5px;
  }

  .Point {
    color: #fff;
    margin: 0 5px;
  }
`;

const CollectUL = styled.ul`
  width: 95%;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'Nanum Gothic';
  justify-content: space-between;
`;

const CollectItem = styled.li`
  padding: 7px;
  margin: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65px;
  border-radius: 10px;
  cursor: pointer;
  background: ${(props) => (props.active ? '#292e33' : '')};

  &:hover {
    background: #292e33;
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .maxPoint {
    margin: 10px 0;
    font-size: 14px;
    color: #fff;
  }

  .Point {
    color: #f1090f;
    font-size: 14px;
  }
`;

const CollectInnerSection = styled.div`
  width: 45%;
  // min-height: 600px;
  height: auto;
  background: #292e33;
  border-radius: 10px;
  margin: 0 13px;
  padding: 10px;
  font-family: 'Nanum Gothic';
  display: flex;
  flex-direction: column;
  align-items: center;

  .collectName {
    color: #fff;
    margin: 10px 0;
  }

  .listWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    .itemWrap {
      display: flex;
      margin: 8px 0;
      color: #fff;
      justify-content: space-between;

      .indexAndPointWrap {
        display: flex;
        color: ${(props) => (props.collect ? '' : '#e4ba27')};

        .itemIndex {
          margin: 0 5px;
        }
      }

      .conpareItems {
      }
    }
  }
`;

const Collect = ({ collectibles, profile }) => {
  const [currentCollectTab, setCurrentCollectTab] = useState(0);

  const colletImage = [
    collect1,
    collect2,
    collect3,
    collect4,
    collect5,
    collect6,
    collect7,
    collect8,
    collect9,
  ];

  const collectItemList = [];

  if (collectibles) {
    for (let i = 0; i < collectibles.length; i++) {
      const collected = [];
      const failedToCollect = [];
      for (let j = 0; j < collectibles[i].CollectiblePoints.length; j++) {
        if (
          collectibles[i].CollectiblePoints[j].Point ===
          collectibles[i].CollectiblePoints[j].MaxPoint
        ) {
          collected.push(collectibles[i].CollectiblePoints[j]);
        } else {
          failedToCollect.push(collectibles[i].CollectiblePoints[j]);
        }
      }
      collectItemList.push({ collected, failedToCollect });
    }
  }

  const collectNav = [
    {
      content: '모코코씨앗',
    },
    {
      content: '섬의마음',
    },
    {
      content: '위대한미술품',
    },
    {
      content: '거인의심장',
    },
    {
      content: '이그네아의징표',
    },
    {
      content: '항해모험물',
    },
    {
      content: '세계수의 잎',
    },
    {
      content: '오르페우스의별',
    },
    {
      content: '기억의오르골',
    },
  ];

  const selectCollectMenuHandler = (index) => {
    setCurrentCollectTab(index);
  };

  return (
    <div style={{ width: '95%' }}>
      <ContentWrap>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          {profile &&
            profile.Tendencies.map((item) => (
              <TendenciesBox key={nanoid()}>
                <div className="Type">{item.Type}</div>
                <div className="Point">{item.Point}</div>
              </TendenciesBox>
            ))}
        </div>
      </ContentWrap>
      <ContentWrap>
        <CollectUL>
          {collectibles.map((item, index) => (
            <CollectItem
              active={currentCollectTab === index && 'true'}
              onClick={() => selectCollectMenuHandler(index)}
              key={nanoid()}
            >
              <img src={colletImage[index]} alt={item.Type} />
              <div className="maxPoint">{item.MaxPoint}</div>
              <div className="Point">{item.MaxPoint - item.Point}</div>
            </CollectItem>
          ))}
        </CollectUL>
      </ContentWrap>
      <ContentWrap>
        <CollectInnerSection collect="true">
          <div className="collectName">
            획득한 {collectNav[currentCollectTab].content}
          </div>
          <div className="listWrap">
            {collectItemList[currentCollectTab].collected &&
              collectItemList[currentCollectTab].collected.map((item, index) =>
                currentCollectTab === 0 ? (
                  <div className="itemWrap" key={nanoid()}>
                    <div className="indexAndPointWrap">
                      <div className="itemIndex">{index + 1}.</div>
                      <div className="itemPoint">{item.PointName}</div>
                    </div>
                    <div className="compareItems">
                      {item.Point} / {item.MaxPoint}
                    </div>
                  </div>
                ) : (
                  <div className="itemWrap" key={nanoid()}>
                    <div className="indexAndPointWrap">
                      <div className="itemIndex">{index + 1}.</div>
                      <div className="itemPoint">{item.PointName}</div>
                    </div>
                  </div>
                )
              )}
          </div>
        </CollectInnerSection>
        <CollectInnerSection>
          <div className="collectName">
            획득하지 못한 {collectNav[currentCollectTab].content}
          </div>
          <div className="listWrap">
            {collectItemList[currentCollectTab].failedToCollect &&
              collectItemList[currentCollectTab].failedToCollect.map(
                (item, index) =>
                  currentCollectTab === 0 ? (
                    <div className="itemWrap" key={nanoid()}>
                      <div className="indexAndPointWrap">
                        <div className="itemIndex">{index + 1}.</div>
                        <div className="itemPoint">{item.PointName}</div>
                      </div>
                      <div className="compareItems">
                        {item.Point} / {item.MaxPoint}
                      </div>
                    </div>
                  ) : (
                    <div className="itemWrap" key={nanoid()}>
                      <div className="indexAndPointWrap">
                        <div className="itemIndex">{index + 1}.</div>
                        <div className="itemPoint">{item.PointName}</div>
                      </div>
                    </div>
                  )
              )}
            {collectItemList[currentCollectTab].failedToCollect.length ===
              0 && (
              <div className="itemWrap" style={{ margin: '0 auto' }}>
                {collectNav[currentCollectTab].content}을 모두 수집하였습니다.
              </div>
            )}
          </div>
        </CollectInnerSection>
      </ContentWrap>
    </div>
  );
};

export default React.memo(Collect);
