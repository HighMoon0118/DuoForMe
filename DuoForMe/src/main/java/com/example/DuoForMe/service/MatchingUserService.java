package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.MatchingUserCreateRequest;
import com.example.DuoForMe.entity.*;
import com.example.DuoForMe.repository.*;
import com.example.DuoForMe.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MatchingUserService {
    private final UserRepository userRepository;
    private final MatchingUserRepository matchingUserRepository;
    private final RiotUserRepository riotUserRepository;
    private final RiotUserTierRepository riotUserTierRepository;
    private final MatchesUsersRepository matchesUsersRepository;
    private final MatchingUserDetailRepository matchingUserDetailRepository;

    public Long findDuo(MatchingUserCreateRequest request) {
        User user = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new EntityNotFoundException("해당 아이디가 존재하지 않습니다."));

        if (matchingUserRepository.existsMatchingUserByUserId(user.getUserId())) {
            throw new EntityExistsException("이미 듀오매칭 대기열에 있습니다.");
        }
        RiotUser riotUser = riotUserRepository.findByName(user.getLolNickname());
        String tier = riotUserTierRepository.findByRiotUser(riotUser).get().getTier();

        MatchingUser matchUser = request.toEntity(user, tier);
        MatchingUser matchingUser = matchingUserRepository.save(matchUser);

        System.out.println(matchingUser);



        List<String> matchUserDetail = matchesUsersRepository.findMostChampions(riotUser);
        System.out.println(matchUserDetail.getClass());
//        System.out.println(matchUserDetail.toString());
//        System.out.println(matchUserDetail.get(0).toString());
        System.out.println(matchUserDetail);
        System.out.println(matchUserDetail.get(0));
        for (int i=0; i<5; i++) {
            String[] mostChampInfo = matchUserDetail.get(i).split(",");
            String champ = mostChampInfo[0];
            int count = Integer.parseInt(mostChampInfo[1]);
            String position = mostChampInfo[2];


            MatchingUserDetail buildMatchingUserDetail = MatchingUserDetail.builder()
                    .championName(champ)
                    .count(count)
                    .position(position)
                    .matchingUser(matchingUser)
                    .build();
            matchingUserDetailRepository.save(buildMatchingUserDetail);
        }


        return matchingUser.getUserId();
    }

    public void cancelDuo() {
            User user = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                    .orElseThrow(() -> new EntityNotFoundException("해당 아이디가 존재하지 않습니다."));

            if (!matchingUserRepository.existsMatchingUserByUserId(user.getUserId())) {
                throw new EntityExistsException("듀오 매칭 대기중이 아닙니다.");
            }
            MatchingUser matchingUser = matchingUserRepository.findMatchingUserByUserId(user.getUserId());
            matchingUserRepository.delete(matchingUser);
            matchingUserDetailRepository.deleteAllByMatchingUser(matchingUser);
    }

    public List getDuoList() {
        List duoList = matchingUserRepository.findAll();
        return duoList;
    }

    public void deleteMatchingUser(MatchingUser matchingUser) {
        matchingUserRepository.delete(matchingUser);
        matchingUserDetailRepository.deleteAllByMatchingUser(matchingUser);
    }

}
