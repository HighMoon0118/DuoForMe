package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserDetailResponse {
    private Long userId;
    private String email;
    private String serviceNickname;
    private Double userCredit;
    private int evaluated;
    private String lolNickname;
    private int profileIconId;

    public UserDetailResponse(User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.serviceNickname = user.getServiceNickname();
        this.userCredit = user.getUserCredit();
        this.evaluated = user.getEvaluated();
        this.lolNickname = user.getLolNickname();
        this.profileIconId = user.getProfileIconId();
    }
}
