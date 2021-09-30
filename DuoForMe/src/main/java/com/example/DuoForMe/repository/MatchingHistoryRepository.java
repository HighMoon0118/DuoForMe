package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchingHistoryRepository extends JpaRepository<MatchingHistory, Long> {
    List<MatchingHistory> findByOwnerUser(User user);

    MatchingHistory findByMatchedUser(User user);

    MatchingHistory findByMatchinghistoryId(Long id);

    @Modifying
    @Query(value = "UPDATE MatchingHistory history SET history.credit = :credit WHERE history.matchinghistoryId = :id")
    int updateCredit(Double credit, Long id);
}
