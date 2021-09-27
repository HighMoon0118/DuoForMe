//package com.example.DuoForMe.service;
//
//import com.example.DuoForMe.entity.ChatMessage;
//import com.example.DuoForMe.repository.ChatMessageRepository;
//import org.springframework.data.domain.Sort;
//
//import javax.transaction.Transactional;
//import java.util.List;
//
//public class ChatMessageService {
//    private final ChatMessageRepository chatMessageRepository;
//
//    @Transactional
//    public void saveAlarm(chatMessageRepository requestDto) {
//        ChatMessage alarm = new ChatMessage();
//        alarm = alarm.saveAlarm(requestDto);
//        chatMessageRepository.save(alarm);
//    }
//
//    @Transactional
//    public List<ChatMessage> findAllAlarm(Long userId) {
//        return ChatMessageRepository.findAllByUserId(userId, Sort.by(Sort.Direction.DESC, "createdDate"));
//    }
//}
