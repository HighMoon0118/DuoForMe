package com.example.DuoForMe.thread;

import com.example.DuoForMe.dto.ChatRequest;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.repository.MatchingUserRepository;
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

    @Scheduled(fixedDelay = 10000)
    public void matchingInBackground() {
            System.out.println("매칭 시작");
            // 현재 매칭중인 유저 모두 찾기
            Stack<MatchingUser> stack = matchingUserRepository.findAll();
//            List matchingUsers = matchingUserRepository.findAll();
            // 현재 매칭중인 유저가 2명이라면
            if (stack.size() >= 2) { // 대기열에 2명 이상있으면
                // 매칭 대기열에 있는 유저 2명 뽑기
                MatchingUser user1 = stack.pop();
                MatchingUser user2 = stack.pop();

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
            System.out.println("매칭 끝");

    }

}
