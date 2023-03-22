import styled from 'styled-components';

import { useEffect, useRef, useState } from 'react';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(40, 40, 40, 0.7);
`;

const Content = styled.div`
  width: 500px;
  height: 500px;
  background: #292e33;
  margin: 0 auto;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  padding-left: 50px;
  margin: 0 auto;
  color: white;
`;

const CloseButton = styled.button`
  background: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  cursor: pointer;
  margin: 20px;
  color: white;
  font-size: 20px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputValue = styled.input`
  width: 80%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 20px;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ChooseNumberBox = styled.select`
  width: 80%;
  height: 50px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #c1c1c1;
  color: white;
  margin-top: 30px;
  outline: none;

  option {
    color: black;
  }
`;

const ResultBox = styled.div`
  width: 80%;
  height: 150px;
  background: transparent;
  border: none;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const EquityBox = styled.div`
  width: 80%;
  height: 5vh;
  background: transparent;
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  border: 0;
  border-bottom: 1px solid #c1c1c1;
`;

const BenefitBox = styled.div`
  width: 80%;
  height: 5vh;
  background: transparent;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  border: 0;
  border-bottom: 1px solid #c1c1c1;
`;

const ResultText = styled.p`
  font-size: 18px;
`;

const InputLabel = styled.label`
  width: 80%;
  position: relative;
  border-bottom: 1px solid #c1c1c1;


  button {
    background: transparent;
    border: 0;
    cursor: pointer;
    outline: 0;
    color: white;
    font-size: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
`;

const Modal = ({ onClose }) => {
  const selectList = [4, 8];
  const backgroundRef = useRef();
  const [seleted, setSelected] = useState('4인');
  const [equity, setEquity] = useState();
  const [benefit, setBenefit] = useState();
  const [itemPrice, setPrice] = useState();

  const backgroundClickHandler = (e) => {
    if (e.target === backgroundRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const equity4Price = Math.round(+itemPrice * 0.6447);
    const equity8Price = Math.round(+itemPrice * 0.7557);
    const benefit4Price = Math.round(+itemPrice * 0.7125);
    const benefit8Price = Math.round(+itemPrice * 0.8312);

    if (seleted === '4인') {
      setEquity(equity4Price);
      setBenefit(benefit4Price);
    } else if (seleted === '8인') {
      setEquity(equity8Price);
      setBenefit(benefit8Price);
    }
  }, [seleted, itemPrice]);

  const selectedHandler = (e) => {
    setSelected(e.target.value);
  };

  const onChangeItemPrice = (e) => {
    setPrice(e.target.value);
  };

  const onClickItemPriceClear = () => {
    setPrice('');
  };

  return (
    <Background ref={backgroundRef} onClick={backgroundClickHandler}>
      <Content>
        <Wrap>
          <Title>경매 계산기</Title>
          <CloseButton type="button" onClick={onClose}>
            X
          </CloseButton>
        </Wrap>
        <InputBox>
          <InputLabel>
            <InputValue
              onChange={onChangeItemPrice}
              placeholder="거래소 가격을 입력해 주세요"
              type="number"
              value={itemPrice}
            />
            <button type="button" onClick={onClickItemPriceClear}>
              X
            </button>
          </InputLabel>
          <ChooseNumberBox onChange={selectedHandler} value={seleted}>
            {selectList.map((item) => (
              <option key={item}>{item}인</option>
            ))}
          </ChooseNumberBox>
          <ResultBox>
            <BenefitBox>
              <ResultText>선점</ResultText>
              <ResultText>{isNaN(equity) ? '' : equity} G</ResultText>
            </BenefitBox>
            <EquityBox>
              <ResultText>공평</ResultText>
              <ResultText>{isNaN(benefit) ? '' : benefit} G</ResultText>
            </EquityBox>
          </ResultBox>
        </InputBox>
      </Content>
    </Background>
  );
};

export default Modal;
