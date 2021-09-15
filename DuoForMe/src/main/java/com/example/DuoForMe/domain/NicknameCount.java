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
    private String lolNickname;

    private int count;

    @Builder
    public NicknameCount(String lolNickname, int count) {
        this.lolNickname = lolNickname;
        this.count = count;
    }
}
