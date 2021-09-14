package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Perks{

    @Id
    private Long matches_users_id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "matches_users_id")
    private MatchesUsers matchesUsers;

    private int defense;
    private int flex;
    private int offense;

    private int primary_style;
    private int primary_style_perk1;
    private int primary_style_perk2;
    private int primary_style_perk3;
    private int primary_style_perk4;

    private int sub_style;
    private int sub_style_perk1;
    private int sub_style_perk2;

    @Builder
    public Perks(MatchesUsers matchesUsers, int defense, int flex, int offense, int primary_style, int primary_style_perk1, int primary_style_perk2, int primary_style_perk3, int primary_style_perk4, int sub_style, int sub_style_perk1, int sub_style_perk2) {
        this.matchesUsers = matchesUsers;
        this.defense = defense;
        this.flex = flex;
        this.offense = offense;
        this.primary_style = primary_style;
        this.primary_style_perk1 = primary_style_perk1;
        this.primary_style_perk2 = primary_style_perk2;
        this.primary_style_perk3 = primary_style_perk3;
        this.primary_style_perk4 = primary_style_perk4;
        this.sub_style = sub_style;
        this.sub_style_perk1 = sub_style_perk1;
        this.sub_style_perk2 = sub_style_perk2;
    }
}
