package com.example.DuoForMe.controller;

import com.example.DuoForMe.entity.MatchesUsers;
import com.example.DuoForMe.entity.RiotUser;
import com.example.DuoForMe.entity.RiotUserTier;
import com.example.DuoForMe.repository.MatchesUsersRepository;
import com.example.DuoForMe.repository.RiotUserRepository;
import com.example.DuoForMe.repository.RiotUserTierRepository;
import com.example.DuoForMe.service.RiotUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/riotuser")
public class RiotUserController {
    @Autowired
    private RiotUserService userService;
    @Autowired
    private RiotUserRepository riotUserRepository;
    @Autowired
    private MatchesUsersRepository matchesUsersRepository;
    @Autowired
    private RiotUserTierRepository riotUserTierRepository;

    // 소환사 이름으로 10개 매치데이터 해당 게임의 10명의 유저들 데이터 저장
    @GetMapping("/receivedata/{name}")
    public String search(@PathVariable String name) throws Exception {
        userService.insert(name);
        return "search";
    }

    // 소환사 이름으로 검색 시
    @GetMapping("/search/{name}")
    public ResponseEntity<List<MatchesUsers>> findAllByName(@PathVariable String name){
        Optional<RiotUser> selectedRiotUser = riotUserRepository.findById(name);
        List<MatchesUsers> findAllMatchesUsersByRiotUser = matchesUsersRepository.findAllByRiotUser(selectedRiotUser.get());
        if(findAllMatchesUsersByRiotUser != null && !findAllMatchesUsersByRiotUser.isEmpty()) {
            return new ResponseEntity<List<MatchesUsers>>(findAllMatchesUsersByRiotUser, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }

    // 소환사 이름으로 검색 시
    @GetMapping("/riotuserinfo/{name}")
    public ResponseEntity<Optional<RiotUserTier>> findRiotUserInfoByName(@PathVariable String name){
        Optional<RiotUser> selectedRiotUser = riotUserRepository.findById(name);
        Optional<RiotUserTier> findRiotUserInfoByName = riotUserTierRepository.findByRiotUser(selectedRiotUser.get());
        if(findRiotUserInfoByName != null && !findRiotUserInfoByName.isEmpty()) {
            return new ResponseEntity<Optional<RiotUserTier>>(findRiotUserInfoByName, HttpStatus.OK);
        }
        else {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }
}
