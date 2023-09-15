import styled from 'styled-components';

const MountedEngraving = ({ mountedEngraving, mountedEngravingItem }) => {
  return (
    <MountWrap>
      {mountedEngraving &&
        mountedEngraving.map((item, index) => (
          <MountedEngravingBox
            key={index}
            grade={mountedEngravingItem[index].slice(-10, -7)}
          >
            <img src={item.Icon} alt="장착된 각인" />
            <div>
              <p className="name">{item.Name}</p>
              <p>{mountedEngravingItem[index].slice(-10, -7)}</p>
            </div>
          </MountedEngravingBox>
        ))}
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
