package com.zynqly.backend.domain.dtos.responses;

import com.zynqly.backend.domain.dtos.requests.SignUpAccountRequestDto.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpAccountResponse {

	private String name;
	private String email;
	private String phone;
	private Role role;

}
