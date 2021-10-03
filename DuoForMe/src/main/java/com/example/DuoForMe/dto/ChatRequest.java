package com.example.DuoForMe.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    private String receiver; // 메세지 받는 유저(듀오 상대)
    private Long receiverId; // 듀오 상대의 고유 유저 id

    private String sender; // 메세지 보낸 유저(나 자신)
    private Long senderId; // 나 자신의 고유 id

    private String message; // 메세지 내용

    private boolean startMatching; // 매칭이 잡혔을때 True
    private boolean acceptMatching; // 클라이언트에서 수락했는지 안했는지 (채팅의 연결상태)
    private boolean startChatting; // 서로 수락하면 True로 바꾸고 채팅 시작
    private boolean exit; // 채팅방 나가기

    // 1. A와 B를 찾음
//    2. A,B startMatching에 True를 담아서 보내고


//    3. client에서 스타트 매칭이 트루이면 acceptMatching true(수락) false(거절) 을 담아서 서버에보내고,
//    컨트롤러에서 해쉬맵을 만든다.

//    4. 서버에서 acceptMatching 이 트루이면 자바 해쉬맵2에 key: A유저id, value:True, key: B유저, value:boolean
//해쉬맵 2. 수락 거절 여부
//    5. A와 B가 모두 해쉬맵에 있고 && 둘다 True 이면
//    6. startChating에 True를 넣어서 각 유저한테 보내준다(채팅 가능해짐)

//    7. 채팅방 나가기는 exit True룰 담아서 서버에 보내주면, 서버에서 duo한테 exit를 True를 담아서 보낸다.
}
