package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.Authority;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.User;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MatchingUserCreateRequest {

    @NotEmpty
    private String myPosition;

    @NotEmpty
    private String duoPosition;


    public MatchingUser toEntity(User user) {
        return MatchingUser.builder()
                .user(user)
                .myPosition(myPosition)
                .duoPosition(duoPosition)
                .build();
    }

}
