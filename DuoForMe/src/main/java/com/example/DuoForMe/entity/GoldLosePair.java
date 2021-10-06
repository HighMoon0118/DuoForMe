package com.example.DuoForMe.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "gold_lose_pair")
public class GoldLosePair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String champA;

    private String champB;

    private int loseCount;
}
