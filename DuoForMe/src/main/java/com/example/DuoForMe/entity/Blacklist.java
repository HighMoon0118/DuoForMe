package com.example.DuoForMe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Blacklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long blacklistId;

    @ManyToOne
    @JoinColumn(name = "owner_user_id")
    private User ownerUser;

    @ManyToOne
    @JoinColumn(name = "black_user_id")
    private User blackUser;


    @Builder
    public Blacklist(long blacklistId, User ownerUser, User blackUser) {
        this.blacklistId = blacklistId;
        this.ownerUser = ownerUser;
        this.blackUser = blackUser;
    }
}
