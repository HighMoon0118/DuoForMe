package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

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

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam(value = "name") String name, Model model) {
    // required는 기본으로 true임, false를 넣으면 안보내도 되긴 함
    // 파라미터 부분에 ctrl + p 를 누르면 옵션을 볼 수 있음
    //이번에는 외부에서 파라미터를 받아볼겁니다
        model.addAttribute("name", name);
        return "hello-template";
    }

    @GetMapping("hello-string")
    @ResponseBody
    // ResponseBody는 http에서 header와 body가 있는데 body에 이 데이터를 직접 넣어주겠다는 뜻
    public String helloString(@RequestParam("name") String name) {
        return "hello" + name;
    }

    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello();
        // ctrl + shift + enter하면 자동으로 줄 마무리 해줌
        hello.setName(name);
        return hello;
    }

    static class Hello {
        private String name;
        // getter setter란걸 썼는데 alt + insert
        // java bean 표준방식
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
