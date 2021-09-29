package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.MatchingHistoryDelete;
import com.example.DuoForMe.dto.MatchingHistoryRequest;
import com.example.DuoForMe.dto.MatchingUserCreateRequest;
import com.example.DuoForMe.entity.MatchingHistory;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.service.MatchingHistoryService;
import com.example.DuoForMe.service.MatchingUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/matchinghistory")
@RestController
public class MatchingHistoryController {
    private final MatchingUserService matchingUserService;
    private final MatchingHistoryService matchingHistoryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER')")
    public User create(@Valid @RequestBody MatchingHistoryRequest matchingHistoryRequest) {
        User mathchedUser = matchingHistoryService.createHistory(matchingHistoryRequest);
        System.out.println(ResponseEntity.status(HttpStatus.CREATED).build());
        return mathchedUser;
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Void> delete(@Valid @RequestBody MatchingHistoryDelete matchingHistoryDelete) {
        matchingHistoryService.deleteHistory(matchingHistoryDelete);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER')")
    public List getHistory() {
        return matchingHistoryService.findByUser();
    }
}
