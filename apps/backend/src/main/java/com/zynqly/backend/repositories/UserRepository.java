package com.zynqly.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zynqly.backend.domain.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {


	Optional<User> findByEmail(String email);


	Optional<User> findByPhone(String phone);


}

