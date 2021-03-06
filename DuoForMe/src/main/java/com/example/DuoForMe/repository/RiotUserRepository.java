package com.example.DuoForMe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.DuoForMe.entity.RiotUser;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiotUserRepository extends JpaRepository<RiotUser, String> {
    @Override
    RiotUser save(RiotUser riotUser);

    public Optional<RiotUser> findByPuuid(String Puuid);

    public Boolean existsByName(String Name);

    public Boolean existsByPuuid(String Puuid);

    RiotUser findByName(String name);
}
