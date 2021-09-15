package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchesusers")
public class MatchesUsers extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchesUsersId;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Matches matches;

    @ManyToOne
    @JoinColumn(name = "puu_id")
    private RiotUser riotUser;

    private int assists;

    private int champLevel;

    private int championId;

    private String championName;

    private int deaths;

    private int totalDamagesDealtToChampions;

    private int detectorWardsPlaced;

    private int visionScore;

    private int totalDamageTaken;

    private int totalHeal;

    private int totalMinionsKilled;

    private int visionWardsBoughtInGames;

    private int kills;

    private String individualPosition;

    private int item0;
    private int item1;
    private int item2;
    private int item3;
    private int item4;
    private int item5;
    private int item6;

    private String teamPosition;

    private int summoner1Id;
    private int summoner2Id;

    private boolean win;

    private LocalDateTime updatedTime;

    @Builder
    public MatchesUsers(Long matchesUsersId, Matches matches, RiotUser riotUser, int assists, int champLevel, int championId, String championName, int deaths, int totalDamagesDealtToChampions, int detectorWardsPlaced, int visionScore, int totalDamageTaken, int totalHeal, int totalMinionsKilled, int visionWardsBoughtInGames, int kills, String individualPosition, int item0, int item1, int item2, int item3, int item4, int item5, int item6, String teamPosition, int summoner1Id, int summoner2Id, boolean win, LocalDateTime updatedTime) {
        this.matchesUsersId = matchesUsersId;
        this.matches = matches;
        this.riotUser = riotUser;
        this.assists = assists;
        this.champLevel = champLevel;
        this.championId = championId;
        this.championName = championName;
        this.deaths = deaths;
        this.totalDamagesDealtToChampions = totalDamagesDealtToChampions;
        this.detectorWardsPlaced = detectorWardsPlaced;
        this.visionScore = visionScore;
        this.totalDamageTaken = totalDamageTaken;
        this.totalHeal = totalHeal;
        this.totalMinionsKilled = totalMinionsKilled;
        this.visionWardsBoughtInGames = visionWardsBoughtInGames;
        this.kills = kills;
        this.individualPosition = individualPosition;
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
        this.item4 = item4;
        this.item5 = item5;
        this.item6 = item6;
        this.teamPosition = teamPosition;
        this.summoner1Id = summoner1Id;
        this.summoner2Id = summoner2Id;
        this.win = win;
        this.updatedTime = updatedTime;
    }
}
