package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class NicknameCount {

    @Id
    private String lol_nickname;

    private int count;

    @Builder
    public NicknameCount(String lol_nickname, int count) {
        this.lol_nickname = lol_nickname;
        this.count = count;
    }
}
