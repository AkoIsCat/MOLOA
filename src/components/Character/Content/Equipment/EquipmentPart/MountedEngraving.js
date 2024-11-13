import styled from 'styled-components';

import ArkPassiveIcon from '../../../../../asset/icon/ico_arkpassive.png';

const MountedEngraving = ({
  mountedEngraving,
  mountedEngravingItem,
  elixirTotalLevel,
  activateElixir,
  arkpassive,
}) => {
  return (
    <MountWrap>
      {!arkpassive?.IsArkPassive && (
        <div>
          {mountedEngraving &&
            mountedEngraving.map((item, index) => (
              <MountedEngravingBox
                key={`${item.Name} ${item.Slot}`}
                grade={mountedEngravingItem[index].slice(-10, -7)}
              >
                <img src={item.Icon} alt="장착된 각인" />
                <div>
                  <p className="name">{item.Name}</p>
                  <p>{mountedEngravingItem[index].slice(-10, -7)}</p>
                </div>
              </MountedEngravingBox>
            ))}
        </div>
      )}
      <EffectTotal>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/lostark-bf0ba.appspot.com/o/%EC%97%98%EB%A6%AD%EC%84%9C.png?alt=media&token=eb19bb1a-1aa2-48d5-8383-cf67336ac49f"
          alt="엘릭서 이미지"
          width="14"
          height="17"
        />
        <div className="transcendence">엘릭서 연성레벨 합 </div>
        <div className="elixir">{elixirTotalLevel && elixirTotalLevel}</div>
        <div className="activeExlixir">{activateElixir && activateElixir}</div>
      </EffectTotal>
      {arkpassive?.IsArkPassive && (
        <ArkPassive>
          <div className="title">
            <img src={ArkPassiveIcon} alt="아크패시브 아이콘" />
            <div>아크패시브 적용중</div>
          </div>
          <div>
            {arkpassive?.Points.map((item) => (
              <ArkPassivePoint name={item.Name} key={`Point ${item.Name}`}>
                <div className="point_type" key={item.Name}>
                  {item.Name}
                </div>
                <div className="point_type" key={`${item.Name} ${item.Value}`}>
                  {item.Value}
                </div>
              </ArkPassivePoint>
            ))}
          </div>
        </ArkPassive>
      )}
    </MountWrap>
  );
};

export default MountedEngraving;

const MountedEngravingBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;

  @media ${(props) => props.theme.mobile} {
    margin: 10px 0;
  }

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 5px;
  }

  div {
    width: 98px;
    margin: 0 15px 0 0;
    display: flex;
    flex-direction: column;

    p {
      font-size: 15px;
      margin: 0 0px 5px 5px;
      font-family: 'Nanum Gothic';
      color: #fff;
    }

    @media ${(props) => props.theme.mobile} {
      .name {
        font-size: 13px;
      }
    }

    .name {
      width: 100px;
      margin: 5px;
      color: ${(props) =>
        props.grade === '+12'
          ? '#fe9600'
          : props.grade === ' +9'
          ? '#9e24ca'
          : props.grade === ' +6'
          ? '#113d5d'
          : props.grade === ' +3'
          ? '#46812d'
          : ''};
    }
  }
`;

const MountWrap = styled.div`
  min-width: 200px;
  max-width: 312px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: auto;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    padding: 0;
  }
`;

const EffectTotal = styled.div`
  font-family: 'Nanum Gothic';
  color: #fff;
  margin: 10px 0 0 0;
  display: flex;
  align-items: center;

  .elixir {
    margin: 0 5px;
    color: rgb(254, 150, 0);
  }

  .activeExlixir {
    margin: 0 5px;
    color: #ffd200;
  }

  .transcendence {
    margin: 0 5px;
  }
`;

const ArkPassive = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0;
  font-size: 16px;
  color: #7053c3;

  .title {
    margin-left: 20px;
    align-items: center;

    div {
      margin-top: 8px;
      font-weight: bold;
    }
  }

  img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
`;

const ArkPassivePoint = styled.div`
  display: flex;
  margin: 0 10px;
  font-size: 18px;

  .point_type {
    margin: 0px 3px;
    color: ${(props) =>
      props.name === '진화'
        ? '#F1D594'
        : props.name === '깨달음'
        ? '#83E9FF'
        : '#C2EA55'};
  }
`;
