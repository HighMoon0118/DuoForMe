package com.example.DuoForMe.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.catalina.LifecycleState;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

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

//    @OneToMany(mappedBy = "ownerUser", fetch = FetchType.LAZY)
//    private List<MatchingHistory> matchingHistoryOwnerList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "matchedUser", fetch = FetchType.LAZY)
//    private List<MatchingHistory> matchingHistoryMatchedList = new ArrayList<>();


//    @Enumerated(EnumType.STRING)
//    private Authority authority;

    @Builder
    public User(Long userId, NicknameCount nicknameCount, String password, String email, int profileIconId, float userCredit, String serviceNickname) {
        this.userId = userId;
        this.nicknameCount = nicknameCount;
        this.password = password;
        this.email = email;
        this.profileIconId = profileIconId;
        this.userCredit = userCredit;
        this.serviceNickname = serviceNickname;
//        this.authority = authority;
    }
}
