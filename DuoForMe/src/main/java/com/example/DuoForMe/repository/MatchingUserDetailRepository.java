package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.MatchingUserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchingUserDetailRepository extends JpaRepository<MatchingUserDetail, Long> {
    List<MatchingUserDetail> findAllByMatchingUser(MatchingUser matchingUser);
    void deleteAllByMatchingUser(MatchingUser matchingUser);
}
