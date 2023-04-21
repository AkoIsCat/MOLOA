import styled from 'styled-components';

const ContentWrapStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #181c1e;
  border-radius: 10px;
  padding: ${(props) => (props.character ? '0' : '10px 0 ')};
  margin: ${(props) => (props.character ? '20px 0' : '20px 0 ')};
`;

const ContentWrap = (props) => {
  return (
    <ContentWrapStyle character={props.character}>
      {props.children}
    </ContentWrapStyle>
  );
};

export default ContentWrap;
