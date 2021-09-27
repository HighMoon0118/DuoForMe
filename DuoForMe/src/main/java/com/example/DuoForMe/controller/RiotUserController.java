package com.example.DuoForMe.controller;

import com.example.DuoForMe.repository.RiotUserRepository;
import com.example.DuoForMe.service.RiotUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/riotuser")
public class RiotUserController {
    @Autowired
    private RiotUserService userService;
    @Autowired
    private RiotUserRepository riotUserRepository;


    @GetMapping("/search/{name}")
//    public String search(@RequestParam(value = "name") String name, Model model) throws Exception {
    public String search(@PathVariable String name) throws Exception {
//        logger.debug("검색된 소환사 닉네임 : " + name);

        userService.insert(name);

//        SummonerDTO summonerDTO = userService.read(name);
//
//        List<MatchDTO> matchList;
//        List<MatchDTO> matchDTOList;
//
//        matchList = userService.setNames(summonerDTO);
//        matchDTOList = userService.setTotalValue(matchList);
//
//        List<MostChampion> mostChampionList = userService.getMostChampion(matchDTOList, summonerDTO.getId());
//        Collections.sort(mostChampionList, new CompMostChampion());
//
//        List<ChampionDTO> championList = userService.getChampionList();
//        Collections.sort(championList, new CompChampion());
//
//        model.addAttribute("summoner", summonerDTO);
//        model.addAttribute("summonerName", name);
//        model.addAttribute("matchList", matchList);
//        model.addAttribute("mostList", mostChampionList);
//        model.addAttribute("championList", championList);


        return "search";
    }
//    @GetMapping("/{name}/puuid")
//    public ResponseEntity<List<MatchesUsers>> findAllByName(@PathVariable String name){
//        Optional<RiotUser> selectedRiotUser = riotUserRepository.findByLolNickname(name);
//        List<MatchesUsers> list = MatchesUsersRepository.findAllByRiotUser(selectedRiotUser);
//        if(list != null && !list.isEmpty()) {
//            return new ResponseEntity<List<MatchesUsers>>(list, HttpStatus.OK);
//        }
//        else {
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
//        }
//    }
}
