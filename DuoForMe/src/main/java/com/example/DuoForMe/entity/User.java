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

    @ManyToOne
    @JoinColumn(name = "lol_nickname")
    private NicknameCount nicknameCount;

    private String password;

    private String email;

    private int profileIconId;

    private float userCredit;

    private String serviceNickname;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public User(Long userId, NicknameCount nicknameCount, String password, String email, int profileIconId, float userCredit, String serviceNickname, Authority authority) {
        this.userId = userId;
        this.nicknameCount = nicknameCount;
        this.password = password;
        this.email = email;
        this.profileIconId = profileIconId;
        this.userCredit = userCredit;
        this.serviceNickname = serviceNickname;
        this.authority = authority;
    }
}
