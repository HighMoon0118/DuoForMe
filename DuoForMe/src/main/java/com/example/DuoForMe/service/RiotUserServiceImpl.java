package com.example.DuoForMe.service;

import com.example.DuoForMe.entity.RiotUser;
import com.example.DuoForMe.repository.MatchesRepository;
import com.example.DuoForMe.repository.MatchesUsersRepository;
import com.example.DuoForMe.repository.RiotUserRepository;
import com.google.gson.Gson;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Transactional
public class RiotUserServiceImpl implements RiotUserService {
    private static final String RIOTGAMES_URL = "https://developer.riotgames.com";

    private static final String SEARCH_BY_NAME_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
    private static final String SEARCH_BY_ID_RECENT_20_GAMES = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/";
    private static final String SEARCH_BY_MATCH = "https://asia.api.riotgames.com/lol/match/v5/matches/";
    private static final String X_Riot_Token = "X-Riot-Token";
    private static final String API_KEY = "RGAPI-ad435959-44b1-4e46-ba45-bafeab2c959c";

    @Autowired
    private RiotUserRepository riotUserRepository;

    @Autowired
    private MatchesUsersRepository matchesUsersRepository;

    @Autowired
    private MatchesRepository matchesRepository;

    @Override
    public Optional<RiotUser> selectOneUser(String name) { return riotUserRepository.findByName(name); }

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    public static <T> HttpEntity<T> setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
        headers.set(HttpHeaders.ACCEPT_LANGUAGE, "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
        headers.set(HttpHeaders.ACCEPT_CHARSET, "application/x-www-form-urlencoded; charset=UTF-8");
        headers.set(HttpHeaders.ORIGIN, RIOTGAMES_URL);
        return new HttpEntity<T>(headers);
    }

    @Override
    public void insert(String name) throws HttpClientErrorException, ParseException {
        RestTemplate restTemplate = restTemplateBuilder.build();

        HttpEntity<RiotUser> httpEntity = setHeaders();
        ResponseEntity<RiotUser> responseEntity = restTemplate.exchange(SEARCH_BY_NAME_URL + name + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity, RiotUser.class);
        System.out.println(responseEntity.getBody());

        RiotUser riotUser = responseEntity.getBody();

        boolean check = riotUserRepository.existsByName(name);

        // DB에 등록되어있는 소환사인지 확인
        if (!check){
            System.out.println("새로운 소환사 등록");

            riotUserRepository.save(riotUser);
        }

        // 완료
        System.out.println("유저저장 완료");



        // DB에 있는 해당 이름의 riot user 가져옴
        Optional<RiotUser> existRiotUser = selectOneUser(name);

        // 매치 리스트 받아서 저장
        String[] responseString = restTemplate.getForObject(SEARCH_BY_ID_RECENT_20_GAMES + riotUser.getPuuid() + "/ids" + "?start=0&count=20&api_key=" + API_KEY, String[].class);
        System.out.println(responseString);
        List<String> matchlist = Arrays.asList(responseString);
        System.out.println(matchlist);

//         해당 유저의 Match 정보 20개 가져오기
        for(String match : matchlist) {
            System.out.println(match);

            HttpEntity httpEntity3 = setHeaders();
            System.out.println(SEARCH_BY_MATCH + match + "?api_key=" + API_KEY);
            ResponseEntity<JSONObject> responseEntity3 = restTemplate.exchange(SEARCH_BY_MATCH + match + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity3,
                    JSONObject.class);

//            System.out.println(responseEntity3.getBody());
//            System.out.println(responseEntity3.getBody().get("metadata"));
//            System.out.println(responseEntity3.getBody().get("info"));
//
//            System.out.println(responseEntity3.getBody().get("metadata").getClass());

            // 이중 json 형태 접근
            Gson gson = new Gson();
            String metadata_to_json = gson.toJson(responseEntity3.getBody().get("metadata"), LinkedHashMap.class);

            JSONParser jparser = new JSONParser();
            Object metaobj = jparser.parse(metadata_to_json);

            JSONObject metadata = (JSONObject) metaobj;
            System.out.println(metadata);
            System.out.println(metadata.get("matchId"));




//            Matches newmatch = responseEntity3.getBody();

//            Matches savematch;
//            savematch = Matches.builder()
//                    .matchId(match)
//                    .build();


            // match 저장
//            matchesRepository.save(newmatch);
//



////            // DB에 있는 해당 매치번호의 match 가져옴
//            Optional<Matches> existMatches = matchesRepository.findById(match.toString());
////
////            // matchuser 저장
//            MatchesUsers matchuser;
//            matchuser = MatchesUsers.builder()
//                    .riotUser(existRiotUser.get())
//                    .matches(existMatches.get())
//                    .build();
        }
    }

//    @Override
//


}
