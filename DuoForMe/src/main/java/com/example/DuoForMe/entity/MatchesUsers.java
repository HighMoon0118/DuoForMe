package com.example.DuoForMe.entity;

import com.example.DuoForMe.entity.Matches;
import com.example.DuoForMe.entity.RiotUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchesusers")
public class MatchesUsers{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchesUsersId;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Matches matches;

    @ManyToOne
    @JoinColumn(name = "puu_id")
    private RiotUser riotUser;

    @Builder
    public MatchesUsers(Long matchesUsersId, Matches matches, RiotUser riotUser) {
        this.matchesUsersId = matchesUsersId;
        this.matches = matches;
        this.riotUser = riotUser;

    }
}
