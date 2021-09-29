package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.BlacklistRequest;
import com.example.DuoForMe.entity.Blacklist;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.repository.BlacklistRepository;
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
public class BlacklistService {
    private final BlacklistRepository blacklistRepository;
    private final UserRepository userRepository;
            
    public List<Blacklist> findByUser() {
        User loginUser = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new EntityNotFoundException("로그인된 유저가 존재하지 않습니다."));

        return blacklistRepository.findByOwnerUser(loginUser);
    }

    public User createBlacklist(BlacklistRequest request){
        User ownerUser = userRepository.findByEmail(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new EntityNotFoundException("로그인된 유저가 존재하지 않습니다."));
        
        User blackUser = userRepository.findByUserId(request.getBlackUserId())
                .orElseThrow(() -> new EntityNotFoundException("블랙리스트에 저장할 유저 정보가 존재하지 않습니다."));
        
        boolean blackExist = blacklistRepository.existsByBlackUser(blackUser);

        if (blackExist) {
            throw new EntityExistsException("이미 블랙리스트에 이미 해당 유저가 존재합니다");
        }

        Blacklist blacklist = request.toEntity(ownerUser, blackUser);
        Blacklist saved = blacklistRepository.save(blacklist);

        return saved.getBlackUser();
    }



    public void deleteBlacklist(BlacklistRequest blacklistRequest) {
        Blacklist blacklist = blacklistRepository.findByBlacklistId(blacklistRequest.getBlackUserId())
                .orElseThrow(() -> new EntityNotFoundException("해당 유저는 블랙리스트에 존재하지 않습니다."));
        blacklistRepository.delete(blacklist);
    }

}
