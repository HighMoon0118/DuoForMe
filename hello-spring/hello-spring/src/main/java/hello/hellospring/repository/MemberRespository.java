package hello.hellospring.repository;

import hello.hellospring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRespository {
    Member save(Member member);
    Optional<Member> findById(long id); // 없으면 null일 반환될때 옵셔널로 감싸서 반환한다
    Optional<Member> findByName(String name);
    List<Member> findall();

}
