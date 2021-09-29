package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "matchinghistory")
public class MatchingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchinghistoryId;

    @ManyToOne
    @JoinColumn(name = "owner_user_id")
    private User ownerUser;

    @ManyToOne
    @JoinColumn(name = "matched_user_id")
    private User matchedUser;

    @Builder
    public MatchingHistory(Long matchinghistoryId, User ownerUser, User matchedUser) {
        this.matchinghistoryId = matchinghistoryId;
        this.ownerUser = ownerUser;
        this.matchedUser = matchedUser;
    }
}
