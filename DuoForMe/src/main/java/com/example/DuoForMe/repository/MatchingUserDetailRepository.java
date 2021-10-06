package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.MatchingUserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingUserDetailRepository extends JpaRepository<MatchingUserDetail, Long> {
    void deleteAllByMatchingUser(MatchingUser matchingUser);
}
