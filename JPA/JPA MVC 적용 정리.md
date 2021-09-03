- 객체를 관계형 데이터베이스로 나타내는 문제

- 객체는 방향성 존재 / 테이블은 방향성 존재X

  > 단방향은 FK를 소유한 Entity에서 대상 Entity를 참조하는 방식
  >
  > 양방향 관계를 지정할때 유의점은 서로의 Entity 데이터에 동일한 사용권한으로 의도치 않은 데이터 오염 발생 가능
  >
  > 가급적 사용X

- 데이터의 효율적인 처리를 위해 사용

- [롬복 사용하기](https://memostack.tistory.com/154)



#### Model of MVC

- 데이터에 해당하는 부분

- 정보가공을 위한 컴포넌트
- JPA를 이용해 데이터를 관리하고 처리하는 부분

#### Entity of JPA

- 데이터베이스의 Table명
- User에 대한 Entity 만들기

```java
public class User {
    private Long id;
    private String account;
    private String password;
    private String name;
}
```

```java
@Entity(name="테이블명")
@Data
public class User {
    private Long id;
    private String account;
    private String password;
    private String name;
}
```

#### JpaRepository

- JPA에서 구현한 DAO를 위해 사용하는 어노테이션
- 루트 디렉토리에서 repository 패키지를 만들고 해당 엔티티가 사용할 Repository 인터페이스를 구현
- User에 대한 Repository 만들기

```java
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
```



#### Controller 만들기

- 사용자로부터 접속을 받기 위해서 주소를 설정해야 하는데 그 주소의 묶음을 Controller

- `controller` 패키지를 만들어준다. 그리고 `UserController`을 만든다.
- 테스트를 위해 `test` 디렉토리 하위에 `repository` 디렉토리를 만들고 `UserRepositoryTests` 클래스를 만들어 레포지토리 테스트 준비를 마친다.





- MySQL에서 생성한 데이터베이스를 바로 JPA에서 사용가능하도록 export가능한가?

  > MySql DB와 연결하고 JPA에서 테이블과 컬럼, 테이블간 관계를 새로 정의해야하나
  >
  > JPA에서 Entity와 컬럼을 생성했다면 MySQL 데이터베이스에는 어떤식으로 저장이 되는지..?

- JPA에서 Entity간의 관계를 지정할때 주의점

  - Entity 객체의 모든 관계에 대해서 설정 X

  - 데이터 오용, 부하 증가

  - 이 관계가 시스템상에서 꼭 논리적으로 결합되어야 하는지에 대해 정의

    > 구분하기 위한 적절한 기준은 이 Entity 객체가 혼자 독립적으로 데이타 조작이 되는지 여부 입니다. 만약 단일 Entity 가 다른 Entity 와 연관이 없이 **CRUD** 가 모두 동작이 된다면 이는 독립적인 Entity 일 확률이 아주 높습니다.
    >
    > 만약 이에 대해 정확한 답을 내릴 수 없다면 두 Entity 객체 사이에 관계를 설정하지 않고 데이타의 **Key** 를 이용해 값을 참조 하는 방법을 사용해야 하는 것이 좋습니다.

- 필요한 데이터를 기준으로 단방향, 양방향 설정이 필요해 보인다.