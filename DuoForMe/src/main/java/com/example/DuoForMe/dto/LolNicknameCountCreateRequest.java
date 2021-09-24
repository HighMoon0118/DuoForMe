package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.Authority;
import com.example.DuoForMe.entity.NicknameCount;
import com.example.DuoForMe.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor()
@NoArgsConstructor
public class LolNicknameCountCreateRequest {
    @NotBlank
    private String lolNickname;

    public static NicknameCount toEntity(String lolNickname) {
        return NicknameCount.builder()
                .lolNickname(lolNickname)
                .count(1)
                .build();
    }
}
