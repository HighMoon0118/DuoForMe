package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.NicknameCount;
import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NicknameCountRepository extends JpaRepository<NicknameCount, String> {
    boolean existsByLolNickname(String lolNickname);

    @Modifying
    @Query(value = "UPDATE NicknameCount nc SET nc.count = :count WHERE nc.lolNickname = :nickname")
    int updateCount(String nickname, int count);
}
