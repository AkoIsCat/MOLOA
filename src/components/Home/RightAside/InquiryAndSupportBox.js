import styled from 'styled-components';

import { Head } from '../../UI/CommonContentBox';
import InnerContent from '../../UI/InnerContent';

const InquiryAndSupportBox = ({ link, icon, text }) => {
  return (
    <InnerContent height="45px" side={true}>
      <HeadStyle border="true" side={true}>
        <div
          className="content"
          onClick={() => {
            window.open(link, '_blank');
          }}
        >
          {text}
        </div>
        {icon}
      </HeadStyle>
    </InnerContent>
  );
};

export default InquiryAndSupportBox;

const HeadStyle = styled(Head)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;

  .content {
    padding-left: 10px;
  }
`;
