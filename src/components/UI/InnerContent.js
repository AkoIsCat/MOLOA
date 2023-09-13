import styled from 'styled-components';

const InnerContent = (props) => {
  return (
    <InnerContentBox height={props.height} side={props.side}>
      {props.children}
    </InnerContentBox>
  );
};

export default InnerContent;

const InnerContentBox = styled.div`
  width: ${(props) => (props.side ? '226px' : '662px')};
  height: ${(props) => props.height || ''};
  background: #1e2225;
  margin: 10px 10px 40px 10px;

  @media ${(props) => props.theme.mobile} {
    width: 95%;
    margin: 20px 0;
    padding: 0;
  }
`;
