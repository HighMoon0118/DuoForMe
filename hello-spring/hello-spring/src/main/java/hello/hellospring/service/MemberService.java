package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRespository;
import hello.hellospring.repository.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Optional;

public class MemberService {

    private final MemberRespository memberRespository;

    public MemberService(MemberRespository memberRespository) {
        this.memberRespository = memberRespository;
    }

    /**
     * 회원가입
     */
    public  Long join(Member member) {
        //같은 이릉이 있는 중복 회원X
//        Optional<Member> result = memberRespository.findByName(member.getName());
//        // 그냥 꺼내고 싶으면 result.get(); 하면 되는데 바로 꺼내는것을 권장하지는 않는다
//        // result.orElseGet(); 값이 있으면 꺼내고 아니면 이걸 실행하라는 함수
//        result.ifPresent(m -> { //optinal을 쓰기 때문에 가능한것, optional 안에 무언가 존재하면, optional 안쓰면 null 값으로 비교
//            throw new IllegalStateException("이미 존재하는 회원입니다.");
//        });
        validateDuplicateMember(member); // 중복회원 검증
        memberRespository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRespository.findByName(member.getName())
                .ifPresent(m -> { //optinal을 쓰기 때문에 가능한것, optional 안에 무언가 존재하면, optional 안쓰면 null 값으로 비교
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
     * 전체회원 조회
     */
    public List<Member> findMembers() {
        return memberRespository.findall();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRespository.findById(memberId);
    }
}
