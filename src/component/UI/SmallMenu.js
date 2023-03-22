import styled from 'styled-components';

const Ul = styled.ul`
  margin-bottom: 20px;
  padding: 0;
  margin-top: auto;
  position: ${(props) => (props.right ? 'absolute' : '')};
  right: ${(props) => (props.right ? '0%' : '')};
  bottom: ${(props) => (props.right ? '0%' : '')};
  margin-right: ${(props) => (props.right ? '30px' : '')};
`;

const DeviceChange = styled.li`
  list-style: none;
  font-size: 12px;
  color: #c1c1c1;
  line-height: 12px;
  cursor: pointer;
  font-family: 'Nanum Gothic';
  margin-top: 10px;
  text-align: ${(props) => (props.right ? 'right' : '')};
`;

const SmallMenu = (props) => {
  return (
    <Ul right={props.right}>
      <DeviceChange right={props.right}>모바일로 보기</DeviceChange>
      <DeviceChange right={props.right}>이용약관</DeviceChange>
      <DeviceChange right={props.right}>개인정보처리방침</DeviceChange>
    </Ul>
  );
};

export default SmallMenu;
