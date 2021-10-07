package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.MatchingUserCreateRequest;
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
@RequestMapping("/api/matching")
@RestController
public class MatchingUserController {

    private final MatchingUserService matchingUserService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Void> create(@Valid @RequestBody MatchingUserCreateRequest matchingUserCreateRequest) {
        Long id = matchingUserService.findDuo(matchingUserCreateRequest);
        log.info(Long.toString(id));
        System.out.println(ResponseEntity.status(HttpStatus.CREATED).build());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Void> delete() {
        matchingUserService.cancelDuo();
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @ResponseBody
    public List getDuoList() {
        return matchingUserService.getDuoList();
    }

}
