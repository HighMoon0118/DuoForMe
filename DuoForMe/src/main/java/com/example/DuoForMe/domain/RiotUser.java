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
    private String puu_id;

    private String lol_nickname;

    @Builder
    public RiotUser(String puu_id, String lol_nickname) {
        this.puu_id = puu_id;
        this.lol_nickname = lol_nickname;
    }
}
