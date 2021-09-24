package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.NicknameCountResponse;
import com.example.DuoForMe.dto.UserDetailResponse;
import com.example.DuoForMe.dto.UserResponse;
import com.example.DuoForMe.dto.UserUpdateCreditRequest;
import com.example.DuoForMe.entity.NicknameCount;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.repository.NicknameCountRepository;
import com.example.DuoForMe.repository.UserRepository;
import com.example.DuoForMe.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final NicknameCountRepository nicknameCountRepository;
    private static final String NO_USER_EXCEPTION_MESSAGE = "해당되는 User가 없습니다.";

    public UserResponse getMyId() {
        return userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .map(UserResponse::of)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));
    }

    public NicknameCountResponse findByNickname(String nickname) {
        NicknameCount nicknameCount = nicknameCountRepository.findById(nickname)
                .orElseThrow(() -> new EntityNotFoundException("해당 닉네임으로 가입된 유저 없음"));

        return new NicknameCountResponse(nicknameCount.getCount());
    }

    public UserDetailResponse findByUserId(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));

        return new UserDetailResponse(user);
    }

    public boolean duplicateEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean duplicateServiceNickname(String serviceNickame) {
        return userRepository.existsByServiceNickname(serviceNickame);
    }

    public void updateCreditById(Long id, UserUpdateCreditRequest request) {
        User user = userRepository.findByUserId(id)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));
        Double oldCredit = user.getUserCredit();
        int evaluated = user.getEvaluated();
        Double newCredit;
        if (oldCredit == null) {
            newCredit = request.getCredit();
        } else {
            newCredit = (user.getEvaluated() * oldCredit + request.getCredit()) / (evaluated + 1);
        }
        userRepository.updateCredit(newCredit, user.getUserId());
        userRepository.updateEvaluated(evaluated + 1, user.getUserId());
    }

}
