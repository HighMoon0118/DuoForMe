package hello.hellospring.domain;

public class Member {

    private Long id;
    // 시스템상의 고유 번호 같은 것
    private String name;
    // 고객이 정하는 id

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
