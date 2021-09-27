package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.NicknameCount;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NicknameCountResponse {

    private int count;

    public static NicknameCountResponse of(NicknameCount nicknameCount) {
        return new NicknameCountResponse(nicknameCount.getCount());
    }
}
