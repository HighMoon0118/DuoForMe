package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.Blacklist;
import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {
    List<Blacklist> findByOwnerUser(User user);
    boolean existsByBlackUser(User blackUser);
    Optional<Blacklist> findByBlacklistId(Long id);
}
