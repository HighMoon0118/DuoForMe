package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Stack;

public interface MatchingUserRepository extends JpaRepository<MatchingUser, Long> {
    boolean existsMatchingUserByUserId(Long userId);

    Stack<MatchingUser> findAll();

//    Optional<MatchingUser> findById(Long userId);
    MatchingUser findMatchingUserByUserId(Long userId);
}
