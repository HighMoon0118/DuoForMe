package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.ChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations simpMessagingTemplate;

    @MessageMapping("/pub/{userId}")
    public void CommentSocketHandler(@DestinationVariable("userId") Long userId, ChatRequest request) {
        simpMessagingTemplate.convertAndSend("/sub/" + userId, request);
    }
}

