package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "chapionmastery")
public class ChampionMastery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long championmasteryId;

    @ManyToOne
    @JoinColumn(name = "riotuser_lol_nickname")
    private RiotUser riotUser;

    private int championId;

    private int championLevel;

    private Long championPoionts;

    @Builder
    public ChampionMastery(Long championmasteryId, RiotUser riotUser, int championId, int championLevel, Long championPoionts) {
        this.championmasteryId = championmasteryId;
        this.riotUser = riotUser;
        this.championId = championId;
        this.championLevel = championLevel;
        this.championPoionts = championPoionts;
    }
}
