package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String lolNickname;

    private String password;

    private String email;

    private Long profileIconId;

    private int evaluated;

    private Double userCredit;

    private String serviceNickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public User(Long userId, String lolNickname, String password, String email, Long profileIconId, int evaluated, Double userCredit, String serviceNickname, Authority authority) {
        this.userId = userId;
        this.lolNickname = lolNickname;
        this.password = password;
        this.email = email;
        this.profileIconId = profileIconId;
        this.evaluated = evaluated;
        this.userCredit = userCredit;
        this.serviceNickname = serviceNickname;
        this.authority = authority;
    }
}
