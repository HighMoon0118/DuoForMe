package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class UserStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userStatisticsId;

    @ManyToOne
    @JoinColumn(name = "puu_id")
    private RiotUser riotUser;

    private String individualPosition;

    private String championName;

    private int totalGameCount;

    private int totalKills;

    private int totalAssists;

    private int totalDeath;

    private int totalDamageTaken;

    private int totalDamagesDealtToChampions;

    private int totalHeal;

    private int totalVisionScore;

    private int totalMinionsKilled;

    private int totalWin;

    private int championLevel;

    private int championPoint;

    @Builder
    public UserStatistics(Long userStatisticsId, RiotUser riotUser, String individualPosition, String championName, int totalGameCount, int totalKills, int totalAssists, int totalDeath, int totalDamageTaken, int totalDamagesDealtToChampions, int totalHeal, int totalVisionScore, int totalMinionsKilled, int totalWin, int championLevel, int championPoint) {
        this.userStatisticsId = userStatisticsId;
        this.riotUser = riotUser;
        this.individualPosition = individualPosition;
        this.championName = championName;
        this.totalGameCount = totalGameCount;
        this.totalKills = totalKills;
        this.totalAssists = totalAssists;
        this.totalDeath = totalDeath;
        this.totalDamageTaken = totalDamageTaken;
        this.totalDamagesDealtToChampions = totalDamagesDealtToChampions;
        this.totalHeal = totalHeal;
        this.totalVisionScore = totalVisionScore;
        this.totalMinionsKilled = totalMinionsKilled;
        this.totalWin = totalWin;
        this.championLevel = championLevel;
        this.championPoint = championPoint;
    }
}
