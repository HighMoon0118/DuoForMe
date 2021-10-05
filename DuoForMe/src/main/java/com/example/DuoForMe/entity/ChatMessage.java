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
    private String receiver; // 메시지 받는 사람
    private Long receiverId; // 듀오 상대의 고유 유저 id
    private String sender; // 메시지 보낸사람
    private Long senderId; // 나 자신의 고유 id
    private String message; // 내용

    private boolean startMatching; // 매칭이 잡혔을때 True
    private boolean acceptMatching; // 클라이언트에서 수락했는지 안했는지 (채팅의 연결상태)
    private boolean startChating; // 서로 수락하면 True로 바꾸고 채팅 시작
    private boolean exit; // 채팅방 나가기
}
