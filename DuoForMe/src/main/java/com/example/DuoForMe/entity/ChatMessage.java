package com.example.DuoForMe.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessage {

    private String receiver;
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
}
