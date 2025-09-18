import React, { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

import styled from 'styled-components';
import EquipmentDetail from './EquipmentDetail';
import AccessoriesDetail from './AccessoriesDetail';
import MountedEngraving from './MountedEngraving';
import Loading from '../../../../UI/Loading';
import { sortEquipment } from '../../../../../utils/equipment/sortEquipment';
import { equipmentSummary } from '../../../../../utils/equipment/equipmentSummary';
import { accessoriesSummary } from '../../../../../utils/accessories/accessoriesSummary';
import { StoneSummary } from '../../../../../utils/stone/StoneSummary';
import { braceletSummary } from '../../../../../utils/bracelet/braceletSummary';

const CharacterEquipmentPart = ({ equipment, engraving }) => {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  // 장비 순서 정렬
  const sortedEquipment = useMemo(
    () => (equipment ? sortEquipment(equipment) : undefined),
    [equipment]
  );

  // 장비 필요 데이터 가공
  const equipmentData = useMemo(
    () => equipmentSummary(sortedEquipment),
    [sortedEquipment]
  );

  const accessories = useMemo(() => accessoriesSummary(equipment), [equipment]);
  const stone = useMemo(() => StoneSummary(equipment), [equipment]);
  const bracelet = useMemo(() => braceletSummary(equipment), [equipment]);

  if (engraving === null) {
    return null;
  }

  if (!equipment) {
    return <Loading />;
  }

  return (
    <div>
      {(isPc || isTablet) && (
        <EquipmentWrap>
          <FlexWrap>
            <EquipmentInner>
              {equipmentData && <EquipmentDetail equipment={equipmentData} />}
              <MountedEngraving
                transcendenceTotal={
                  equipmentData &&
                  equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2?.includes(
                    '총'
                  )
                    ? equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2
                    : null
                }
                elixirTotal={equipmentData}
              />
            </EquipmentInner>
            <AccessoriesInner>
              <AccessoriesDetail
                accessories={accessories}
                equipment={equipment}
                stone={stone}
                bracelet={bracelet}
              />
            </AccessoriesInner>
          </FlexWrap>
        </EquipmentWrap>
      )}
      {isMobile && (
        <EquipmentWrap>
          <FlexWrap>
            <div style={{ margin: '0 auto' }}>
              <EquipmentInner>
                <EquipmentDetail equipment={equipmentData} />
              </EquipmentInner>
            </div>
            <hr width="100%" color="#292e33" size="2" />
            <div style={{ margin: '0 auto' }}>
              <AccessoriesInner>
                <AccessoriesDetail
                  accessories={accessories}
                  equipment={equipment}
                  stone={stone}
                  bracelet={bracelet}
                />
              </AccessoriesInner>
            </div>
            <MountedEngraving
              transcendenceTotal={
                equipmentData &&
                equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2?.includes(
                  '총'
                )
                  ? equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2
                  : null
              }
              elixirTotal={equipmentData}
            />
          </FlexWrap>
        </EquipmentWrap>
      )}
    </div>
  );
};

export default CharacterEquipmentPart;

const EquipmentWrap = styled.div`
  width: auto;
  height: auto;
  background: #181c1e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;

  @media ${(props) => props.theme.mobile} {
    padding: 0 0 10px;
  }

  .image {
    width: 75%;
    height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: contain;
    }
  }
`;

const EquipmentInner = styled.div`
  min-width: 200px;
  max-width: 312px;
  display: flex;
  flex-direction: column;
  margin: 0 35px;
  justify-content: space-between;
  position: relative;
  height: auto;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    padding: 0;
  }

  div {
    display: flex;
    margin-bottom: 13px;

    .itemPartBox {
      margin-bottom: 0;
      margin-top: 1rem;
    }

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        font-size: 15px;
        color: #fff;
        margin: 5px;
      }

      .item {
        margin: 0 2px;
      }

      .single {
        color: #85af3a;
      }

      .name {
        color: #fff;
        margin: 5px;
      }

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }

        .name {
          font-size: 13px;
        }
      }
    }
  }
`;

const AccessoriesInner = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  position: relative;

  @media ${(props) => props.theme.mobile} {
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  div {
    display: flex;
    margin-bottom: 10px;

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        color: #fff;
        margin: 5px;
      }

      .name {
        color: #fff;
        margin: 5px;
      }

      .m-l-5 {
        margin-left: 5px;
      }

      .m-5 {
        margin: 5px;
      }

      .around {
        justify-content: space-around;
      }

      .decrease {
        color: #832c35;
      }

      .activate {
        color: #f8f5a4;
      }

      .flex-row {
        flex-direction: row;
      }

      div {
        margin: 0;
        color: #fff;
        height: 20px;
      }

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }

        .name {
          font-size: 13px;
        }
      }
    }
  }
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;

    .mount {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
  }
`;
