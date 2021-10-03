package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.Matches;
import com.example.DuoForMe.entity.MatchesUsers;
import com.example.DuoForMe.entity.RiotUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchesUsersRepository extends JpaRepository<MatchesUsers, Long> {
    public List<MatchesUsers> findAllByRiotUser(RiotUser riotUser);
//    public boolean existsByMatchesAndRiotUser(Matches matches, RiotUser riotUser);
    @Query("select mu from MatchesUsers mu left join fetch mu.matches m where mu.riotUser = :riotUser order by m.gameCreation desc")
    List<MatchesUsers> find50ByRiotUser(@Param("riotUser") RiotUser riotUser);

    @Query("select case when count(mu)> 0 then true else false end from MatchesUsers mu where mu.matches = :matches and mu.riotUser = :riotUser")
    boolean existsByMatchesAndRiotUser(@Param("matches") Matches matches, @Param("riotUser") RiotUser riotUser);
}
