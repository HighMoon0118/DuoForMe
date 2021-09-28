package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.MatchingUserCreateRequest;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.repository.MatchingUserRepository;
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
public class MatchingUserService {
    private final UserRepository userRepository;
    private final MatchingUserRepository matchingUserRepository;

    public Long findDuo(MatchingUserCreateRequest request) {
        User user = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new EntityNotFoundException("해당 아이디가 존재하지 않습니다."));

        if (matchingUserRepository.existsMatchingUserByUserId(user.getUserId())) {
            throw new EntityExistsException("이미 듀오매칭 대기열에 있습니다.");
        }

        MatchingUser matchingUser = request.toEntity(user);
        MatchingUser saved = matchingUserRepository.save(matchingUser);

        return saved.getUserId();
    }

    public void cancelDuo() {
            User user = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                    .orElseThrow(() -> new EntityNotFoundException("해당 아이디가 존재하지 않습니다."));

            if (!matchingUserRepository.existsMatchingUserByUserId(user.getUserId())) {
                throw new EntityExistsException("듀오 매칭 대기중이 아닙니다.");
            }
            MatchingUser matchingUser = matchingUserRepository.findMatchingUserByUserId(user.getUserId());
            matchingUserRepository.delete(matchingUser);
    }

    public List getDuoList() {
        List duoList = matchingUserRepository.findAll();
        return duoList;
    }
}
