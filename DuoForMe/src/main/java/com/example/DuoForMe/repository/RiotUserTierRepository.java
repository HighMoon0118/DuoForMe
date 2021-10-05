package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.RiotUser;
import com.example.DuoForMe.entity.RiotUserTier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiotUserTierRepository extends JpaRepository<RiotUserTier, RiotUser> {
    public Optional<RiotUserTier> findByRiotUser(RiotUser riotUser);
}
