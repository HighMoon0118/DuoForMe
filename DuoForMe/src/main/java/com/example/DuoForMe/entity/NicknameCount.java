package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "nicknamecount")
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
