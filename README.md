# 1. nextjs13-chatting
## ORM 과 Node.js 추상화 계층
- 개발에서 추상화라는 것은 추상화를 많이 하면 할수록 어떠한 복잡한 로직을 알지 못하더라도 그 로직을 간단하게 사용할 수 있게 해줍니다.

### 저수준 : 데이터베이스 드라이버
- 데이터베이스의 연결과 원시 SQL 문자열을 전달, 그리고 응답을 받음

### 중간수준 : 쿼리 빌더
- Knex 라이브러리
- 보안 정도 좋아짐

### 고수준 : ORM
- 최고 수준의 추상화.
- 관계형 데이터베이스를 어플리케이션의 객체에 맵핑
- typeorm / sequelize / prisma

# 2. 모달 구현

## Portal 로 구현 vs Portal 없이 구현

### Portal 로 구현
- 엘리먼트 depth 에 영향을 받지 않아, z-index 로 관리가 가능
- 루트 DOM 밖에 생성되지만, React 트리 기준으로 이벤트 버블링 가능

### Portal 없이 구현
- 엘리먼트 depth 에 영향을 받아, z-index 로 관리가 일부 불가능