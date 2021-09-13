package com.example.DuoForMe.config;
//Spring Data JPA가 제공하는 Audit 기능을 알아보자.
// Audit은 주로 DB값이 변경했을 때 누가 값을 변경했고, 언제 변경했는지 Audit(감사)하는 용도로 사용한다.
// Spring Data JPA는 @CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy 와 같은 어노테이션을 제공한다.
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@Configuration
public class JpaAuditing {
}
