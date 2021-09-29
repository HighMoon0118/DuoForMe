package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MatchingHistoryRequest {

    private Long matchedUserId;

    public MatchingHistory toEntity(User ownerUser, User matchedUser) {
        return MatchingHistory.builder()
                .ownerUser(ownerUser)
                .matchedUser(matchedUser)
                .build();
    }

}
