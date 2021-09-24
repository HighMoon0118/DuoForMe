package com.example.DuoForMe.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class UserUpdateCreditRequest {
    @NotNull
    private double credit;


}
