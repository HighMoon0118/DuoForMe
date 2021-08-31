package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//Controller 어노테이션이 필수임
public class HelloController {

    @GetMapping("hello")
    // "/hello"라는 요청이 들어오면 여기서 매핑을 해주는 것
    public String hello(Model model) {
        model.addAttribute("data", "hello!!");
        return "hello";
        // return의 hello가 templates의 hello를 찾는다 (쟤한테가서 rendering하셈!)
    }
}
