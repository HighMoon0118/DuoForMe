package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserResponse {

    private Long userId;

    public static UserResponse of(User user) {
        return new UserResponse(user.getUserId());
    }
}