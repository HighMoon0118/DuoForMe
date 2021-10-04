package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.SetRiotData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetRiotDataRepository extends JpaRepository<SetRiotData, String> {
}
