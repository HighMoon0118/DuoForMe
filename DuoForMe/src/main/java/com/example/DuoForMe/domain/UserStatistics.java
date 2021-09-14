package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
public class UserStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_statistics_id;

    @ManyToOne
    @JoinColumn(name = "puu_id")
    private RiotUser riotUser;

    private String individual_position;

    private String champion_name;

    private int total_game_count;

    private int total_kills;

    private int total_assists;

    private int total_death;

    private int total_damage_taken;

    private int total_damages_dealt_to_champions;

    private int total_heal;

    private int total_vision_score;

    private int total_minions_killed;

    private int total_win;

    private int champion_level;

    private int champion_point;

    @Builder
    public UserStatistics(RiotUser riotUser, String individual_position, String champion_name, int total_game_count, int total_kills, int total_assists, int total_death, int total_damage_taken, int total_damages_dealt_to_champions, int total_heal, int total_vision_score, int total_minions_killed, int total_win, int champion_level, int champion_point) {
        this.riotUser = riotUser;
        this.individual_position = individual_position;
        this.champion_name = champion_name;
        this.total_game_count = total_game_count;
        this.total_kills = total_kills;
        this.total_assists = total_assists;
        this.total_death = total_death;
        this.total_damage_taken = total_damage_taken;
        this.total_damages_dealt_to_champions = total_damages_dealt_to_champions;
        this.total_heal = total_heal;
        this.total_vision_score = total_vision_score;
        this.total_minions_killed = total_minions_killed;
        this.total_win = total_win;
        this.champion_level = champion_level;
        this.champion_point = champion_point;
    }
}
