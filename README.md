# WeTube

Cloninig Youtube with Vanilla and NodeJS

## Pages:
- [ ] Home
- [x] Join
- [x] Login
- [x] Search
- [ ] User Detail
- [ ] Edit Profile
- [ ] Change Password
- [ ] Upload
- [ ] Video Detail
- [ ] Edit Video

<!--
# Websites VS Webapps
- Websites: 컨텐츠를 생산하는 것이 아닌 단순히 소비하는 경우, 무언가 만들어 내지 않는, 인터렉티브 요소가 없는

- Webapps: 인터렉티브 요소가 있는

---

# NodeJS
브라우저 밖의 Javascript

## NodeJS 사용하는 경우
백엔드, 서버 빌드해야하는 경우

> [JS는 하드웨어, 하드코어한 처리를 위해 설계된 언어가 아님]

> 많은 데이터를 다뤄야하는 것에 최적화

### dependencies
프로젝트가 실행되려면 필요한 요소를 포함

### devDependencies
프로젝트의 실행과 관련없는 것을 설치하고 싶다면 혹은 개발의 편의를 위한 요소를 포함

--- 

# Server
Connection - Listen - File 처리 - html 저장 - 데이터베이스 저장 - Form 데이터

## Express
NodeJS에서 작동하는 프레임워크

### Middleware
처리가 끝날 때까지 연결되어있는 함수

Express에서 모든 Route와 Connection을 다루는 건 request,response, next를 가지고있다.

위치에 따른 사용법이 달라질 수 있다.

#### Morgan
logging에 도움을 주는 Middleware

- "tiny": GET / 304 - - 0.839 ms

- "combined": ::1 - - [02/Mar/2019:07:40:59 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"

- "common": ::1 - - [02/Mar/2019:07:41:21 +0000] "GET / HTTP/1.1" 304 -

- "dev": GET / 304 9.825 ms - -

#### Helmet
- NodeJS 앱의 보안에 도움을 주는 Middleware
- Helmet을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 앱을 보호할 수 있다.

#### body-parser / cookie-parser

- body-parser: 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request 정보에서 form이나 json 형태로 된 body를 검사
- cookie-parser: cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어, 사용자 인증등에서 쿠키를 검사할 때 사용


1. 미들웨어 - 하나의 함수를 통해서만 요청이 흘러가는 node.js와 대조적으로, 함수를 효과적으로 배열하는 미들웨어 스택이 있음.

2. 라우팅 - HTTP메서드(get,post,put,delete...)로 특정 URL을 방문할 때만 함수가 호출됨.

3. 요청/응답 개체에 대한 확장 - response.redirect(...) 나 response.sendFile(...) 처럼 확장 가능.

4. 뷰 - 뷰를 사용해서 HTML을 동적으로 렌더링할 수 있음. (뷰템플릿 pug, ejs 등)
---

## Babel
최신 자바스크립트를 이전 Javascript 코드로 변환

> npm i @babel/node @babel/preset-env @babel/core
```
# package.josn
...
"scripts": {
    "start": "nodemon --exec babel-node index.js --delay 2"
}
```
- --delay 2: nodemon이 두번씩 실행되는 것을 방지, babel이 translate되기 전에 한번, 변역 후에 한번 일어나기에..

---

## Views

### Setting Views Template
```
$ npm i pug
```

```
# app.js
...

app.set("view engine", "[Template]");

# routes
~ res.render("[fileName]");
```

---

## Database

### SQL

### NoSQL

---

> npm i dotenv

> npm i multer : file URL 생성 

---

# Linux

## 디렉토리/파일 삭제
rm -f 파일
rm -r 디렉토리/
-->