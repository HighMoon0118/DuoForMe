package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchinguser")
public class MatchingUser {

    @Id
    private Long userId;

    @MapsId
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String myPosition;

    private String duoPosition;

    @Builder
    public MatchingUser(Long userId, User user, String myPosition, String duoPosition) {
        this.userId = userId;
        this.user = user;
        this.myPosition = myPosition;
        this.duoPosition = duoPosition;
    }
}
