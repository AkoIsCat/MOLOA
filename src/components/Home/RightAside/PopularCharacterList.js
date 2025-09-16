import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { updateCharacter } from '../../../utils/updateCharacter';
// import { useGetLostArkData } from '../../../hooks/useGetLostArkData';

import InnerContent from '../../UI/InnerContent';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';

const PopularCharacterList = ({
  popularIsLoading,
  popularCharacter,
  jobEngravings,
}) => {
  const navigate = useNavigate();

  // const { refetch } = useGetLostArkData(
  //   'arkpassive',
  //   items.name,
  //   getArkpassive,
  //   false
  // );

  // 아크패시브 데이터도 같이 전달해주기

  const popularCharacterList =
    popularCharacter &&
    popularCharacter.map((items, index) =>
      popularCharacter.length === index + 1 ? (
        <CommonContentBoxMain
          key={index}
          id={index}
          font="13"
          border="true"
          zero="true"
        >
          <div>
            <PopularText style={{ fontSize: '17px' }} index={index + 1}>
              {index + 1}
            </PopularText>
            <PopularText
              style={{ fontSize: '15px', color: '#fff' }}
              onClick={() => {
                navigate(`/character/${items.name}`);
                updateCharacter(items.name, jobEngravings);
              }}
            >
              {items.name}
            </PopularText>
          </div>
        </CommonContentBoxMain>
      ) : (
        <CommonContentBoxMain key={index} id={index} font="13" zero="true">
          <div>
            <PopularText style={{ fontSize: '17px' }} index={index + 1}>
              {index + 1}
            </PopularText>
            <PopularText
              style={{ fontSize: '15px', color: '#fff' }}
              onClick={() => {
                navigate(`/character/${items.name}`);
                updateCharacter(items.name, jobEngravings);
              }}
            >
              {items.name}
            </PopularText>
          </div>
        </CommonContentBoxMain>
      )
    );

  return (
    <InnerContent height="auto" side={true}>
      <CommonContentBox
        title="실시간 인기 캐릭터"
        itemList={popularCharacterList}
        loading={popularIsLoading}
      />
    </InnerContent>
  );
};

export default PopularCharacterList;

const PopularText = styled.span`
  font-family: 'Nanum Gothic';
  margin: 20px 10px;
  padding: 0 5px;
  color: ${(props) =>
    props.index === 1
      ? '#ffd700'
      : props.index === 2
      ? '#dbe4eb'
      : props.index === 3
      ? '#cd7f32'
      : '#c1c1c1'};
  border-bottom: ${(props) =>
    props.index === 1
      ? '2px solid #ffd700'
      : props.index === 2
      ? '2px solid #dbe4eb'
      : props.index === 3
      ? '2px solid #cd7f32'
      : 'none'};
  cursor: pointer;
`;
