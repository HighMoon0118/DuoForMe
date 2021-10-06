package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchinguser")
public class MatchingUser {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @MapsId
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String myPosition;

    private String duoPosition;

    private String tier;

    @Builder
    public MatchingUser(Long userId, User user, String myPosition, String duoPosition, String tier) {
        this.userId = userId;
        this.user = user;
        this.myPosition = myPosition;
        this.duoPosition = duoPosition;
        this.tier = tier;
    }
}
