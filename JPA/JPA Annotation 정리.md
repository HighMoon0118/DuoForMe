## JPA Annotation 정리

[jpa entity mapping #1](https://velog.io/@conatuseus/%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%A7%A4%ED%95%91)

[jpa entity mapping #2](https://velog.io/@conatuseus/%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%A7%A4%ED%95%91-2-msk0kq84v5)

[연관관계 매핑 기초 #1 (단방향)](https://velog.io/@conatuseus/%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%91-%EA%B8%B0%EC%B4%88-1-i3k0xuve9i)

[연관관계 매핑 기초 #2 (양방향)](https://velog.io/@conatuseus/%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%91-%EA%B8%B0%EC%B4%88-2-%EC%96%91%EB%B0%A9%ED%96%A5-%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84%EC%99%80-%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84%EC%9D%98-%EC%A3%BC%EC%9D%B8)

[다양한 연관관계 매핑](https://velog.io/@conatuseus/JPA-%EB%8B%A4%EC%96%91%ED%95%9C-%EC%97%B0%EA%B4%80%EA%B4%80%EA%B3%84-%EB%A7%A4%ED%95%91)

- @Entity : 이 annotation을 지정한 클래스는 JPA가 관리한다.
  - name : 엔티티의 이름을 지정
- @Id :  기본 키를 정의
- @GerneratedValue : 다양한 방식으로 식별자 생성
  1. AUTO
  2. TABLE
  3. SEQUENCE
  4. IDENTITY
- @Table : 테이블 이름을 지정
  - name
  - catalog
  - schema
  - uniqueConstraint
- @Column
  - name
  - insertable
  - updateable
  - table
  - length
  - nullable
  - unique
  - columnDefinition
  - precsion, scale
- @Transient : non-persistent
- @Temporal
- @Enumerated

------

#### Lombok

- @ToString
- @Getter, @Setter
- @EqualsAndHashCode : equals(), hashCode()(:동일성 비교 연산자) 메소드 생성
- @RequiredArgsConstructor : 모든 멤버 변수를 초기화 시키는 생성자를 생성
- @Data : 이건 잘 안 쓰는게 좋다고 함
- @NorgsContructor : 파라미터가 없는 기본 생성자 생성
- @AllArgsConstructor : 모든 필드 값을 파라미터로 받는 생성자를 생성
- @RequiredArgsContructor : final이나 @NonNull 인 필드 값만 파라미터로 받는 생성자를 생성



-----------------

[Lombok 사용 시 주의사항](https://www.popit.kr/%EC%8B%A4%EB%AC%B4%EC%97%90%EC%84%9C-lombok-%EC%82%AC%EC%9A%A9%EB%B2%95/)

###### Lombok 사용 시 주의사항

1. @Data는 지양 하자. 
   - 무분별한 Getter, Setter 남발을 최소화
   - ToString으로 인한 양방향 연관관계시 순환 참조 문제 -> ToString 항목에서 제외
     - Member, Coupon 객체가 양방향일 경우 => @ToString(exclude = "coupons")
2. @NoArgsContructor 접근 권한을 최소화 하자.
3. Builder 사용 시 매개변수를 최소화 하자.