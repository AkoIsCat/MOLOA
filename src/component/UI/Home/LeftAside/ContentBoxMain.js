import styled from 'styled-components';
import React, { Fragment } from 'react';

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
        <div className="content">{props.children}</div>
      </Content>
    </Fragment>
  );
};

export default React.memo(ContentBoxFormat);

const Content = styled.div`
  width: 100%;
  height: 63px;
  background: blue;
  background: #292e33;
  color: #c1c1c1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Nanum Gothic Bold';
  border-radius: ${(props) => (props.border ? '0px 0px 10px 10px' : '')};
  font-size: ${(props) => (props.font ? props.font : '')}px;
  line-height: ${(props) => (props.height ? props.height : '')}px;
  cursor: pointer;

  .content {
    width: 206px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    padding-right: 10px;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;

    .content {
      width: 500px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

const TopLine = styled.div`
  width: 226px;
  height: 2px;
  background: #292e33;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const TopLineInner = styled.div`
  width: 199px;
  height: 2px;
  background: #4b535a;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    width: 97.2%;
  }
`;
