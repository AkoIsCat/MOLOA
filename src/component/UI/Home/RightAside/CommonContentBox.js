import styled from 'styled-components';
import React, { Fragment, memo } from 'react';
import Loading from '../../Loading';

const CommonContentBox = (props) => {
  return (
    <Fragment>
      <Head
        main={props.main}
        border={props.border}
        equipment={props.equipment}
        collect={props.collect}
        guild={props.guild}
        rank={props.rank}
        click={props.click}
      >
        <div
          className="name"
          onClick={() => {
            props.click &&
              window.open(
                'https://lostark.game.onstove.com/News/Event/Now',
                '_blank'
              );
          }}
        >
          {props.title}
        </div>
        <div className="icon">{props.icon}</div>
      </Head>
      <BottomLine
        main={props.main}
        equipment={props.equipment}
        guild={props.guild}
        rank={props.rank}
      >
        <BottomLineInner
          main={props.main}
          equipment={props.equipment}
          guild={props.guild}
          rank={props.rank}
        />
      </BottomLine>
      {!props.loading && props.itemList}
      {props.loading && <Loading />}
    </Fragment>
  );
};

export default React.memo(CommonContentBox);

export const Head = memo(styled.div`
  width: ${(props) =>
    props.main
      ? '100%'
      : props.equipment
      ? props.equipment
      : props.collect
      ? '283px'
      : '95%'};
  height: 45px;
  background: #292e33;
  font-family: 'Nanum Gothic';
  color: #fff;
  font-size: 15px;
  line-height: 45px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collect ? 'center' : '')};
  border-radius: ${(props) => (props.border ? '10px' : '10px 10px 0 0')};
  border-bottom: ${(props) => (props.collect ? '3px solid #4b535a' : '')};

  .name {
    height: 45px;
    padding-left: 10px;
    cursor: ${(props) => props.click && 'pointer'};
  }

  .icon {
    height: auto;
    padding-top: 18px;
  }

  @media ${(props) => props.theme.mobile} {
    width: ${(props) =>
      props.guild
        ? '100%'
        : props.rank
        ? '100%'
        : props.equipment
        ? '95%'
        : '100%'};
    font-size: ${(props) => props.equipment && '13px'};
  }
`);

const BottomLine = styled.div`
  width: ${(props) =>
    props.main ? '662px' : props.equipment ? '100%' : '95%'};
  height: 2px;
  background: #292e33;
  // margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    width: ${(props) =>
      props.guild
        ? '100%'
        : props.rank
        ? '100%'
        : props.equipment
        ? '95%'
        : '100%'};
  }
`;

const BottomLineInner = styled.div`
  width: ${(props) =>
    props.main ? '657px' : props.equipment ? '100%' : '199px'};
  height: 45px;
  height: 2px;
  background: #4b535a;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    width: ${(props) =>
      props.guild
        ? '100%'
        : props.rank
        ? '100%'
        : props.equipment
        ? '95%'
        : '97.5%'};
  }
`;
