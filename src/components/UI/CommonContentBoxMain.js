import styled from 'styled-components';
import React, { memo } from 'react';

const CommonContentBoxMain = (props) => {
  return (
    <Content
      key={props.id}
      font={props.font}
      height={props.height}
      border={props.border}
      align={props.align}
      main={props.main}
      leftBtm={props.leftBtm}
      rightBtm={props.rightBtm}
      rightBrd={props.rightBrd}
      equipment={props.equipment}
      carousel={props.carousel}
      collect={props.collect}
      collectImg={props.collectImg}
      event={props.event}
      zero={props.zero}
    >
      {props.children}
    </Content>
  );
};

export default React.memo(CommonContentBoxMain);

export const Content = memo(styled.div`
  width: ${(props) =>
    props.main
      ? '220px'
      : props.equipment
      ? '100%'
      : props.collect
      ? '263px'
      : props.collectImg
      ? '283px'
      : '86%'};

  @media ${(props) => props.theme.mobile} {
    margin: 0;
    padding: ${(props) => (props.zero ? ' 10px 0 10px 0' : '0')};
    width: ${(props) =>
      props.event
        ? '100%'
        : props.main
        ? '33.1%'
        : props.collect
        ? '100%'
        : '100%'};
  }

  height: ${(props) => (props.carousel ? '140px' : 'auto')};
  background: ${(props) => (props.collectImg ? '#1e2225' : '#292e33')};
  color: ${(props) => (props.main ? '#fff' : '#c1c1c1')};
  padding: ${(props) =>
    props.main
      ? '0'
      : props.carousel
      ? '0px 0 10px 0'
      : props.collectImg
      ? '0'
      : '10px 10px'};
  font-family: ${(props) =>
    props.main ? 'Nanum Gothic' : 'Nanum Gothic Bold'};
  border-radius: ${(props) =>
    props.border
      ? '0px 0px 10px 10px'
      : props.leftBtm
      ? '0 0 0 10px'
      : props.rightBtm
      ? '0 0 10px 0'
      : props.collect
      ? '10px'
      : ''};
  font-size: ${(props) => (props.font ? props.font : '')}px;
  line-height: ${(props) => (props.height ? props.height : '')}px;
  text-align: ${(props) => (props.align ? props.align : '')};
  float: ${(props) => (props.main ? 'left' : '')};
  border-right: ${(props) => (props.rightBrd ? '1px solid #4b535a' : '')};
  over-flow: ${(props) => (props.carousel ? 'hidden' : '')};
  margin-bottom: ${(props) => (props.collect ? '25px' : '')};
`);
