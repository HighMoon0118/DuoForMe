package com.example.DuoForMe.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class MatchingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchinghistory_id;

//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "matched_user_id", referencedColumnName = "user_id"),
//            @JoinColumn(name = "owner_user_id", referencedColumnName = "user_id")
//    })
//    private User user;

    @ManyToOne
    @JoinColumn(name = "owner_user_id")
    private User ownerUser;

    @ManyToOne
    @JoinColumn(name = "matched_user_id")
    private User matchedUser;
}
