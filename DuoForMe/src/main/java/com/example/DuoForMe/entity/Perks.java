package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "perks")
public class Perks{

    @Id
    private Long matchesUsersId;

    @MapsId
    @OneToOne
    @JoinColumn(name = "matches_users_id")
    private MatchesUsers matchesUsers;

    private int defense;
    private int flex;
    private int offense;

    private int primaryStyle;
    private int primaryStylePerk1;
    private int primaryStylePerk2;
    private int primaryStylePerk3;
    private int primaryStylePerk4;

    private int subStyle;
    private int subStylePerk1;
    private int subStylePerk2;

    @Builder
    public Perks(Long matchesUsersId, MatchesUsers matchesUsers, int defense, int flex, int offense, int primaryStyle, int primaryStylePerk1, int primaryStylePerk2, int primaryStylePerk3, int primaryStylePerk4, int subStyle, int subStylePerk1, int subStylePerk2) {
        this.matchesUsersId = matchesUsersId;
        this.matchesUsers = matchesUsers;
        this.defense = defense;
        this.flex = flex;
        this.offense = offense;
        this.primaryStyle = primaryStyle;
        this.primaryStylePerk1 = primaryStylePerk1;
        this.primaryStylePerk2 = primaryStylePerk2;
        this.primaryStylePerk3 = primaryStylePerk3;
        this.primaryStylePerk4 = primaryStylePerk4;
        this.subStyle = subStyle;
        this.subStylePerk1 = subStylePerk1;
        this.subStylePerk2 = subStylePerk2;
    }
}
