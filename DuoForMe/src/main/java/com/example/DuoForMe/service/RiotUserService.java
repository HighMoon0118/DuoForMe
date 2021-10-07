package com.example.DuoForMe.service;

import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;


public interface RiotUserService {
    void insert(String name) throws HttpClientErrorException, ParseException;

    void summonerInsert(String name) throws HttpClientErrorException, ParseException;

    List<String> recommandChampions(String summonerName, List<String> duoTop5Champion) throws HttpClientErrorException;

    JSONArray recommandDuoChampions(String summonerName);
}
