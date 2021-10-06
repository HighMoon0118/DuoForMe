package com.example.DuoForMe.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "winrate")
public class GoldWinRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "champ_a")
    private String champA;

    @Column(name = "champ_b")
    private String champB;

    private int loseCount;

    private int winCount;

    private int winRate;
}
