package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchinguserdetail")
public class MatchingUserDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "mathcing_user")
    private MatchingUser matchingUser;

    private String championName;

    private int count;

    private String position;

    @Builder
    public MatchingUserDetail(Long id, MatchingUser matchingUser, String championName, int count, String position) {
        this.id = id;
        this.matchingUser = matchingUser;
        this.championName = championName;
        this.count = count;
        this.position = position;
    }
}
