package com.example.DuoForMe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.DuoForMe.entity.Matches;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchesRepository extends JpaRepository<Matches, String> {
}
