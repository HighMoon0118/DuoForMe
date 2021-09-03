package hello.hellospring.controller;

import hello.hellospring.domain.Member;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller // 스프링 컨테이너가 생기고 거기 스피링 컨트롤러 넣고 스프링에서 관리를 한다
public class MemberController {

    private final MemberService memberService;

    @Autowired // 생성자를 호출하는데 스프링 컨테이너 연결시켜줌 // 서비스와 컨트롤러 연결 // 의존관계 주입
    public MemberController(MemberService memberService) { // 순수한 자바 코드라서 아무것도 안된다
        this.memberService = memberService;
    }

    @GetMapping("/members/new")
    public String createForm() {
        return "members/createMemberForm";
    }

    @PostMapping("/members/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);
        return "redirect:/";
    }

    @GetMapping("/members")
    public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
