# MOLOA

<div align='center'>


### 로스트아크 전투정보 검색 사이트


[![](https://img.youtube.com/vi/FdlKJ1U0QK4/0.jpg)](https://www.youtube.com/watch?v=FdlKJ1U0QK4)

 
*이미지를 클릭하면 유튜브로 넘어갑니다.
</div>

## 배포 주소

https://moloa.netlify.app/

## 프로젝트 소개

LostArk API를 활용한 로스트아크라는 온라인 게임의 전투정보 검색 사이트입니다. <br />
기존에 존재하던 사이트들의 단점들을 보완하는 것을 목표로 구현하였습니다.
<br />
로아와,일로아와 같은 여러 사이트의 디자인을 벤치마킹하였으며,
반응형도 마친 상태라 디바이스에 맞게 확인하실 수 있습니다.

- 각 사이트 별 단점
  - [로아와](https://loawa.com/)
    - 광고가 지나치게 많아서 UI가 깔끔하지 않다.
    - 캐릭터의 아이템을 툴팁으로 보여주지 않고 모달창을 띄워서 아이템을 바로 확인하기가 불편하다.
  - [일로아](https://iloa.gg/)
    - 아이템 세부 정보가 아코디언 형식으로 되어있어서 의도치 않게 스크롤이 과해질 수 있다.
    - 아코디언을 펼쳐야만 세부 정보를 볼 수 있어서 불편하다.(하지만 보기에 깔끔하다는 장점도 있음)

## 개발 기간

- 23.03.02 ~ 23.05.15: 구현 및 배포
  <br />
- 23.05.15 ~ : 배포 후 코드 개선, 버그 수정

## 사용 기술

- React
- Fetch
- Firebase
- Styled-components
- Http-proxy-middleware
- Lostark API
- CRA(Create React App)

## UI 시안

https://agreeable-cafe-133.notion.site/UI-3eef9020c0e84c1f959ff212835dbdb1

## 구현 기능

#### 공통(헤더)

- 헤더에 위치한 검색창에 캐릭터 검색 시 Firebase에 정보가 등록/수정 되며 해당 캐릭터 상세 페이지로 이동 
- 캐릭터가 존재하지 않을 시 문구 안내

<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/8737686a-912f-414f-a4d3-38290e03ca30' widrh='300' height='200' />
 
 
 #### 메인
 
 * 공식 사이트의 공지사항, 이벤트 현황 조회
 * 공지사항, 이벤트 클릭 시 공식사이트 페이지로 이동
 * 인게임 내 일일 컨텐츠 현황 조회
 * Firebase의 Realtime Database를 이용해 실시간 인기 캐릭터 순위, 서버별 디스코드 목록 조회

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109052469/241900630-84362659-ce9e-422a-b103-dc8d08291c62.png"  width='500' height='400' />

#### 랭킹

- Firebase에 등록되어 있는 캐릭터들 간에 순위 조회 기능
- 서버와 직업, 상세 직업 각인을 선택하는 필터링 기능
- 닉네임 클릭 시 해당 캐릭터 정보 페이지로 이동

<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/29cc3930-a4eb-4ef0-9f58-6958188e221f' width='500' height='400' /> <br />
<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/fd2c2e3a-e4ac-4054-83f7-a1c72e13a46b' width='500' heihgt='400' /> <br />

###### firebase - realtime base

#### 길드

- 서버별 길드들의 순위 조회 기능

<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/90be328a-f6be-480b-9386-216d4afa1e3b' width='500' height='400' />

#### 도구

- 게임 플레이에 도움을 줄 수 있는 경매 계산기 기능
- 게임 플레이 시 유용한 사이트 모음

<img src="https://github.com/AkoIsCat/lostArk/assets/109052469/a414f7ad-2024-424e-8e32-045e2cf6e6fb" width='500' height='400' />
<img src="https://github.com/AkoIsCat/lostArk/assets/109052469/a9d4ee9a-4c5f-4c3d-a3a0-99c03e46220f" width='500' height='400' />

#### 캐릭터 상세

- 장비, 카드, 스킬, 수집품, 아바타, 보유 캐릭터 조회 기능
- 장비와 악세서리에 마우스 hover 시 상세 정보 조회 (툴팁)
- 보유 캐릭터 탭에서 닉네임 클릭 시 해당 캐릭터 페이지로 이동

<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/c690e586-f14e-48a9-b92b-f9922a5f33a5' width='500' height='400' />
<img src='https://github.com/AkoIsCat/lostArk/assets/109052469/acda492e-5c24-4733-ac20-8f2072bbdc22' width='500' height='400' />

##### 추가할 기능

- 캐릭터 즐겨찾기
- 엘릭서 활성 여부
- 잡담 게시판
- 다크/라이트 모드
- 길드 검색/길드원 조회

## Package

```
styled-components@5.3.9
http-proxy-middleware@2.0.6
nanoid@4.0.2
react-icons@4.8.0
react-responsive@9.0.2
react-router-dom@6.9.0
react-slick@0.29.0
slick-carousel@1.8.1
react-spinners@0.13.8
```

 <!-- ## 리뷰
 
 제가 만들어보고 싶었던 사이트라 여러 사이트들을 벤치마킹해서 디자인부터 개발까지 전부 하였습니다. 근데 로스트아크 API를 이용해 데이터를 가져오려던 중 CORS를 마주치게 되었는데 CORS를 처음 접해봐서 몹시 어려운 친구였습니다. CORS를 우회하는 방법에 대해 찾아보던 중 프록시 서버에 대해 알게 되었습니다. 또한, 저는 원래 무턱대고 가공하지 않은 데이터를 화면에 보여주기에 급급했는데 제대로 가공되지 않은 데이터 때문에 몇번 헤매다보니 데이터를 먼저 가공한 후에 보여주면 훨씬 깔끕하고 편하다는 것을 느끼게 되었습니다. 그리고 아직 서버, 데이터베이스를 다뤄본적이 없어서 프록시 서버를 사용하고 Firebase의 realtime database를 이용해서 사이트를 만들었는데 후에 꼭 백엔드쪽을 공부해서 제 스스로 서버와 데이터베이스를 구축해서 사용할 것 입니다. -->

## 프로젝트 결과

**성공적인 프로젝트**

- 아쉬운 점이 아직 많지만 큼지막한 기능은 모두 구현을 했으므로 성공적인 프로젝트라고 생각합니다.

<br />

**아쉬웠던 점**

- **API 호출 횟수 제한**

  분당 호출 횟수가 100회로 제한되어 있어 새로고침을 과하게 할 시 데이터를 받아오지 못하는 현상이 있습니다.

- **아쉬운 컴포넌트 분리**

  거의 비슷한 UI인데 기능이 조금 달라 서로 분리되어 있는 컴포넌트가 존재합니다. 추후 하나의 컴포넌트로 합치는 리팩토링을 할 예정입니다.



## 프로젝트를 통해 얻은 것

- **CORS 제한으로 인한 브라우저와 프록시의 이해**
  <br />
  
  Lostark API를 사용하려다 CORS를 마주치게 되었는데 이 덕분에 브라우저와 프록시에 대한 이해를 높힐 수 있었습니다.
  
- **계획 없는 데이터 표현**
  <br />
  
  데이터를 어떻게 보여줄지 제대로 계획을 하지 않고 보여주려고 하니 버그도 많이 발생하고 컴포넌트를 만드는데에 어려움을 많이 겪었습니다. 그로인해 데이터 가공의 중요성에 대해 깨닫게 되었습니다.

