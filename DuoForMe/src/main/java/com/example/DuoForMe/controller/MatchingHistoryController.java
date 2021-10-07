package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.MatchingHistoryIdDTO;
import com.example.DuoForMe.dto.MatchingHistoryRequest;
import com.example.DuoForMe.dto.SimpleSuccessResponse;
import com.example.DuoForMe.dto.UserUpdateCreditRequest;
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
@CrossOrigin("http://localhost:3000/")
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
    public ResponseEntity<Void> delete(@Valid @RequestBody MatchingHistoryIdDTO matchingHistoryDelete) {
        matchingHistoryService.deleteHistory(matchingHistoryDelete);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER')")
    public List getHistory() {
        return matchingHistoryService.findByUser();
    }


    @PutMapping("/credit/{hitoryId}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<SimpleSuccessResponse> updateById(@PathVariable Long hitoryId,
                                                            @RequestBody @Valid UserUpdateCreditRequest request) {
        matchingHistoryService.updateMatchingCredit(hitoryId, request);

        SimpleSuccessResponse response = new SimpleSuccessResponse("User Credit, MatchingHistory 정보 수정 성공");
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }
}
