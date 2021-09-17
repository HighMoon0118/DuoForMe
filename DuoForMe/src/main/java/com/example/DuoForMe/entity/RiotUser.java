package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class RiotUser {

    @Id
    private String puuId;

    private String lolNickname;

    @Builder
    public RiotUser(String puuId, String lolNickname) {
        this.puuId = puuId;
        this.lolNickname = lolNickname;
    }
}
