package com.zynqly.backend.auth.domain.dto;

import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpAccountResponseDto {

	private String name;
	private String email;
	private String phone;
	private Role role;

}
