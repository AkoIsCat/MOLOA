import styled from 'styled-components';

import React, { Fragment } from 'react';
import ContentBoxMain from './ContentBoxMain';
import Loading from '../Loading';

const Head = styled.div`
  width: 216px;
  height: 45px;
  border-radius: 10px 10px 0 0;
  background: #292e33;
  font-family: 'Nanum Gothic';
  color: #fff;
  padding-left: 10px;
  font-size: 15px;
  text-align: left;
  line-height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Type = styled.div`
  height: auto;
  padding-left: 8px;
  background: #292e33;
  display: flex;
  align-items: center;
`;

// 0.25 0.14
const TypeTitle = styled.span`
  width: 29.5px;
  height: 16.5px;
  background: #363e49;
  text-align: center;
  line-height: 17px;
  border-radius: 3px;
`;

const TypeDate = styled.span`
  font-size: 12px;
  margin-left: 10px;
  font-family: 'Nanum Gothic Bold';
`;

const ContentBox = (props) => {
  const item = props.item;
  const DateItem = item.map((item) => new Date(Date.parse(item.Date)));

  const currentDate = new Date();

  const writeDate = DateItem.map((item) =>
    (currentDate.getTime() - item.getTime()) / (60 * 60 * 1000) > 24 ? (
      <Type key={item}>
        <TypeTitle>공지</TypeTitle>
        <TypeDate>{`${item.getFullYear()}.${
          item.getMonth() + 1
        }.${item.getDate()}`}</TypeDate>
      </Type>
    ) : (
      <Type key={item}>
        <TypeTitle>공지</TypeTitle>
        <TypeDate>
          {Math.floor((currentDate.getTime() - item.getTime()) / 1000 / 60) < 60
            ? `${Math.floor(
                (currentDate.getTime() - item.getTime()) / 1000 / 60
              )}분 전`
            : `${Math.floor(
                Math.floor(
                  (currentDate.getTime() - item.getTime()) / 1000 / 60
                ) / 60
              )}시간 전`}
        </TypeDate>
      </Type>
    )
  );

  /* 
  {currentDate.getHours() - item.getHours() < 24 &&
          currentDate.getMinutes() - item.getMinutes() < 60
            ? `${currentDate.getHours() - item.getHours() - 1}시간 전`
            : currentDate.getMinutes() - item.getMinutes() < 0
            ? `${60 + (currentDate.getMinutes() - item.getMinutes())}분 전`
            : `${currentDate.getMinutes() - item.getMinutes()}분 전`}
  */

  const notiList = item.map((items, index) =>
    item.length === index + 1 ? (
      <ContentBoxMain
        font="13"
        height="30"
        id={index}
        key={index}
        border="true"
        link={items.Link}
      >
        {items.Title}
        {writeDate[index]}
      </ContentBoxMain>
    ) : (
      <ContentBoxMain
        font="13"
        height="30"
        id={index}
        key={index}
        link={items.Link}
      >
        {items.Title}
        {writeDate[index]}
      </ContentBoxMain>
    )
  );

  return (
    <Fragment>
      <Head
        onClick={() =>
          window.open(
            'https://lostark.game.onstove.com/News/Notice/List',
            '_blank'
          )
        }
      >
        {props.title}
        {props.icon}
      </Head>
      {!props.loading && notiList}
      {props.loading && <Loading />}
    </Fragment>
  );
};

export default React.memo(ContentBox);
