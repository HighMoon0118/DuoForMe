package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.*;
import com.example.DuoForMe.entity.NicknameCount;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.repository.NicknameCountRepository;
import com.example.DuoForMe.repository.UserRepository;
import com.example.DuoForMe.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.security.AccessControlException;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final NicknameCountRepository nicknameCountRepository;
    private static final String NO_USER_EXCEPTION_MESSAGE = "해당되는 User가 없습니다.";
    private final PasswordEncoder passwordEncoder;

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

    public void updateNicknameById(Long id, NicknameUpdateRequest request) {
        User user = userRepository.findByUserId(id)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));

        // 기존 닉네임 찾고 -1
        String oldNickname = user.getLolNickname();

        NicknameCount nicknameCount = nicknameCountRepository.findById(oldNickname)
                .orElseThrow(() -> new EntityNotFoundException("해당 되는 롤 닉네임이 없습니다."));
        int minusCount = nicknameCount.getCount() - 1;
        nicknameCountRepository.updateCount(oldNickname, minusCount);


        // 바꾼 닉네임 존재하는지 찾고 + 1
        String newNickname = request.getLolNickname();
        System.out.println(newNickname);
        boolean lolNickExists = nicknameCountRepository.existsByLolNickname(newNickname);
        int newCount;
        if (lolNickExists) {
            NicknameCount newNicknameCount = nicknameCountRepository.findById(newNickname)
                    .orElseThrow(() -> new EntityNotFoundException("해당 되는 롤 닉네임이 없습니다."));
            newCount = newNicknameCount.getCount() + 1;
            nicknameCountRepository.updateCount(newNickname, newCount);
        }
        else {
            NicknameCount newNicknameCount = LolNicknameCountCreateRequest.toEntity(newNickname);
            nicknameCountRepository.save(newNicknameCount);
        }

        userRepository.updateNickname(newNickname, user.getUserId());
    }

    public void updatePasswordById(Long id, UserUpdateRequest request) {

        // 현재 로그인한 유저 찾기
        UserResponse userResponse = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .map(UserResponse::of)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));
        Long loginUserId = userResponse.getUserId();

        // 현재 로그인한 유저와 다르면 권한 없음
        if (!loginUserId.equals(id)) {
            throw new AccessControlException("해당 유저에 대한 정보 수정 권한이 없습니다.");
        }

        // 전달받은 id로 로그인한 유저 찾기
        User loginUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_EXCEPTION_MESSAGE));

        Optional<String> optPassword = Optional.ofNullable(request.getPassword());
        String password = optPassword.isEmpty() ? loginUser.getPassword() :
                optPassword.filter(p -> p.equals(request.getPasswordConfirm()))
                        .map(passwordEncoder::encode)
                        .orElseThrow(() -> new AccessControlException("새롭게 입력된 비밀번호가 일치하지 않습니다."));


        User newUser = request.toEntity(loginUser, password);
        userRepository.updatePassword(password, id);
    }

}
