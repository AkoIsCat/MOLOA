import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { updateCharacter } from '../../../utils/updateCharacter';
import { useQueryClient } from '@tanstack/react-query';
// import { useGetLostArkData } from '../../../hooks/useGetLostArkData';
import { getArkpassive } from '../../../api/LostArk/LostarkAxios';

import InnerContent from '../../UI/InnerContent';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';

const PopularCharacterList = ({
  popularIsLoading,
  popularCharacter,
  jobEngravings,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleClick = async (name) => {
    try {
      // 클릭한 캐릭터의 arkpassive 데이터 가져오기
      const arkpassiveData = await queryClient.fetchQuery({
        queryKey: ['arkpassive'],
        queryFn: () => getArkpassive(name),
      });
      // 데이터 업데이트
      updateCharacter(
        name,
        jobEngravings,
        arkpassiveData.IsArkPassive,
        arkpassiveData.Effects
      );

      // 페이지 이동
      navigate(`/character/${name}`);
    } catch (error) {
      console.error('arkpassive 불러오기 실패:', error);
    }
  };

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
              onClick={() => handleClick(items.name)}
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
              onClick={() => handleClick(items.name)}
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
