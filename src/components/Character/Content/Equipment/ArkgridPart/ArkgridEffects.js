import styled from 'styled-components';
import { arkgridSummary } from '../../../../../utils/arkgrid/ArkgridSummary';
import CoreTooltip from './CoreTooltip';

const ArkgridEffects = ({ arkgrid }) => {
  const arkgridData = arkgridSummary(arkgrid.Slots);

  return (
    <ContentWrapWrap>
      <ContentWrap characteristics="true">
        <div style={{ padding: '20px 0 0 0' }}>
          <CharacteristicsBox style={{ margin: '0 0 15px 15px' }}>
            코어
          </CharacteristicsBox>
          <SkillWrap>
            {arkgridData.map((item) => (
              <CoreTooltip key={item.CoreName} item={item} />
            ))}
          </SkillWrap>
        </div>
      </ContentWrap>
      <ContentWrap characteristics="true">
        <div style={{ padding: '20px 0 0 0' }}>
          <CharacteristicsBox style={{ margin: '0 0 15px 15px' }}>
            젬 효과
          </CharacteristicsBox>
          <SkillWrap>
            {arkgrid?.Effects.map((item) => (
              <div key={item.Name} className="skillName m-l flex flex-col">
                <div className="flex m-b">
                  <span>{item.Name}</span>
                  <div className="m-ll">
                    <span>Lv.</span>
                    <span>{item.Level}</span>
                  </div>
                </div>
                <div
                  className="f-s"
                  dangerouslySetInnerHTML={{ __html: item.Tooltip }}
                />
              </div>
            ))}
          </SkillWrap>
        </div>
      </ContentWrap>
    </ContentWrapWrap>
  );
};

export default ArkgridEffects;

const ContentWrap = styled.div`
  width: ${(props) => (props.characteristics ? '48.5%' : '100%')};
  display: flex;
  background: #181c1e;
  border-radius: 10px;
  padding: ${(props) =>
    props.characteristics ? '10px 0 10px 0' : '10px 0 35px 0'};
  margin: 20px 0 0 0;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px 0;
    padding: 0;
    justify-content: center;
  }
`;

const CharacteristicsBox = styled.div`
  width: 103px;
  height: 35px;
  background: #292e33;
  border-radius: 50px;
  text-align: center;
  line-height: 35px;
  font-family: 'Nanum Gothic';
  color: #fff;

  @media ${(props) => props.theme.mobile} {
    width: 90%;
    margin: 10px;
    padding: 0;
  }
`;

const ContentWrapWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  backgruond: pink;
  margin: 5px 0;
  width: 100%;

  .arkgrid {
    display: flex;
    align-items: center;
    margin: 5px 0;

    @media ${(props) => props.theme.mobile} {
      justify-content: center;
    }

    img {
      margin-left: 15px;
    }
  }

  .no-grid {
    display: flex;
    color: #fff;
    text-align: center;
    align-items: center;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin: 10px 0;
    padding: 0;
    justify-content: center;
    align-items: center;
  }

  .skillWrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1px 0;

    @media ${(props) => props.theme.mobile} {
      margin: 10px 0;
    }
  }

  .skillName {
    font-family: 'Nanum Gothic';
    color: #fff;
    font-size: 15px;
    padding-left: 10px;
  }

  .m-l {
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .m-ll {
    margin-left: 5px;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .m-b {
    margin-bottom: 5px;
  }

  .f-s {
    font-size: 13px;
  }
`;
