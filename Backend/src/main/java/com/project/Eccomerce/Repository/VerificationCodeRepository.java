package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.VerificationCode;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode,Long> {

	VerificationCode findByEmail(String email);
	VerificationCode findByOtp(String otp);
}
