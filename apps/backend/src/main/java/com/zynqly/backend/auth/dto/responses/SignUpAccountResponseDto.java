package com.zynqly.backend.auth.dto.responses;

import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Lightweight projection of a newly created user.
 *
 * Kept separate from the sign-up request DTO so the response never leaks the
 * (hashed) password back to the client. The current sign-up endpoint replies
 * with an {@link AuthResponseDto} instead, but this DTO is retained for use
 * cases such as admin-side account creation.
 */
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
