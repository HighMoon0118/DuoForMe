package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@Entity
public class SetRiotData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long setRiotDataId;

    private String summonerName;

    private String matchId;

    private String championName;

    private String tier;

    private boolean win;

    private int teamId;

    private String individualPosition;

    @Builder
    public SetRiotData(String summonerName, String matchId, String championName, String tier, boolean win, int teamId, String individualPosition) {
        this.summonerName = summonerName;
        this.matchId = matchId;
        this.championName = championName;
        this.tier = tier;
        this.win = win;
        this.teamId = teamId;
        this.individualPosition = individualPosition;
    }
}
