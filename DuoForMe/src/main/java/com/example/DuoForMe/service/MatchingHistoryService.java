package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.MatchingHistoryIdDTO;
import com.example.DuoForMe.dto.MatchingHistoryRequest;
import com.example.DuoForMe.dto.UserCreateRequest;
import com.example.DuoForMe.dto.UserUpdateCreditRequest;
import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.repository.MatchingHistoryRepository;
import com.example.DuoForMe.repository.UserRepository;
import com.example.DuoForMe.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MatchingHistoryService {
    private final MatchingHistoryRepository matchingHistoryRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<MatchingHistory> findByUser() {
        User loginUser = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new EntityNotFoundException("해당 아이디가 존재하지 않습니다."));

        return matchingHistoryRepository.findByOwnerUser(loginUser);
    }

    public User createHistory(MatchingHistoryRequest request){
        User ownerUser = userRepository.findByUserId(request.getOwnerUserId())
                .orElseThrow(() -> new EntityNotFoundException("매치 유저 정보가 존재하지 않습니다."));

        User matchedUser = userRepository.findByUserId(request.getMatchedUserId())
                .orElseThrow(() -> new EntityNotFoundException("매치 유저 정보가 존재하지 않습니다."));

        MatchingHistory matchingHistory = request.toEntity(ownerUser, matchedUser);
        MatchingHistory saved = matchingHistoryRepository.save(matchingHistory);

        return saved.getMatchedUser();
    }




    public void deleteHistory(MatchingHistoryIdDTO matchingHistoryDelete) {
        MatchingHistory matchingHistory = matchingHistoryRepository.findByMatchinghistoryId(matchingHistoryDelete.getHistoryId());
        matchingHistoryRepository.delete(matchingHistory);
    }


    public void updateMatchingCredit(Long historyId, UserUpdateCreditRequest request) {
        MatchingHistory matchingHistory = matchingHistoryRepository.findByMatchinghistoryId(historyId);
        if (matchingHistory.getCredit() != null) {
            throw new EntityExistsException("이미 평가 완료된 매칭입니다.");
        }
        matchingHistoryRepository.updateCredit(request.getCredit(), historyId);
        userService.updateCreditById(matchingHistory.getMatchedUser().getUserId(), request);

    }

}
