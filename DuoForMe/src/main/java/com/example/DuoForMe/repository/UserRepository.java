package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByServiceNickname(String serviceNickname);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String Email);
    Optional<User> findByServiceNickname(String serviceNickname);
    Optional<User> findByUserId(Long userId);


    @Modifying
    @Query(value = "UPDATE User u SET u.userCredit = :credit WHERE u.userId = :id")
    int updateCredit(Double credit, Long id);

    @Modifying
    @Query(value = "UPDATE User u SET u.evaluated = :evaluated WHERE u.userId = :id")
    int updateEvaluated(int evaluated, Long id);

    @Modifying
    @Query(value = "UPDATE User u SET u.lolNickname = :nickname WHERE u.userId = :id")
    int updateNickname(String nickname, Long id);

}
