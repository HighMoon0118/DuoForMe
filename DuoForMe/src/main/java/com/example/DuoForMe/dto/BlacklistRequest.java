package com.example.DuoForMe.dto;


import com.example.DuoForMe.entity.Blacklist;
import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BlacklistRequest {

    private Long blackUserId;

    public Blacklist toEntity(User ownerUser, User blackUser) {
        return Blacklist.builder()
                .ownerUser(ownerUser)
                .blackUser(blackUser)
                .build();
    }
}
