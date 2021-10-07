package com.example.DuoForMe.repository;

import com.example.DuoForMe.entity.GoldWinRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GoldWinRateRepository extends JpaRepository<GoldWinRate, Long> {

    @Query(value = "select w.champB from GoldWinRate as w where w.champA = :champName and w.winRate >= 50 order by w.winRate desc")
    List<String> findBestChampBbyChampName(@Param("champName")String champName);

    @Query(value = "select w.champA from GoldWinRate as w where w.champB = :champName and w.winRate >= 50 order by w.winRate desc")
    List<String> findBestChampAbyChampName(@Param("champName")String champName);


}
