import { createGlobalStyle } from 'styled-components';
import NanumGothic from './NanumGothic.woff';
import NanumGothic2 from './NanumGothic.woff2';
import NanumGothicOtf from './NanumGothic.otf';

import NanumGothicBold from './NanumGothicBold.woff';
import NanumGothicBold2 from './NanumGothicBold.woff2';
import NanumGothicBoldOtf from './NanumGothicBold.otf';

import NanumGothicExtra from './NanumGothicExtraBold.woff';
import NanumGothicExtra2 from './NanumGothicExtraBold.woff2';
import NanumGothicExtraOtf from './NanumGothicExtraBold.otf';

import NanumGothicLight from './NanumGothicLight.woff';
import NanumGothicLight2 from './NanumGothicLight.woff2';
import NanumGothicLightOtf from './NanumGothicLight.otf';

const GlobalFont = createGlobalStyle`
@font-face {
  font-family: 'Nanum Gothic';
  src: url(${NanumGothic}) format('woff'),
  url(${NanumGothic2}) format('woff2'),
  url(${NanumGothicOtf}) format('otf');
}

@font-face {
  font-family: 'Nanum Gothic Bold';
  src: url(${NanumGothicBold}) format('woff'),
  url(${NanumGothicBold2}) format('woff2'),
  url(${NanumGothicBoldOtf}) format('otf');
}

@font-face {
  font-family: 'Nanum Gothic ExtraBold';
  src: url(${NanumGothicExtra}) format('woff'),
  url(${NanumGothicExtra2}) format('woff2'),
  url(${NanumGothicExtraOtf}) format('otf');
}

@font-face {
  font-family: 'Nanum Gothic Light';
  src: url(${NanumGothicLight}) format('woff'),
  url(${NanumGothicLight2}) format('woff2'),
  url(${NanumGothicLightOtf}) format('otf');
},

`;

export default GlobalFont;
