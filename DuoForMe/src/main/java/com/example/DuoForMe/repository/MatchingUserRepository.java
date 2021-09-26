package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatchingUserRepository extends JpaRepository<MatchingUser, Long> {
    boolean existsMatchingUserByUserId(Long userId);

    List<MatchingUser> findAll();

//    Optional<MatchingUser> findById(Long userId);
    MatchingUser findMatchingUserByUserId(Long userId);
}
