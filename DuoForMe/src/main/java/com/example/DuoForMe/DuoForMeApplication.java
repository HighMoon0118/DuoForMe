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


	public static void main(String[] args) {

		SpringApplication.run(DuoForMeApplication.class, args);

//		MatchingThread matchingThread = new MatchingThread();
//		matchingThread.start();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}
}