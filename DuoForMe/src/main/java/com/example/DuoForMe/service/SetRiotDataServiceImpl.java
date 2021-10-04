package com.example.DuoForMe.service;

import com.example.DuoForMe.entity.*;
import com.example.DuoForMe.repository.MatchesUsersRepository;
import com.example.DuoForMe.repository.RiotUserRepository;
import com.example.DuoForMe.repository.SetRiotDataRepository;
import com.google.gson.Gson;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class SetRiotDataServiceImpl implements SetRiotDataService{
    private static final String RIOTGAMES_URL = "https://developer.riotgames.com";
    private static final String TIER_SUMMONER_URL = "https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/GOLD/I?page=500&api_key=RGAPI-206c2058-765a-4f56-9148-85e1d7166424";
    private static final String SEARCH_BY_NAME_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
    private static final String SEARCH_BY_PUUID_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/";
    private static final String SEARCH_BY_ID_RECENT_20_GAMES = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/";
    private static final String SEARCH_BY_MATCH = "https://asia.api.riotgames.com/lol/match/v5/matches/";
    private static final String SEARCH_BY_TIER = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/";
    private static final String API_KEY = "RGAPI-40420afe-e73b-4b4a-b536-b127a9db84b1";

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;
    @Autowired
    private SetRiotDataRepository setRiotDataRepository;
    @Autowired
    private MatchesUsersRepository matchesUsersRepository;

    public static <T> HttpEntity<T> setHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36");
        headers.set(HttpHeaders.ACCEPT_LANGUAGE, "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
        headers.set(HttpHeaders.ACCEPT_CHARSET, "application/x-www-form-urlencoded; charset=UTF-8");
        headers.set(HttpHeaders.ORIGIN, RIOTGAMES_URL);
        return new HttpEntity<T>(headers);
    }


    @Override
    public void insert(String tier, String step) throws HttpClientErrorException, ParseException, InterruptedException {
        // api 제한 피하기
        long beforeTime = System.currentTimeMillis();; //코드 실행 전에 시간 받아오기

        RestTemplate restTemplate = restTemplateBuilder.build();

        HttpEntity<RiotUser> httpEntity = setHeaders();
        ResponseEntity<JSONArray> responseList = restTemplate.exchange(TIER_SUMMONER_URL + tier + "/" + step +"?page=1&api_key=" + API_KEY, HttpMethod.GET, httpEntity, JSONArray.class);
        System.out.println(responseList);

        // 이중 json 형태 접근
        Gson gson = new Gson();
        JSONParser jparser = new JSONParser();

        for (int i = 0; i < responseList.getBody().size(); i++) {
            Object getUser = responseList.getBody().get(i);
            String getUserToJson = gson.toJson(getUser, LinkedHashMap.class);

            Object getUserObj = jparser.parse(getUserToJson);
            JSONObject user = (JSONObject) getUserObj;
            String name = user.get("summonerName").toString();

            ResponseEntity<RiotUser> responseEntity = restTemplate.exchange(SEARCH_BY_NAME_URL + name + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity, RiotUser.class);

            RiotUser riotUser = responseEntity.getBody();
            String selectedPuuid = riotUser.getPuuid();

            // 매치 리스트 받아서 저장
            String[] responseString = restTemplate.getForObject(SEARCH_BY_ID_RECENT_20_GAMES + selectedPuuid + "/ids?type=ranked&start=0&count=50&api_key=" + API_KEY, String[].class);
            System.out.println(responseString);
            List<String> matchlist = Arrays.asList(responseString);
            System.out.println(matchlist);

            //현재까지 api 요청 count 3개

//         해당 유저의 Match 정보 n개 가져오기
            for(String match : matchlist) {
                ResponseEntity<JSONObject> responseEntity3 = restTemplate.exchange(SEARCH_BY_MATCH + match + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity,
                        JSONObject.class);

                // info 정의
                String info_to_json = gson.toJson(responseEntity3.getBody().get("info"), LinkedHashMap.class);

                Object infoobj = jparser.parse(info_to_json);
                JSONObject info = (JSONObject) infoobj;
                String gameMode = info.get("gameMode").toString();

                System.out.println(gameMode);
                System.out.println(gameMode.getClass());

//             소환사협곡 게임만 가져옴
                if (gameMode.equals("CLASSIC")) {
                    // metadata 정의
                    String metadata_to_json = gson.toJson(responseEntity3.getBody().get("metadata"), LinkedHashMap.class);
                    Object metaobj = jparser.parse(metadata_to_json);

                    JSONObject metadata = (JSONObject) metaobj;
                    System.out.println(metadata);
                    System.out.println(metadata.get("matchId"));

                    // metadata participants
                    ArrayList meta_part_arraylist = new ArrayList();
                    meta_part_arraylist = (ArrayList) metadata.get("participants");

                    // info participants
                    ArrayList info_part_arraylist = new ArrayList();
                    info_part_arraylist = (ArrayList) info.get("participants");

                    //              같이 게임한 10명의 Matchdata 생성
                    for (int j = 0; j < 10; j++) {
                        Object infoParticipantsObj = jparser.parse(info_part_arraylist.get(j).toString());
                        JSONObject infoParticipants = (JSONObject) infoParticipantsObj;

                        if (infoParticipants.get("gameEndedInEarlySurrender").toString().equals("false")) {
                            String summonerName = infoParticipants.get("summonerName").toString();
                            String matchId = metadata.get("matchId").toString();
                            String championName = infoParticipants.get("championName").toString();
                            boolean win = Boolean.parseBoolean(infoParticipants.get("win").toString());
                            int teamId = Integer.parseInt(infoParticipants.get("teamId").toString());
                            String individualPosition = infoParticipants.get("individualPosition").toString();


                            SetRiotData buildSetRiotData = SetRiotData.builder()
                                    .summonerName(summonerName)
                                    .matchId(matchId)
                                    .championName(championName)
                                    .tier(tier)
                                    .win(win)
                                    .teamId(teamId)
                                    .individualPosition(individualPosition)
                                    .build();
                            setRiotDataRepository.save(buildSetRiotData);
                        }
                    }
                }
            }
            TimeUnit.SECONDS.sleep(60);


//            if (cnt > 70 || secDiffTime > 40) {
//                TimeUnit.SECONDS.sleep(20);
//            }

        }
    long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
    long secDiffTime = (afterTime - beforeTime)/1000; //두 시간에 차 계산
    System.out.println("시간차이(m) : "+secDiffTime);
    }
}
