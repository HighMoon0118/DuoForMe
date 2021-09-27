package com.example.DuoForMe.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class NicknameUpdateRequest {
    @NotNull
    private String lolNickname;

}
