import styled from 'styled-components';
import Transcendence_icon from '../../../../../asset/icon/transcendence_icon.png';

const MountedEngraving = ({ elixirTotal, transcendenceTotal }) => {
  const total =
    elixirTotal !== null &&
    elixirTotal
      .map((v) => Number(v.ElixirTotal)) // 숫자로 변환
      .filter((v) => !isNaN(v)) // NaN 제거
      .reduce((acc, cur) => acc + cur, 0);

  return (
    <MountWrap>
      {/* {엘릭서 합계} */}
      {elixirTotal !== null && (
        <EffectTotal>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lostark-bf0ba.appspot.com/o/%EC%97%98%EB%A6%AD%EC%84%9C.png?alt=media&token=eb19bb1a-1aa2-48d5-8383-cf67336ac49f"
            alt="엘릭서 이미지"
            width="14"
            height="17"
          />
          <div className="transcendence">엘릭서 연성 레벨 합 </div>
          <div className="activeExlixir">{total}</div>
        </EffectTotal>
      )}
      {/*초월 합계*/}
      <EffectTotal>
        {transcendenceTotal && (
          <>
            <img
              src={Transcendence_icon}
              alt="초월 아이콘"
              width={17}
              height={20}
            />
            <div className="transcendence">초월 합계</div>
            <div className="activeExlixir">
              {transcendenceTotal.split('총')[1].replace(/개$/, '')}
            </div>
          </>
        )}
      </EffectTotal>
    </MountWrap>
  );
};

export default MountedEngraving;

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
    margin: 0 auto;
    margin-bottom: 30px;
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
