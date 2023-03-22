import styled from 'styled-components';
import React, { Fragment } from 'react';

const Content = styled.div`
  width: 206px;
  height: 63px;
  background: blue;
  background: #292e33;
  color: #c1c1c1;
  padding: 0px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Nanum Gothic Bold';
  border-radius: ${(props) => (props.border ? '0px 0px 10px 10px' : '')};
  font-size: ${(props) => (props.font ? props.font : '')}px;
  line-height: ${(props) => (props.height ? props.height : '')}px;
  cursor: pointer;
`;

const TopLine = styled.div`
  width: 226px;
  height: 2px;
  background: #292e33;
  margin: 0 auto;
`;

const TopLineInner = styled.div`
  width: 199px;
  height: 2px;
  background: #4b535a;
  margin: 0 auto;
`;

const ContentBoxFormat = (props) => {
  return (
    <Fragment>
      <TopLine>
        <TopLineInner />
      </TopLine>
      <Content
        key={props.id}
        id={props.id}
        font={props.font}
        height={props.height}
        border={props.border}
        onClick={() => window.open(`${props.link}`, '_blank')}
      >
        {props.children}
      </Content>
    </Fragment>
  );
};

export default React.memo(ContentBoxFormat);
