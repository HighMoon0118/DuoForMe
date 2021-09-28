package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.RiotUser;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.DuoForMe.entity.Matches;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchesRepository extends JpaRepository<Matches, String> {
    public Optional<Matches> findByMatchId(String MatchId);
    public Boolean existsByMatchId(String MatchId);
}
