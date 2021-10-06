package com.example.DuoForMe.thread;

import com.example.DuoForMe.dto.ChatRequest;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.RiotUserTier;
import com.example.DuoForMe.repository.MatchingUserRepository;
import com.example.DuoForMe.repository.RiotUserRepository;
import com.example.DuoForMe.repository.RiotUserTierRepository;
import com.example.DuoForMe.service.MatchingUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Stack;

@RequiredArgsConstructor
@Service
public class MatchingServiceScheduler {
    private final MatchingUserRepository matchingUserRepository;
    private final SimpMessageSendingOperations simpMessagingTemplate;
    private final MatchingUserService matchingUserService;
    private final RiotUserRepository riotUserRepository;
    private final RiotUserTierRepository riotUserTierRepository;

    @Scheduled(fixedDelay = 1000)
    public void matchingInBackground() {
            System.out.println("매칭 시작");
            // 현재 매칭중인 유저 모두 찾기
            Stack<MatchingUser> stack = matchingUserRepository.findAll();
//            List matchingUsers = matchingUserRepository.findAll();
//            System.out.println(stack.get(0).getUser().getLolNickname());
//큐에 10명이 있으면

        //0. 블랙리스트 제외

//        1. 티어(gold - gold) (silver-silver) (bronze-bronze)

//        2. 포지션

//        3. 내가 가장 많이 플레이한 챔피언과 조합이 좋은 (챔피언을 가장 많이한 유저) or (해당 챔피언 승률이 좋은 유저)를 추천하는
            // 현재 매칭중인 유저가 2명이라면
            if (stack.size() >= 2) { // 대기열에 2명 이상있으면
                // 매칭 대기열에 있는 유저 2명 뽑기
                MatchingUser user1 = stack.pop();
                MatchingUser user2 = stack.pop();

                //User1에게 보낼 메세지
                ChatRequest request1 = new ChatRequest();
                request1.setSender(user1.getUser().getLolNickname());
                request1.setSenderId(user1.getUserId());
                request1.setReceiver(user2.getUser().getLolNickname());
                request1.setReceiverId(user2.getUserId());
                request1.setStartMatching(true);
                request1.setMessage(user2.getUser().getLolNickname() + "님과 매칭 되어 수락 대기중입니다...");

                //User2에게 보낼 메세지
                ChatRequest request2 = new ChatRequest();
                request2.setSender(user2.getUser().getLolNickname());
                request2.setSenderId(user2.getUserId());
                request2.setReceiver(user1.getUser().getLolNickname());
                request2.setReceiverId(user1.getUserId());
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
            System.out.println("매칭 끝");

    }

}
