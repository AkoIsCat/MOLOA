import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Head } from '../../UI/CommonContentBox';
import { Content } from '../../UI/CommonContentBoxMain';

import collect1 from '../../../asset/icon/collect1.png';
import collect2 from '../../../asset/icon/collect2.png';
import collect3 from '../../../asset/icon/collect3.png';
import collect4 from '../../../asset/icon/collect4.png';
import collect5 from '../../../asset/icon/collect5.png';
import collect6 from '../../../asset/icon/collect6.png';
import collect7 from '../../../asset/icon/collect7.png';
import collect8 from '../../../asset/icon/collect8.png';
import collect9 from '../../../asset/icon/collect9.png';
import collect10 from '../../../asset/icon/collect10.png';
import Loading from '../../UI/Loading';

const collectImg = [
  collect1,
  collect2,
  collect3,
  collect4,
  collect5,
  collect6,
  collect7,
  collect8,
  collect9,
  collect10,
];

const Aside = ({
  collectibles,
  collectiblesIsLoading,
  profile,
  profileIsLoading,
}) => {
  const { id } = useParams();
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const isTablet = useMediaQuery({
    query: '(min-width:768px) and (max-width:1023px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const infoItem = profile && (
    <CharacterInfo>
      {profileIsLoading && <Loading />}
      {!profileIsLoading && (
        <>
          <InfoItem>
            <div>서버</div>
            <p>{profile.ServerName}</p>
          </InfoItem>
          <InfoItem>
            <div>길드</div>
            <p>{profile.GuildName === null ? '-' : profile.GuildName}</p>
          </InfoItem>
          <InfoItem>
            <div>클래스</div>
            <p>{profile.CharacterClassName}</p>
          </InfoItem>
          <InfoItem>
            <div>칭호</div>
            <p>{profile.Title === null ? '-' : profile.Title}</p>
          </InfoItem>
          <InfoItem>
            <div>전투</div>
            <p>{profile.CharacterLevel}</p>
          </InfoItem>
          <InfoItem>
            <div>아이템</div>
            <p>{profile.ItemMaxLevel}</p>
          </InfoItem>
          <InfoItem>
            <div>원정대</div>
            <p>{profile.ExpeditionLevel}</p>
          </InfoItem>
          <InfoItem>
            <div>PVP</div>
            <p>{profile.PvpGradeName}</p>
          </InfoItem>
          <InfoItem>
            <div>영지</div>
            <p>{profile.TownName === null ? '-' : profile.TownName}</p>
          </InfoItem>{' '}
        </>
      )}
    </CharacterInfo>
  );

  const collectList =
    collectibles &&
    collectibles.map((item, index) => (
      <CollectWrap key={item.Type}>
        <div>
          <img src={collectImg[index]} alt="이그네아" />
          <p>{item.Point}</p>
        </div>
      </CollectWrap>
    ));

  const collectItem = collectibles && (
    <Fragment>
      <Head collect="true" rank="true">
        수집품
      </Head>
      <Content collect="true" border="true">
        {!collectiblesIsLoading && <CollectWrap>{collectList}</CollectWrap>}
        {collectiblesIsLoading && <Loading />}
      </Content>
    </Fragment>
  );

  const avatarImage = profile && (
    <Content collectImg="true" collect="true">
      {!profileIsLoading && (
        <AvatarImg src={profile.CharacterImage} alt="아바타" />
      )}
      {profileIsLoading && <Loading />}
    </Content>
  );

  return (
    <FullWrap>
      {(isPc || isTablet) && (
        <Wrap>
          <Nickname>
            <p>{id}</p>
          </Nickname>
          <Side>
            {infoItem}
            {collectItem}
            {avatarImage}
          </Side>
        </Wrap>
      )}
      {isMobile && (
        <Wrap>
          <Nickname>
            <p>{id}</p>
          </Nickname>
          <Side>
            <Wrap2>
              <div>{infoItem}</div>
              <div>{avatarImage}</div>
            </Wrap2>
            <Wrap>{collectItem}</Wrap>
          </Side>
        </Wrap>
      )}
    </FullWrap>
  );
};

export default Aside;

const Nickname = styled.div`
  width: 100%;
  height: 59px;
  background: #292e33;
  margin: 65px 0px 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: white;

  p {
    margin-left: 20px;
    font-size: 20px;
    font-family: 'Nanum Gothic';
  }
`;

const Side = styled.aside`
  width: 283px;
  height: auto;
  display: flex;
  background: #1e2225;
  flex-direction: column;
  justify-content: space-between;
  float: left;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Wrap = styled.div`
  height: auto;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 0 10px;
  }
`;

const Wrap2 = styled.div`
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FullWrap = styled.div`
  @media ${(props) => props.theme.mobile} {
    display: flex;
    justify-content: center;
  }
`;

const CharacterInfo = styled.div`
  width: 100%;
  height: auto;
  background: #292e33;
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 10px 0;

  @media ${(props) => props.theme.mobile} {
    width: 95vw;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 50px;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 0px;
    padding-top: 20px;
  }
`;

const InfoItem = styled.div`
  width: 100%;
  height: 29px;
  display: flex;
  align-items: center;
  padding: 2px 0;

  @media ${(props) => props.theme.mobile} {
    height: 50px;
  }

  div {
    background: #40444f;
    color: #c1c1c1;
    width: 65px;
    border-radius: 10px;
    text-align: center;
    margin: 0 10px 0 20px;
    font-size: 14px;
  }

  p {
    color: white;
    font-family: 'Nanum Gothic Light';
    font-size: 14px;
  }
`;

const CollectWrap = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2px 13px 1px 13px;

  @media ${(props) => props.theme.mobile} {
    margin: 0 13px 0;
    padding: 10px 0;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }

  p {
    width: auto;
    font-size: 12px;
    margin-top: 8px;
  }
`;
