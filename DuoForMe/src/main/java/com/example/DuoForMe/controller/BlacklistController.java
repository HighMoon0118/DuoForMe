package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.BlacklistRequest;
import com.example.DuoForMe.entity.User;
import com.example.DuoForMe.service.BlacklistService;
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
@CrossOrigin("https://duofor.me/")
@RequiredArgsConstructor
@RequestMapping("/api/blacklist")
@RestController
public class BlacklistController {
    private final MatchingUserService matchingUserService;
    private final MatchingHistoryService matchingHistoryService;
    private final BlacklistService blacklistService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER')")
    public User createBlacklist(@Valid @RequestBody BlacklistRequest blacklistRequest) {
        System.out.println("어디??");
        User blackUser = blacklistService.createBlacklist(blacklistRequest);
        return blackUser;
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Void> deleteBlacklist(@Valid @RequestBody BlacklistRequest blacklistRequest) {
        blacklistService.deleteBlacklist(blacklistRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER')")
    public List getBlacklist() {
        System.out.println("oooooooooooooooooooooooo");
        return blacklistService.findByUser();
    }
}
