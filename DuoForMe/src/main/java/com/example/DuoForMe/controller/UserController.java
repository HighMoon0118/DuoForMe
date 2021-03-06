package com.example.DuoForMe.controller;


import com.example.DuoForMe.dto.*;
import com.example.DuoForMe.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@CrossOrigin("https://duofor.me/")
@RequiredArgsConstructor
@RequestMapping("api/users")
@RestController
public class UserController {
    private final UserService service;

    @GetMapping("/me")
    public ResponseEntity<UserDetailResponse> getMyMemberInfo() {
        System.out.println();
        UserDetailResponse response = service.findByUserId(service.getMyId().getUserId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailResponse> findById(@PathVariable Long id) {
        UserDetailResponse response = service.findByUserId(id);
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email")
    public ResponseEntity<SimpleSuccessResponse> duplicateId(@RequestParam String email) {
        boolean duplicated = service.duplicateEmail(email);
        SimpleSuccessResponse response;
        if (duplicated) {
            response = new SimpleSuccessResponse("Email 중복됨");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        response = new SimpleSuccessResponse("Email 중복되지 않음");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/serviceNickname")
    public ResponseEntity<SimpleSuccessResponse> duplicateName(@RequestParam String serviceNickname) {
        boolean duplicated = service.duplicateServiceNickname(serviceNickname);
        SimpleSuccessResponse response;
        if (duplicated) {
            response = new SimpleSuccessResponse("닉네임 중복됨");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        response = new SimpleSuccessResponse("닉네임 중복되지 않음");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/credit/{id}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<SimpleSuccessResponse> updateById(@PathVariable Long id,
                                                            @RequestBody @Valid UserUpdateCreditRequest request) {
        service.updateCreditById(id, request);

        SimpleSuccessResponse response = new SimpleSuccessResponse("User Credit 정보 수정 성공");
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/lolnickname/{id}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<SimpleSuccessResponse> updateNicknameById(@PathVariable Long id,
                                                            @RequestBody @Valid NicknameUpdateRequest request) {
        service.updateNicknameById(id, request);

        SimpleSuccessResponse response = new SimpleSuccessResponse("User LolNickname 정보 수정 성공");
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/password/{id}")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<SimpleSuccessResponse> updateNicknameById(@PathVariable Long id,
                                                            @RequestBody @Valid UserUpdateRequest request) {

        service.updatePasswordById(id, request);
        SimpleSuccessResponse response = new SimpleSuccessResponse("User Password 수정 성공");
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/nicknamecount/{nickname}")
    public ResponseEntity<NicknameCountResponse> findByNickname(@PathVariable String nickname) {
        NicknameCountResponse response = service.findByNickname(nickname);
        log.info(response.toString());
        return ResponseEntity.ok(response);
    }
}
