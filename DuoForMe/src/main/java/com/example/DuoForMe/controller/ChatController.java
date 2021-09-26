package com.example.DuoForMe.controller;

import com.example.DuoForMe.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/join")
    public void join(ChatMessage message) {
        System.out.println(message);
        message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}