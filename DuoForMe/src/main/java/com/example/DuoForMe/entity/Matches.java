package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter //Getter 메서드 생성
@NoArgsConstructor // 해당 클래스의 기본 생성자를 생성해주는 어노테이션
@Entity
public class Matches {
    @Id
    private String matchId;

    private int gameCreation;

    private int gameDuration;

    private String gameMode;

    private int gameStartTimestamp;

    @Builder
    public Matches(String matchId, int gameCreation, int gameDuration, String gameMode, int gameStartTimestamp) {
        this.matchId = matchId;
        this.gameCreation = gameCreation;
        this.gameDuration = gameDuration;
        this.gameMode = gameMode;
        this.gameStartTimestamp = gameStartTimestamp;
    }
}
