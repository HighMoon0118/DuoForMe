package com.example.DuoForMe.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@ToString
@Entity
@Table(name="riotuser")
public class RiotUser {

    @Id
    @Column(name = "lol_nickname")
    private String name;

    @Column(name = "puu_id")
    private String puuid;

    private String accountId;

//    @Column(name = "puu_id")
    private String id;



    private Long profileIconId;

    private Long revisionDate;

    private Long summonerLevel;

//    @Builder
//    public RiotUser(String puuId, String lolNickname) {
//        this.puuId = puuId;
//        this.lolNickname = lolNickname;
//    }
}
