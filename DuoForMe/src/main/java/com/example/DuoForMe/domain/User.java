package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @ManyToOne
    @JoinColumn(name = "lol_nickname")
    private NicknameCount nicknameCount;

    @NotNull
    private String password;

    @NotNull
    private String email;

    private int profile_icon_id;

    private float user_credit;

    @NotNull
    private String service_nickname;

    @Builder
    public User(Long user_id, NicknameCount nicknameCount, String password, String email, int profile_icon_id, float user_credit, String service_nickname) {
        this.user_id = user_id;
        this.nicknameCount = nicknameCount;
        this.password = password;
        this.email = email;
        this.profile_icon_id = profile_icon_id;
        this.user_credit = user_credit;
        this.service_nickname = service_nickname;
    }
}
