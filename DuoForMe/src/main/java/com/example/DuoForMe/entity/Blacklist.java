package com.example.DuoForMe.entity;

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
}
