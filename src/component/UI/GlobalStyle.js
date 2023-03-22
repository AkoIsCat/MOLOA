import { createGlobalStyle } from 'styled-components';

import NanumGothic from '../../fonts/NanumGothic.woff';
import NanumGothic2 from '../../fonts/NanumGothic.woff2';
import NanumGothicOtf from '../../fonts/NanumGothic.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nanum Gothic';
    font-style: normal;
    src: url(${NanumGothic}) format('woff'),
    url(${NanumGothic2}) format('woff2'),
    url(${NanumGothicOtf}) format('otf');
  }
`;
export default GlobalStyle;
