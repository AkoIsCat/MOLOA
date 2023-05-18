import styled from 'styled-components';
import React from 'react';
import { useEffect } from 'react';

const ContentWrap = styled.div`
  width: 95%;
  height: 95%;
  background: #181c1e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  margin: 20px 0;
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

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    width: 600px;
    height: auto;
    margin: 10px;
    justify-content: center;

    p {
      margin: 0;
      font-family: 'Nanum Gothic';
      color: #fff;
      margin: 4px 0 4px 7px;
    }

    .type {
      font-size: 13px;
    }

    .name {
      font-size: 14px;
      font-family: 'Nanum Gothic Bold';
    }
  }
`;

const TrueInner = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  margin: 0 40px;
  justify-content: space-between;

  div {
    display: flex;
    margin-bottom: 10px;

    .desc {
      display: flex;
      flex-direction: column;
      font-family: 'Nanum Gothic';

      .type {
        font-size: 15px;
        color: #fff;
        margin: 5px;
      }

      .name {
        color: #fff;
        margin: 5px;
      }

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }
    }
  }
`;

const FalseInner = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    margin-bottom: 10px;

    .desc {
      width: 68%;
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

      @media ${(props) => props.theme.mobile} {
        .type {
          font-size: 13px;
        }
    }
  }
`;

const ImageBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: #292e33;

  img {
    object-fit: contain;
  }

  @media ${(props) => props.theme.mobile} {
    width: 45px;
    height: 45px;
  }
`;

const ImageBoxColor = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.exist === '전설'
      ? 'linear-gradient(135deg, #362003 0%, #9e5f04 100%)'
      : props.exist === '영웅'
      ? 'linear-gradient(135deg, #261331 0%, #480d5d 100%)'
      : props.exist === '희귀'
      ? 'linear-gradient(135deg, #111f2c 0%, #113d5d 100%)'
      : props.exist === '고대'
      ? 'linear-gradient(135deg, #3d3325 0%, #dcc999 100%)'
      : props.exist === '유물'
      ? 'linear-gradient(135deg, #341a09 0%, #a24006 100%)'
      : '#292e33'};
  border-radius: 10px;
`;

const Avatar = ({ profile, avatars }) => {
  useEffect(() => {
    document.cookie = 'safeCookie1=foo; SameSite=Lax';
    document.cookie = 'safeCookie2=foo';
    document.cookie = 'crossCookie=bar; SameSite=None; Secure';
  }, []);

  const trueInner = [
    { type: '무기 아바타' },
    { type: '머리 아바타' },
    { type: '상의 아바타' },
    { type: '하의 아바타' },
  ];

  const falseInner = [
    {
      type: '무기 덧입기 아바타',
      TypeAs: '무기 아바타',
    },
    {
      type: '머리 덧입기 아바타',
      TypeAs: '머리 아바타',
    },
    {
      type: '상의 덧입기 아바타',
      TypeAs: '상의 아바타',
    },
    {
      type: '하의 덧입기 아바타',
      TypeAs: '하의 아바타',
    },
    {
      type: '얼굴1 아바타',
      TypeAs: '얼굴1 아바타',
    },
    {
      type: '얼굴2 아바타',
      TypeAs: '얼굴2 아바타',
    },
    {
      type: '악기 아바타',
      TypeAs: '악기 아바타',
    },
  ];

  const inInnerTrue = avatars && avatars.filter((item) => item.IsInner);
  const isInnerFalse = avatars && avatars.filter((item) => !item.IsInner);

  return (
    <ContentWrap>
      <div className="image">
        <img src={profile && profile.CharacterImage} alt="캐릭터 이미지" />
      </div>
      <ListWrap>
        <div className="content">
          <TrueInner>
            {trueInner.map((item, index) => (
              <div key={index}>
                <ImageBox
                  key={index}
                  exist={
                    avatars !== null &&
                    avatars[index] !== undefined &&
                    avatars[index] !== null &&
                    avatars[index]?.Grade === '전설' &&
                    avatars[index]?.IsInner
                      ? avatars[index]?.Grade
                      : ''
                  }
                >
                  {avatars !== null &&
                  avatars[index] !== undefined &&
                  avatars[index] !== null &&
                  avatars[index].Grade === '전설' &&
                  avatars[index].IsInner ? (
                    <ImageBoxColor exist={avatars[index].Grade}>
                      <img src={avatars[index].Icon} alt="무기아바타" />
                    </ImageBoxColor>
                  ) : (
                    ''
                  )}
                </ImageBox>
                <div className="desc">
                  <p className="type">{trueInner[index].type}</p>
                  <p className="name">
                    {avatars !== null &&
                    avatars[index] !== undefined &&
                    avatars[index].Grade === '전설' &&
                    avatars[index].IsInner
                      ? avatars[index].Name
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </TrueInner>
          <FalseInner>
            {falseInner.map((item, index) => (
              <div key={index}>
                <ImageBox key={index}>
                  {isInnerFalse &&
                    isInnerFalse.map((items, index) =>
                      avatars !== null && items.Type === item.TypeAs ? (
                        <ImageBoxColor key={index} exist={items.Grade}>
                          <img src={items.Icon} alt="아바타" />
                        </ImageBoxColor>
                      ) : (
                        ''
                      )
                    )}
                </ImageBox>
                <div className="desc">
                  <p className="type">{item.type}</p>
                  {isInnerFalse &&
                    isInnerFalse.map((items, index) =>
                      avatars !== null && items.Type === item.TypeAs ? (
                        <p key={index} className="name">
                          {items.Name !== '' ? items.Name : ''}
                        </p>
                      ) : (
                        ''
                      )
                    )}
                </div>
              </div>
            ))}
          </FalseInner>
        </div>
      </ListWrap>
    </ContentWrap>
  );
};

export default React.memo(Avatar);
