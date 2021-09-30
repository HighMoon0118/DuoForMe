package com.example.DuoForMe.service;

import com.example.DuoForMe.entity.Matches;
import com.example.DuoForMe.entity.MatchesUsers;
import com.example.DuoForMe.entity.RiotUser;
import com.example.DuoForMe.repository.MatchesRepository;
import com.example.DuoForMe.repository.MatchesUsersRepository;
import com.example.DuoForMe.repository.RiotUserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import org.json.simple.JSONArray;
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

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class RiotUserServiceImpl implements RiotUserService {
    private static final String RIOTGAMES_URL = "https://developer.riotgames.com";

    private static final String SEARCH_BY_NAME_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
    private static final String SEARCH_BY_PUUID_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/";
    private static final String SEARCH_BY_ID_RECENT_20_GAMES = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/";
    private static final String SEARCH_BY_MATCH = "https://asia.api.riotgames.com/lol/match/v5/matches/";
    private static final String X_Riot_Token = "X-Riot-Token";
    private static final String API_KEY = "RGAPI-40420afe-e73b-4b4a-b536-b127a9db84b1";

    @Autowired
    private RiotUserRepository riotUserRepository;

    @Autowired
    private MatchesUsersRepository matchesUsersRepository;

    @Autowired
    private MatchesRepository matchesRepository;

//    @Override
//    public Optional<RiotUser> selectOneUser(String name) { return riotUserRepository.findByPuuid(name); }

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
//        System.out.println(responseEntity.getBody());

        RiotUser riotUser = responseEntity.getBody();

        boolean checkRiotUser = riotUserRepository.existsByName(name);

        // DB에 등록되어있는 소환사인지 확인
        if (!checkRiotUser){
            System.out.println("새로운 소환사 등록");

            riotUserRepository.save(riotUser);
        }

        // 완료
        System.out.println("유저저장 완료");

        // 매치 리스트 받아서 저장
        String[] responseString = restTemplate.getForObject(SEARCH_BY_ID_RECENT_20_GAMES + riotUser.getPuuid() + "/ids" + "?start=0&count=10&api_key=" + API_KEY, String[].class);
        System.out.println(responseString);
        List<String> matchlist = Arrays.asList(responseString);
        System.out.println(matchlist);

//         해당 유저의 Match 정보 n개 가져오기
        for(String match : matchlist) {
            // 등록돼있지 않은 게임이라면
            boolean checkMatch = matchesRepository.existsByMatchId(match);
            if (!checkMatch){

                System.out.println(match);

                HttpEntity httpEntity3 = setHeaders();
                System.out.println(SEARCH_BY_MATCH + match + "?api_key=" + API_KEY);
                ResponseEntity<JSONObject> responseEntity3 = restTemplate.exchange(SEARCH_BY_MATCH + match + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity3,
                        JSONObject.class);
                // 이중 json 형태 접근
                Gson gson = new Gson();
                JSONParser jparser = new JSONParser();

                // info 정의
                String info_to_json = gson.toJson(responseEntity3.getBody().get("info"), LinkedHashMap.class);

                Object infoobj = jparser.parse(info_to_json);
                JSONObject info = (JSONObject) infoobj;
                String gameMode = info.get("gameMode").toString();

                System.out.println(gameMode);
                System.out.println(gameMode.getClass());

//             소환사협곡 게임만 가져옴
                if (gameMode.equals("CLASSIC")){

                    Long gameCreation = Long.parseLong(info.get("gameCreation").toString());
                    Long gameDuration = Long.parseLong(info.get("gameDuration").toString());
                    Long gameStartTimestamp = Long.parseLong(info.get("gameStartTimestamp").toString());

                    Matches buildMatch = Matches.builder()
                            .matchId(match)
                            .gameCreation(gameCreation)
                            .gameDuration(gameDuration)
                            .gameMode(gameMode)
                            .gameStartTimestamp(gameStartTimestamp)
                            .build();

//              match 저장
                    matchesRepository.save(buildMatch);

// 완료
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
                    for (int i = 0; i < 10; i++) {
                        String puuid = meta_part_arraylist.get(i).toString();
                        boolean newcheck = riotUserRepository.existsByPuuid(puuid);

                        // DB에 등록되어있는 소환사인지 확인
                        // 아니라면 DB에 추가
                        if (!newcheck){
                            System.out.println("새로운 소환사 등록");
                            ResponseEntity<RiotUser> newresponseEntity = restTemplate.exchange(SEARCH_BY_PUUID_URL + puuid + "?api_key=" + API_KEY, HttpMethod.GET, httpEntity, RiotUser.class);
                            RiotUser newriotUser = newresponseEntity.getBody();
                            riotUserRepository.save(newriotUser);
                        }


                        Object infoParticipantsObj = jparser.parse(info_part_arraylist.get(i).toString());
                        JSONObject infoParticipants = (JSONObject) infoParticipantsObj;

                        // DB에 있는 해당 이름의 riot user 가져옴
                        Optional<RiotUser> summoner = riotUserRepository.findByPuuid(puuid);
                        System.out.println(summoner);

                        //DB에 있는 해당 게임의 match 가져옴
                        String matchid = metadata.get("matchId").toString();
                        Optional<Matches> matches = matchesRepository.findByMatchId(matchid);


                        int assists = Integer.parseInt(infoParticipants.get("assists").toString());
                        int champLevel = Integer.parseInt(infoParticipants.get("champLevel").toString());
                        int championId = Integer.parseInt(infoParticipants.get("championId").toString());
                        String championName = infoParticipants.get("championName").toString();
                        int deaths = Integer.parseInt(infoParticipants.get("deaths").toString());
                        int totalDamagesDealtToChampions = Integer.parseInt(infoParticipants.get("totalDamageDealtToChampions").toString());
                        int detectorWardsPlaced = Integer.parseInt(infoParticipants.get("detectorWardsPlaced").toString());
                        int visionScore = Integer.parseInt(infoParticipants.get("visionScore").toString());
                        int totalDamageTaken = Integer.parseInt(infoParticipants.get("totalDamageTaken").toString());
                        int totalHeal = Integer.parseInt(infoParticipants.get("totalHeal").toString());
                        int totalMinionsKilled = Integer.parseInt(infoParticipants.get("totalMinionsKilled").toString());
                        int visionWardsBoughtInGames = Integer.parseInt(infoParticipants.get("visionWardsBoughtInGame").toString());
                        int kills = Integer.parseInt(infoParticipants.get("kills").toString());
                        String individualPosition = infoParticipants.get("individualPosition").toString();
                        int item0 = Integer.parseInt(infoParticipants.get("item0").toString());
                        int item1 = Integer.parseInt(infoParticipants.get("item1").toString());
                        int item2 = Integer.parseInt(infoParticipants.get("item2").toString());
                        int item3 = Integer.parseInt(infoParticipants.get("item3").toString());
                        int item4 = Integer.parseInt(infoParticipants.get("item4").toString());
                        int item5 = Integer.parseInt(infoParticipants.get("item5").toString());
                        int item6 = Integer.parseInt(infoParticipants.get("item6").toString());
                        String teamPosition = infoParticipants.get("teamPosition").toString();
                        int summoner1Id = Integer.parseInt(infoParticipants.get("summoner1Id").toString());
                        int summoner2Id = Integer.parseInt(infoParticipants.get("summoner2Id").toString());
                        boolean win = Boolean.parseBoolean(infoParticipants.get("win").toString());
                        LocalDateTime updatedTime = LocalDateTime.now();


                        MatchesUsers buildMatchesUsers = MatchesUsers.builder()
                                .matches(matches.get())
                                .riotUser(summoner.get())
                                .assists(assists)
                                .champLevel(champLevel)
                                .championId(championId)
                                .championName(championName)
                                .deaths(deaths)
                                .totalDamagesDealtToChampions(totalDamagesDealtToChampions)
                                .detectorWardsPlaced(detectorWardsPlaced)
                                .visionScore(visionScore)
                                .totalDamageTaken(totalDamageTaken)
                                .totalHeal(totalHeal)
                                .totalMinionsKilled(totalMinionsKilled)
                                .visionWardsBoughtInGames(visionWardsBoughtInGames)
                                .kills(kills)
                                .individualPosition(individualPosition)
                                .item0(item0)
                                .item1(item1)
                                .item2(item2)
                                .item3(item3)
                                .item4(item4)
                                .item5(item5)
                                .item6(item6)
                                .teamPosition(teamPosition)
                                .summoner1Id(summoner1Id)
                                .summoner2Id(summoner2Id)
                                .win(win)
                                .updatedTime(updatedTime)
                                .build();
                        matchesUsersRepository.save(buildMatchesUsers);
                    }
                }

            }

        }
    }

//    @Override
//


}
