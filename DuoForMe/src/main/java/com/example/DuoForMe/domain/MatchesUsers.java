package com.example.DuoForMe.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Entity
public class MatchesUsers extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matches_users_id;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Matches matches;

    @ManyToOne
    @JoinColumn(name = "puu_id")
    private MatchesUsers matchesUsers;

    private int assists;

    private int champ_level;

    private int champion_id;

    private String champion_name;

    private int deaths;

    private int total_damages_dealt_to_champions;

    private int detector_wards_placed;

    private int vision_score;

    private int total_damage_taken;

    private int total_heal;

    private int total_minions_killed;

    private int vision_wards_bought_in_games;

    private int kills;

    private String individual_position;

    private int item0;
    private int item1;
    private int item2;
    private int item3;
    private int item4;
    private int item5;
    private int item6;

    private String team_position;

    private int summoner1_id;
    private int summoner2_id;

    private boolean win;

    private LocalDateTime updated_time;

    @Builder
    public MatchesUsers(Long matches_users_id, Matches matches, MatchesUsers matchesUsers, int assists, int champ_level, int champion_id, String champion_name, int deaths, int total_damages_dealt_to_champions, int detector_wards_placed, int vision_score, int total_damage_taken, int total_heal, int total_minions_killed, int vision_wards_bought_in_games, int kills, String individual_position, int item0, int item1, int item2, int item3, int item4, int item5, int item6, String team_position, int summoner1_id, int summoner2_id, boolean win, LocalDateTime updated_time) {
        this.matches_users_id = matches_users_id;
        this.matches = matches;
        this.matchesUsers = matchesUsers;
        this.assists = assists;
        this.champ_level = champ_level;
        this.champion_id = champion_id;
        this.champion_name = champion_name;
        this.deaths = deaths;
        this.total_damages_dealt_to_champions = total_damages_dealt_to_champions;
        this.detector_wards_placed = detector_wards_placed;
        this.vision_score = vision_score;
        this.total_damage_taken = total_damage_taken;
        this.total_heal = total_heal;
        this.total_minions_killed = total_minions_killed;
        this.vision_wards_bought_in_games = vision_wards_bought_in_games;
        this.kills = kills;
        this.individual_position = individual_position;
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
        this.item4 = item4;
        this.item5 = item5;
        this.item6 = item6;
        this.team_position = team_position;
        this.summoner1_id = summoner1_id;
        this.summoner2_id = summoner2_id;
        this.win = win;
        this.updated_time = updated_time;
    }
}
