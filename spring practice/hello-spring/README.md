## 프로젝트 시작

- [여기서 진행!](https://start.spring.io/)

![image-20210831221010856](README.assets/image-20210831221010856.png)

## 오류없이 WelcomePage 만들어보기

- src/resources/static/**index.html**
  - index.html은 내가 만든 파일인데, 스프링에선 이걸 자동으로 welcomepage로 인식



## 그러면 동적 페이지는??



### hello페이지를 만들어 볼겁니다! 

- src/resources/static/**index.html**페이지의 작성 내용

```springboot
<!DOCTYPE HTML>
<html>
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html"; charset="UTF-8"
</head>
<body>
Hello
<a href="/hello">hello</a>
태그를 통해 /hello페이지로 가게끔
</body>
</html>
```

- src/main/java/hello.hellospring/controller/HelloController

```springboot
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
        // data는 AttribueName, hello!!는 AttributeValue
        return "hello";
        // return의 hello가 templates의 hello를 찾는다 (쟤한테가서 rendering하셈!)
    }
}
```

- src/main/resources/templates/hello.html

```springboot
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html"; charset="UTF-8"
</head>
<body>
<p th:text="'안녕하세요. ' + ${data}">안녕하세요. 손님</p>
<!--th가 thymeleaf임-->
<!--controller에서 넘긴 이름이랑 다르면 null이 나온다(자바 기본값이 null이라서)-->
</body>
</html>
```



### 그럼 얘들이 어떻게 돌아가는데?

 *참고 : thymeleaf는 템플릿 엔진 동작 확인 역할

1. 웹브라우저에서(localhost:8080/hello) 요청을 보냄
2. 톰켓에서(내장된 웹서버) 받아서 /hello를 spring에서 찾아서 매칭(@GetMapping)
3. 그러면 HelloController에 있는 method가 실행된다
   1. HelloController안에 있는 `public String hello(Model model)`메소드가 실행
   2. model이 넘어오는데 이 model속에는 `key: data`, `value : hello!!`가 들어있음
      1. 컨트롤러에서 return값을 문자로 반환하면 viewResolver가 화면을 찾아서 처리
      2. viewResolver는templates의 viewName(지금은 hello)를 찾아가서 렌더링
4. 웹브라우저에 반영!

![image-20210831215213882](README.assets/image-20210831215213882-16304143350521.png)

## 간단하게 build하고 실행하기

- 해당 프로젝트의 파일구조

![image-20210831221338805](README.assets/image-20210831221338805.png)

- `./gradlew.bat build`(linux는 그냥 `./gradlew build`)

- 이후 `build/libs`경로로 들어감

- jar파일 확인

  ![image-20210831221825305](README.assets/image-20210831221825305.png)

- `java -jar hello-spring-0.0.1-SNAPSHOT.jar`(java -jar 파일명)
- 스프링이 작동하는 것을 확인할 수 있다.

![image-20210831221942214](README.assets/image-20210831221942214.png)



- 참고(뭔가 이상하다 싶을 때)

  - `./gradlew.bat clean build` build폴더 자체가 사라진다

  - 그리고 위의 과정을 다시 실행
