package com.example.DuoForMe.service;

import com.example.DuoForMe.dto.LoginRequest;
import com.example.DuoForMe.dto.LolNicknameCountCreateRequest;
import com.example.DuoForMe.dto.TokenResponse;
import com.example.DuoForMe.dto.UserCreateRequest;
import com.example.DuoForMe.entity.NicknameCount;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.jwt.TokenProvider;
import com.example.DuoForMe.repository.NicknameCountRepository;
import com.example.DuoForMe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Transactional
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final NicknameCountRepository nicknameCountRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    public Long signup(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EntityExistsException("이미 존재하는 Email입니다.");
        }
        if (userRepository.existsByServiceNickname(request.getServiceNickname())) {
            throw new EntityExistsException("이미 존재하는 닉네임입니다");
        }
        User user = request.toEntity(passwordEncoder);
        User saved = userRepository.save(user);

        String lolNickname = request.getLolNickname();
        boolean lolNickExists = nicknameCountRepository.existsByLolNickname(lolNickname);
        int newCount;

        if (lolNickExists) {
            NicknameCount nicknameCount = nicknameCountRepository.findById(lolNickname)
                    .orElseThrow(() -> new EntityNotFoundException("해당 되는 롤 닉네임이 없습니다."));
            newCount = nicknameCount.getCount() + 1;
            nicknameCountRepository.updateCount(lolNickname, newCount);
        }
        else {
//            LolNicknameCountCreateRequest countCreateRequest;
            NicknameCount nicknameCount = LolNicknameCountCreateRequest.toEntity(lolNickname);
            nicknameCountRepository.save(nicknameCount);
        }
        return saved.getUserId();
    }

    public TokenResponse authorize(LoginRequest loginRequest) {
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new TokenResponse(tokenProvider.createToken(authentication));
    }
}
