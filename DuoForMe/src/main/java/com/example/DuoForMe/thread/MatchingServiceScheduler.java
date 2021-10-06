package com.example.DuoForMe.thread;

import com.example.DuoForMe.dto.ChatRequest;
import com.example.DuoForMe.entity.*;
import com.example.DuoForMe.repository.*;
import com.example.DuoForMe.service.MatchingUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Stack;

@RequiredArgsConstructor
@Service
public class MatchingServiceScheduler {
    private final MatchingUserRepository matchingUserRepository;
    private final SimpMessageSendingOperations simpMessagingTemplate;
    private final MatchingUserService matchingUserService;
    private final RiotUserRepository riotUserRepository;
    private final RiotUserTierRepository riotUserTierRepository;
    private final BlacklistRepository blacklistRepository;
    private final MatchingUserDetailRepository matchingUserDetailRepository;
    private final GoldWinRateRepository goldWinRateRepository;

    @Scheduled(fixedDelay = 10000)
    public void matchingInBackground() {
        System.out.println("매칭 시작");

//        System.out.println(goldWinRateRepository.findByChampA("Jhin"));
        // 현재 매칭중인 유저 모두 찾기
        Stack<MatchingUser> stack = matchingUserRepository.findAll();
        outerloop:
        while (stack.size() >= 2) {
            MatchingUser user_a = stack.pop();
            List<Blacklist> blacklist = blacklistRepository.findByOwnerUser(user_a.getUser());
            List<MatchingUserDetail> matchingUserDetailListA = matchingUserDetailRepository.findAllByMatchingUser(user_a);

            // 대기열에 있는 모든 듀오 상대 조회
            for (MatchingUser user_b : stack) {

                // 듀오 상대의 모스트 챔피언
                List<MatchingUserDetail> matchingUserDetailListB = matchingUserDetailRepository.findAllByMatchingUser(user_b);

                //0. 블랙리스트 제외
                if (!blacklist.contains(user_b.getUser())) {

                    //1. 티어(gold - gold) (silver-silver) (bronze-bronze)
                    if (user_a.getTier() == user_b.getTier()) {

                        // 2. 포지션
                        if (user_a.getDuoPosition() == user_b.getMyPosition()) {

                            //3. 내가 가장 많이 플레이한 챔피언과 조합이 좋은 (챔피언을 가장 많이한 유저) or (해당 챔피언 승률이 좋은 유저)를 추천하는
                            for (MatchingUserDetail matchingUserDetail_a : matchingUserDetailListA) {
                                String mostChampA = matchingUserDetail_a.getChampionName(); // 내가 많이 한 챔피언
                                List<String> goodChampA = goldWinRateRepository.findBestChampAbyChampName(mostChampA); // 내가 많이 한 챔피언이랑 조합이 좋은 챔피언 리스트
                                List<String> goodChampB = goldWinRateRepository.findBestChampBbyChampName(mostChampA); // 내가 많이 한 챔피언이랑 조합이 좋은 챔피언 리스트

                                // 상대방이 많이 한 챔피언이 위에서 뽑은 조합이 좋은 챔피언에 있으면 return
                                for (MatchingUserDetail matchingUserDetail_b : matchingUserDetailListB) {
                                    if (goodChampA.contains(matchingUserDetail_b.getChampionName())) {
                                        sendMatchingMessage(user_a, user_b);
                                        stack.remove(user_b);
                                        break outerloop;
                                    } else if (goodChampB.contains(matchingUserDetail_b.getChampionName())) {
                                        sendMatchingMessage(user_a, user_b);
                                        stack.remove(user_b);
                                        break outerloop;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (stack.size() == 0) {
                break;
            }
            for (MatchingUser user_b : stack) {
                // 듀오 상대의 모스트 챔피언
                List<MatchingUserDetail> matchingUserDetailListB = matchingUserDetailRepository.findAllByMatchingUser(user_b);
                //0. 블랙리스트 제외
                if (!blacklist.contains(user_b.getUser())) {

                    //1. 티어(gold - gold) (silver-silver) (bronze-bronze)
                    if (user_a.getTier() == user_b.getTier()) {

                        // 2. 포지션
                        if (user_a.getDuoPosition() == user_b.getMyPosition()) {
                            sendMatchingMessage(user_a, user_b);
                            stack.remove(user_b);
                            break;
                        }
                        sendMatchingMessage(user_a, user_b);
                        stack.remove(user_b);
                        break;
                    }
                    sendMatchingMessage(user_a, user_b);
                    stack.remove(user_b);
                    break;
                }
                sendMatchingMessage(user_a, user_b);
                stack.remove(user_b);
                break;
            }
        }
    }

    public void sendMatchingMessage(MatchingUser user1, MatchingUser user2) {

        //User1에게 보낼 메세지
        ChatRequest request1 = new ChatRequest();
        request1.setSender(user2.getUser().getLolNickname());
        request1.setSenderId(user2.getUserId());
        request1.setReceiver(user1.getUser().getLolNickname());
        request1.setReceiverId(user1.getUserId());
        request1.setStartMatching(true);
        request1.setMessage(user2.getUser().getLolNickname() + "님과 매칭 되어 수락 대기중입니다...");

        //User2에게 보낼 메세지
        ChatRequest request2 = new ChatRequest();
        request2.setSender(user1.getUser().getLolNickname());
        request2.setSenderId(user1.getUserId());
        request2.setReceiver(user2.getUser().getLolNickname());
        request2.setReceiverId(user2.getUserId());
        request2.setStartMatching(true);
        request2.setMessage(user1.getUser().getLolNickname() + "님과 매칭 되어 수락 대기중입니다...");

        // 유저1 에게 메세지 보내기
        simpMessagingTemplate.convertAndSend("/sub/" + user1.getUserId(), request1);
        // 유저2 에게 메세지 보내기
        simpMessagingTemplate.convertAndSend("/sub/" + user2.getUserId(), request2);

        // 대기열에서 빼기
        matchingUserService.deleteMatchingUser(user1);
        matchingUserService.deleteMatchingUser(user2);
    }
}

