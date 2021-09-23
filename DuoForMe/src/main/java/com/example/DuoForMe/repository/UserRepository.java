package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByServiceNickname(String serviceNickname);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String Email);
    Optional<User> findByServiceNickname(String serviceNickname);

}
