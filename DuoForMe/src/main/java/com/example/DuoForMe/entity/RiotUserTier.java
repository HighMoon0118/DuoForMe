package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "riotusertier")
public class RiotUserTier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long riotusertierId;

    @OneToOne
    @JoinColumn(name = "riotuser_lol_nickname")
    private RiotUser riotUser;

    private String queueType;

    private String tier;

    @Column(name = "rank_number")
    private String rank;

    private int win;

    private int lose;

    @Builder
    public RiotUserTier(Long riotusertierId, RiotUser riotUser, String queueType, String tier, String rank, int win, int lose) {
        this.riotusertierId = riotusertierId;
        this.riotUser = riotUser;
        this.queueType = queueType;
        this.tier = tier;
        this.rank = rank;
        this.win = win;
        this.lose = lose;
    }


}
