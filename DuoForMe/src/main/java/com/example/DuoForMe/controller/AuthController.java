package com.example.DuoForMe.controller;

import com.example.DuoForMe.dto.LoginRequest;
import com.example.DuoForMe.dto.TokenResponse;
import com.example.DuoForMe.dto.UserCreateRequest;
import com.example.DuoForMe.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@CrossOrigin("http://localhost:3000/")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        Long id = authService.signup(userCreateRequest);
        log.info(Long.toString(id));
        System.out.println(ResponseEntity.status(HttpStatus.CREATED).build());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authorize(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authorize(loginRequest));
    }
}
