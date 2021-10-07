package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.Authority;
import com.example.DuoForMe.entity.User;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
public class UserUpdateRequest {

    private String password;

    private String passwordConfirm;


    public User toEntity(User user, String password) {
        return User.builder()
                .email(user.getEmail())
                .serviceNickname(user.getServiceNickname())
                .evaluated(user.getEvaluated())
                .userCredit(user.getUserCredit())
                .profileIconId(user.getProfileIconId())
                .password(password)
                .lolNickname(user.getLolNickname())
                .authority(user.getAuthority())
                .build();
    }
}
