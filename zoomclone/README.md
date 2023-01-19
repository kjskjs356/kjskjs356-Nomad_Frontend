# Noom

Zoom Clone using webRTC and websockets.

# 기본 설치 명령어

- npm init -y : package.json 생성
- npm i nodemon -D
- npm i @babel/core @babel/cli @babel/node -D
- npm i @babel/preset-env -D
- npm i express
- npm i pug

# 별도로 생성해야할 파일 목록

- src폴더 / server.js
- .gitignore
- babel.config.json
- nodemon.json

# 파일 용도 설명

- Nodemon : 프로젝트를 살펴보고 프로젝트의 변경사항이 있을 시 서버를 재시작해주는 프로그램
- server.js : express를 import, express 어플리케이션 구성, view engine pug로 설정, view 디렉토리 설정 -> BackEnd 구동
- app.js : FrontEnd 구동

# websocket을 이용한 채팅 기능 구현을 위해 필요한 설치목록

- npm i ws
