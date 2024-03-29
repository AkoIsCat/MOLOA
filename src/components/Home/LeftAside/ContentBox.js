import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ContentBoxMain from './ContentBoxMain';
import Loading from '../../UI/Loading';
import { IoIosArrowForward } from 'react-icons/io';

const ContentBox = (props) => {
  const item = props.item;
  const DateItem = item && item.map((item) => new Date(Date.parse(item.Date)));
  const currentDate = new Date();

  const navigate = useNavigate();

  const writeDate =
    DateItem &&
    DateItem.map((item) =>
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
            {Math.floor((currentDate.getTime() - item.getTime()) / 1000 / 60) <
            60
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

  const notiList =
    item &&
    item.map((items, index) =>
      item.length === index + 1 ? (
        <ContentBoxMain
          font="13"
          height="30"
          id={props.type === 'moloa' ? items.id : props.id}
          key={index}
          border="true"
          link={items.type === 'moloa' ? items.Link : ''}
          type={props.type}
        >
          {items.Title}
          {writeDate[index]}
        </ContentBoxMain>
      ) : (
        <ContentBoxMain
          font="13"
          height="30"
          id={props.type === 'moloa' ? items.id : props.id}
          key={index}
          link={items.Link}
          type={props.type}
        >
          {items.Title}
          {writeDate[index]}
        </ContentBoxMain>
      )
    );

  return (
    <Fragment>
      <Head>
        <div className="noti-wrap">
          <div className="name">{props.title}</div>
          <div className="icon">{props.icon}</div>
        </div>
        <div
          className="arrow"
          onClick={() =>
            props.noti && props.type === 'loa'
              ? window.open(
                  'https://lostark.game.onstove.com/News/Notice/List',
                  '_blank'
                )
              : navigate('/notilist')
          }
        >
          <IoIosArrowForward />
        </div>
      </Head>
      {!props.loading && notiList}
      {props.loading && <Loading />}
    </Fragment>
  );
};

export default ContentBox;

const Head = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 10px 10px 0 0;
  background: #292e33;
  font-family: 'Nanum Gothic';
  color: #fff;
  font-size: 15px;
  text-align: left;
  line-height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .noti-wrap {
    display: flex;
    align-items: center;
  }

  .name {
    height: 45px;
    padding-left: 10px;
  }

  .icon {
    height: auto;
    padding-top: 10px;
  }

  .arrow {
    cursor: pointer;
    margin-right: 10px;
    margin-top: 5px;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Type = styled.div`
  height: auto;
  padding-left: 8px;
  background: #292e33;
  display: flex;
  align-items: center;
`;

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
