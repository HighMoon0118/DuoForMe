package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.HashMap;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations simpMessagingTemplate;
    public HashMap<String, Boolean> userAccept;

    @MessageMapping("/pub/{userId}")
    public void ChatSocketHandler(@DestinationVariable("userId") Long userId, ChatRequest request) {
        if (request.isExit()) {
            request.setMessage(request.getSender() + "님이 채팅방에서 퇴장했습니다");
        }
        simpMessagingTemplate.convertAndSend("/sub/" + userId, request);
    }

    @MessageMapping("/accept/{userId}") // 여기서 유저 아이디는 메세지를 보낼 대상(상대방)
    public void matchingAcceptHandler(@DestinationVariable("userId") Long userId, ChatRequest request) {
        // 해쉬맵 key: User, Value: boolean
        // ex A가 먼저 True 담아서 보냄, A:True
        // B가 서버에 응답할때 receiver 해시맵에 있는지 확인 -> 1. 없으면 바로 해ㅅ맵에 저장, 2. 있을때, 서로 True 이면
        // StartMatching이랑 StartChatting에 True를 담아서 (양쪽으로)보내면 된다.
        // 일단 해쉬 맵에서 상대방이 수락 거절을 응답을 했는지 확인
        if (userAccept.containsKey(request.getReceiver())) { // 상대방이 응답을 먼저 보내 놨을때
            if (userAccept.get(request.getReceiver()) && request.isAcceptMatching()) { // 상대방과 내가 둘다 수락이면

                // 나 자신한테 메시지 보내기
                request.setStartChatting(true);
                request.setMessage(request.getReceiver() + "님이 매칭을 수락하였습니다");
                simpMessagingTemplate.convertAndSend("/sub/" + request.getSenderId(), request);

                // 듀오 상대방한테 메세지 보내기
                ChatRequest receiverRequest = new ChatRequest();
                receiverRequest.setReceiver(request.getSender());
                receiverRequest.setReceiverId(request.getSenderId());

                receiverRequest.setSender(request.getReceiver());
                receiverRequest.setSenderId(request.getReceiverId());

                receiverRequest.setAcceptMatching(true);
                receiverRequest.setStartMatching(true);
                receiverRequest.setStartChatting(true);
                receiverRequest.setMessage(request.getSender() + "님이 매칭을 수락하였습니다.");
                simpMessagingTemplate.convertAndSend("/sub/" + userId, request);

                userAccept.remove(request.getReceiver()); // 수락 여부 해쉬맵에서 삭제

            } else { // 둘중 한명이라도 거절했을때

                // 나 자신한테 메시지 보내기
                request.setStartMatching(false);
                request.setExit(true);
                request.setMessage("매칭이 거절되었습니다");
                simpMessagingTemplate.convertAndSend("/sub/" + request.getSenderId(), request);

                // 듀오 상대방한테 메세지 보내기
                ChatRequest receiverRequest = new ChatRequest();
                receiverRequest.setStartMatching(false);
                request.setExit(true);
                receiverRequest.setMessage("매칭이 거절되었습니다.");
                simpMessagingTemplate.convertAndSend("/sub/" + userId, request);

                userAccept.remove(request.getReceiver()); // 수락 여부 해쉬맵에서 삭제
            }
        } else { // 상대방이 아직 수락 거절 응답을 안했을경우 먼저 해쉬맵에 저장
            userAccept.put(request.getSender(), request.isAcceptMatching());
        }
    }

}

