package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchingHistoryRepository extends JpaRepository<MatchingHistory, Long> {
    List<MatchingHistory> findByOwnerUser(User user);

    MatchingHistory findByMatchedUser(User user);

    MatchingHistory findByMatchinghistoryId(Long id);
}
