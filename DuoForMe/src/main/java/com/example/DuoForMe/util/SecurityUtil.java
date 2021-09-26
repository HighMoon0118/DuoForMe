package com.example.DuoForMe.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.AccessControlException;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Slf4j
public class SecurityUtil {

    // security context의 authentication 객체를 이용해 username을 리턴해주는 간단한 유틸성 메소드드
   public static String getCurrentUserId() {
       // JwtFilter의 doFilter 메소드에서 request가 들어올때 security context에 authentication 객체를 저장해서 사용
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

       System.out.println(authentication);
       System.out.println(authentication.getName());
       System.out.println("무야");
        if (authentication == null || authentication.getName() == null) {
            throw new AccessControlException("No authentication in Security Context.");
        }
        return authentication.getName();
    }


}
