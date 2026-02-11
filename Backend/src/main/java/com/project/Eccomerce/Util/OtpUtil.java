package com.project.Eccomerce.Util;

import java.util.Random;

public class OtpUtil {

	public static String generateOtp() {
		int OtpLength = 6;
		
		Random random = new Random();
		
		StringBuilder otp = new StringBuilder(OtpLength);
		
		for(int i = 0; i < OtpLength; i++ ) {
			otp.append(random.nextInt(10));
		}
		
		return otp.toString();
	}
}
