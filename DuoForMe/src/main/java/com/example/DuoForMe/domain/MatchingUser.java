package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class MatchingUser {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    private String my_position;

    @NotNull
    private String duo_position;

    @Builder
    public MatchingUser(User user, String my_position, String duo_position) {
        this.user = user;
        this.my_position = my_position;
        this.duo_position = duo_position;
    }
}
