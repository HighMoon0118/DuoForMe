package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter //Getter 메서드 생성
@NoArgsConstructor // 해당 클래스의 기본 생성자를 생성해주는 어노테이션
@Entity
public class Matches {
    @Id
    private String matchId;

    private Long gameCreation;

    private Long gameDuration;

    private String gameMode;

    private Long gameStartTimestamp;


    @Builder
    public Matches(String matchId, Long gameCreation, Long gameDuration, String gameMode, Long gameStartTimestamp) {
        this.matchId = matchId;
        this.gameCreation = gameCreation;
        this.gameDuration = gameDuration;
        this.gameMode = gameMode;
        this.gameStartTimestamp = gameStartTimestamp;
    }

    public Matches toEntity() {
        return Matches.builder()
                .matchId(matchId)
                .gameCreation(gameCreation)
                .gameDuration(gameDuration)
                .gameMode(gameMode)
                .gameStartTimestamp(gameStartTimestamp)
                .build();
    }
    }

