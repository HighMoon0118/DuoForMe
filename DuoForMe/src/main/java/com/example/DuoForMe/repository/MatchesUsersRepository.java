package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchesUsers;
import com.example.DuoForMe.entity.RiotUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchesUsersRepository extends JpaRepository<MatchesUsers, Long> {
    public List<MatchesUsers> findAllByRiotUser(RiotUser riotUser);
}
