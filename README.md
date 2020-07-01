# RealWorld example app - Nestjs + TypeORM
[프로젝트 관리 형황](https://trello.com/b/6XucTkhb/nestjstypeorm-realworld)  
## 프로젝트 배경
__<문제 상황>__
- [Nest.js](https://docs.nestjs.com/)와 [TypeORM](https://typeorm.io/)을 공부하기 위해서 무언가를 만들어보기로 했다.
- Nest.js와 TypeORM을 공부하는 이유는 해당 프레임워크를 앞으로 사용하기 위해서 보다는, 현대적인 디자인 패턴을 익히기 위해서다.
- Todo List를 만들기엔 실질적인 노하우를 익힐 수 없다.
- 그렇다고 토이 프로젝트를 하기엔 기획, 디자인의 과정이 불필요하게 필요하다.

__<해결책>__
- [RealWorld](https://github.com/gothinkster/realworld) 프로젝트에서 제공하는 conduit을 만들어본다.
- 개발에만 집중할 수 있음

## 구현 방향
- RealWorld 프로젝트에서 제시한 [api명세](https://github.com/gothinkster/realworld/tree/master/api)와 [구현해야 할 기능](https://github.com/gothinkster/realworld/tree/master/spec#project-overview)을 따름
- 주어진 문서를 기반으로 DB설계, 프로젝트 구조 설계, 기능 구현을 함

## 기술 스택
- nest.js
- typeORM
- typescript
- mySQL