import styled from 'styled-components';
import React, { Fragment, memo } from 'react';
import Loading from '../../Loading';

export const Head = memo(styled.div`
  width: ${(props) =>
    props.main
      ? '652px'
      : props.equipment
      ? props.equipment
      : props.collect
      ? '283px'
      : '216px'};
  height: 45px;
  background: #292e33;
  font-family: 'Nanum Gothic';
  color: #fff;
  padding-left: ${(props) => (props.collect ? '' : '10px')};
  font-size: 15px;
  line-height: 45px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.collect ? 'center' : '')};
  border-radius: ${(props) => (props.border ? '10px' : '10px 10px 0 0')};
  border-bottom: ${(props) => (props.collect ? '3px solid #4b535a' : '')};
`);

const BottomLine = styled.div`
  width: ${(props) =>
    props.main ? '662px' : props.equipment ? '100%' : '226px'};
  height: 2px;
  background: #292e33;
  margin: 0 auto;
`;

const BottomLineInner = styled.div`
  width: ${(props) =>
    props.main ? '657px' : props.equipment ? '100%' : '199px'};
  height: 45px;
  height: 2px;
  background: #4b535a;
  margin: 0 auto;
`;

const CommonContentBox = (props) => {
  return (
    <Fragment>
      <Head
        main={props.main}
        border={props.border}
        equipment={props.equipment}
        collect={props.collect}
      >
        {props.title}
        {props.icon}
      </Head>
      <BottomLine main={props.main} equipment={props.equipment}>
        <BottomLineInner main={props.main} equipment={props.equipment} />
      </BottomLine>
      {!props.loading && props.itemList}
      {props.loading && <Loading />}
    </Fragment>
  );
};

export default React.memo(CommonContentBox);
