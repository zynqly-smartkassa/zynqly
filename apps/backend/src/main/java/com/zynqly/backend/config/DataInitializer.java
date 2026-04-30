package com.zynqly.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.zynqly.backend.domain.entities.User;
import com.zynqly.backend.repositories.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner{

	private final UserRepository userRepository;
	
	public DataInitializer(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public void run(String... args) {
		if (userRepository.count() == 0) {
		User user = User.builder()
			.email("zielinski-mogger")
			.alias("low-tier")
			.build();
		
		userRepository.save(user);
		}
	}
}
