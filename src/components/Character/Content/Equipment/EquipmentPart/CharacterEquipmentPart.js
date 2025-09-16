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

  // console.log('equipment', equipment);
  // console.log('equipmentData', equipmentData);
  // console.log('accessoriesData', accessories);
  // console.log('stone', stone);
  // console.log('bracelet', bracelet);

  if (engraving === null) {
    return null;
  }

  if (!equipment) {
    return <Loading />;
  }

  // 장비들끼리 모으는 함수(투,어,상,하,장,무)
  // 악세들끼리 모으는 함수
  // 장비 정보 추출
  // 1. 기본, 추가효과, 세트레벨 o
  // 2. 엘릭서 o
  // 3. 초월 o
  // 4. 상급 재련 o
  // 5. 무기 이름 o
  // 6. 무기 등급 o
  // 7. 부위 이름 o
  // 8. 품질 o

  // 악세 정보 추출
  // 1. 악세 이름 o
  // 2. 악세 품질 "ItemTitle" o
  // 3. 악세 효과 "ItemPartBox" o
  // 4. 깨달음 수치 "ItemPartBox" o
  // 5. 악세 등급 o
  // 6. 기본 효과 "ItemPartBox" o
  // 7. 악세 부위 o

  // 어빌리티 스톤
  // 돌 이름 o
  // 티어(고대 어빌리티 스톤 항목도 같이) "ItemTitle" o
  // 기본 효과 "ItemPartBox" o
  // 세공 단계 보너스 "ItemPartBox" o
  // 활성화 각인 "IndentStringGroup" o
  // 감소 "IndentStringGroup" o

  // 팔찌
  // 팔찌 이름 o
  // 팔찌 티어 (어빌리티 스톤과 동일) "ItemTitle" o
  // 팔찌 효과 "ItemPartBox" o

  // 보석 o
  // 보유 캐릭터 o
  // 아이템 레벨, 전투력 o
  // 트포 o
  // 발키리 추가 o
  // 랭킹 버그 수정 o
  // 전 레벨대 아크패시브 적용 이후 접속한 적이 없는 캐릭터는 안내 문구 or 아무것도 안보여주기 o
  // 앜패 모바일 해상도 ui 수정 o

  // todo
  // 엘릭서, 초월 합계 함수 새로 작성하기
  // 아크그리드
  // 고칠거 개많고..

  return (
    <div>
      {(isPc || isTablet) && (
        <EquipmentWrap>
          <FlexWrap>
            <EquipmentInner>
              {equipmentData && <EquipmentDetail equipment={equipmentData} />}
              {/* <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
                elixirTotalLevel={
                  equipment &&
                  equipmentList[5]?.TooltipValue?.elixirTotalLevel > 0
                    ? equipmentList[5]?.TooltipValue?.elixirTotalLevel
                    : 0
                }
                activateElixir={equipmentList[5]?.TooltipValue?.activateElixir}
                arkpassive={arkpassive}
              /> */}
              <MountedEngraving
                transcendenceTotal={
                  equipmentData &&
                  equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2?.includes(
                    '총'
                  )
                    ? equipmentData[0]?.IndentStrings[0]?.IdenStringGroup2
                    : null
                }
                elixirTotalLevel
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
            {/* <div style={{ margin: '0 auto' }}>
              <MountedEngraving
                mountedEngraving={mountedEngraving}
                mountedEngravingItem={mountedEngravingItem}
                elixirTotalLevel={
                  equipment &&
                  equipmentList[5]?.TooltipValue.elixirTotalLevel !== isNaN
                    ? 0
                    : equipmentList[5]?.TooltipValue.elixirTotalLevel
                }
                activateElixir={equipmentList[5]?.TooltipValue.activateElixir}
              />
            </div> */}
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
