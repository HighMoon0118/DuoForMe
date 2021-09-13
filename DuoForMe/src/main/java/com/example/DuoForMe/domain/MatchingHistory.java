package com.example.DuoForMe.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class MatchingHistory {

    @NotNull
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "matched_user_id", referencedColumnName = "user_id"),
            @JoinColumn(name = "owner_user_id", referencedColumnName = "user_id")
    })
    private User user;


}
