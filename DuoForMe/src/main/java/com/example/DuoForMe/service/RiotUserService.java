package com.example.DuoForMe.service;

import com.example.DuoForMe.entity.Matches;
import com.example.DuoForMe.entity.MatchesUsers;
import com.example.DuoForMe.entity.RiotUser;
import org.json.simple.parser.ParseException;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

public interface RiotUserService {
    public void insert(String name) throws HttpClientErrorException, ParseException;

    public void summonerInsert(String name) throws HttpClientErrorException, ParseException;
//    public Optional<RiotUser> selectOneUser(String name);


//    public List<MatchesUsers> selectAllByPuuId(String puuId) throws HttpClientErrorException;

    //    public RiotUserDTO read(String lol_nickname);
//
//    public List<MatchDTO> setNames(RiotUserDTO summonerDTO);
//
//    public List<MatchDTO> setTotalValue(List<MatchDTO> matchList);
//
//    public List<MostChampion> getMostChampion(List<MatchDTO> matchDTOList, long summonerId);
//
//    public List<ChampionDTO> getChampionList();
}
