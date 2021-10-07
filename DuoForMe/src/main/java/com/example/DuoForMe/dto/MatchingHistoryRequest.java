package com.example.DuoForMe.dto;

import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.MatchingUser;
import com.example.DuoForMe.entity.User;
import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MatchingHistoryRequest {

    private Long ownerUserId;
    private Long matchedUserId;

    public MatchingHistory toEntity(User ownerUser, User matchedUser) {
        return MatchingHistory.builder()
                .ownerUser(ownerUser)
                .matchedUser(matchedUser)
                .build();
    }

}
