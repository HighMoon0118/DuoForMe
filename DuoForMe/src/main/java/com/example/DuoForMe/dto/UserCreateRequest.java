package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.Authority;
import com.example.DuoForMe.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

// 회원가입시 사용할 dto
@Getter
@AllArgsConstructor()
@NoArgsConstructor
public class UserCreateRequest {
    @NotEmpty
    @Size(max = 50)
    private String email;

    @NotEmpty
    @Size(max = 20)
    private String serviceNickname;

    @NotEmpty
    @Size(max = 20)
    private String password;

    private String lolNickname;

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .serviceNickname(serviceNickname)
                .password(passwordEncoder.encode(password))
//                .nicknameCount.(lolNickname)
                .authority(Authority.ROLE_USER)
                .build();
    }
}
