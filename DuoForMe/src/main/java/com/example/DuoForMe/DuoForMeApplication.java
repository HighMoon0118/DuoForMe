package com.example.DuoForMe;

import com.example.DuoForMe.repository.MatchingUserRepository;
import com.example.DuoForMe.service.MatchingUserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class DuoForMeApplication {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/*").allowedOriginPatterns("http://localhost:3000/").allowCredentials(true);
			}
		};
	}

	public static void main(String[] args) {

		SpringApplication.run(DuoForMeApplication.class, args);

	}
}