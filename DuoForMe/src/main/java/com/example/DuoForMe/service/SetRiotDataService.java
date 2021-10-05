package com.example.DuoForMe.service;

import org.json.simple.parser.ParseException;
import org.springframework.web.client.HttpClientErrorException;

public interface SetRiotDataService {
    public void insert(String tier, String step) throws HttpClientErrorException, ParseException, InterruptedException;
}
