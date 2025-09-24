import styled from 'styled-components';

import InnerContent from '../../UI/InnerContent';
import CommonContentBox from '../../UI/CommonContentBox';
import CommonContentBoxMain from '../../UI/CommonContentBoxMain';
import { HiOutlineTicket } from 'react-icons/hi';

const CouponList = ({ couponCode, couponIsLoading }) => {
  if (!couponIsLoading && couponCode.length === 0) {
    return (
      <CommonContentBoxMain
        key="couponCode"
        id="couponCode"
        font="13"
        height="20"
        align="center"
        border="true"
      >
        -
      </CommonContentBoxMain>
    );
  }

  const renderCouponContent = (items, index, length) => {
    const isLast = index === length - 1;
    const couponNameStyle = {
      color: '#46f1ff',
      fontSize: '15px',
    };
    const termStyle = {
      fontSize: '10px',
    };
    const nameStyle = {
      color: '#fff',
      fontSize: '12px',
    };

    if (!items) {
      return;
    }

    return (
      <CommonContentBoxMain
        key={index}
        id={index}
        font="13"
        height="20"
        align="center"
        border={isLast ? 'true' : undefined}
      >
        <div style={couponNameStyle}>{items.CouponName}</div>
        <div style={termStyle}>{items.Term}</div>
        <div style={nameStyle}>{items.Name}</div>
      </CommonContentBoxMain>
    );
  };

  const couponItemList = (
    <div>
      {couponCode && couponCode.length > 0
        ? couponCode.map((items, index) =>
            renderCouponContent(items, index, couponCode.length)
          )
        : renderCouponContent(null, 1, 1)}
    </div>
  );

  return (
    <InnerContent height="auto" side={true}>
      <CommonContentBox
        title="로스트아크 쿠폰코드"
        itemList={couponItemList}
        icon={<Coupon />}
        loading={couponIsLoading}
      />
    </InnerContent>
  );
};

export default CouponList;

const Coupon = styled(HiOutlineTicket)`
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 19px;
`;
