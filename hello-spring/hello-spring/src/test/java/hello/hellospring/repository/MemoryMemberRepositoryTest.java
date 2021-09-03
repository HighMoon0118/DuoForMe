package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.awt.*;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest { // 얘는 다른데서 가져다 쓸게 아니라서 public으로 안해도 된다.

    MemoryMemberRepository respository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach() {
        respository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        respository.save(member);
        Member result = respository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);
        //        Assertions.assertEquals(member, result);
        //        System.out.println("result = " + (result == member ));

    }

    @Test
    public void  findByName() {
        Member member1 = new Member();
        member1.setName("spring1");
        respository.save((member1));

        Member member2 = new Member();
        member2.setName("spring2");
        respository.save((member2));

        Member result = respository.findByName("spring2").get();
        assertThat(result).isEqualTo(member2);
    }

    @Test
    public void finAll() {
        Member member1 = new Member();
        member1.setName("spring1");
        respository.save((member1));

        Member member2 = new Member();
        member2.setName("spring2");
        respository.save((member2));

        List<Member> result = respository.findall();
        assertThat(result.size()).isEqualTo(2);
    }
}
