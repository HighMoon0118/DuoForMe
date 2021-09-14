package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class MatchingUser {

    @Id
    private Long user_id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String my_position;

    private String duo_position;

    @Builder
    public MatchingUser(User user, String my_position, String duo_position) {
        this.user = user;
        this.my_position = my_position;
        this.duo_position = duo_position;
    }
}
