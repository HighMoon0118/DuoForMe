package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class RiotUser {

    @Id
    private String puuid;

    @NotNull
    private String lol_nickname;

    @Builder
    public RiotUser(String puuid, String lol_nickname) {
        this.puuid = puuid;
        this.lol_nickname = lol_nickname;
    }
}
