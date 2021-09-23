package com.example.DuoForMe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 토큰 정보를 response할 dto
@AllArgsConstructor
@Getter
public class TokenResponse {
    private String token;
    private String tokenType = "Bearer";

    public TokenResponse(String token) {

        this.token = token;
    }
}
