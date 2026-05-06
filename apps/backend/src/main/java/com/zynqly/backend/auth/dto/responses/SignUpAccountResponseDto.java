package com.zynqly.backend.auth.dto.responses;

import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto.Role;

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
