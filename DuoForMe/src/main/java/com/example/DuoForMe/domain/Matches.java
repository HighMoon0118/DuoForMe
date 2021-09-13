package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter //Getter 메서드 생성
@NoArgsConstructor // 해당 클래스의 기본 생성자를 생성해주는 어노테이션
@Entity
public class Matches {
    @Id
    private String match_id;

    @NotNull
    private int game_creation;

    @NotNull
    private int game_duration;

    @NotNull
    private String game_mode;

    @NotNull
    private int game_start_timestamp;

    @Builder
    public Matches(String match_id, int game_creation, int game_duration, String game_mode, int game_start_timestamp) {
        this.match_id = match_id;
        this.game_creation = game_creation;
        this.game_duration = game_duration;
        this.game_mode = game_mode;
        this.game_start_timestamp = game_start_timestamp;
    }
}
