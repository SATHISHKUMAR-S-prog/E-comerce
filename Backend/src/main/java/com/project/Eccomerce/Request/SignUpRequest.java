package com.project.Eccomerce.Request;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String fullname; // Match User field
    private String otp;
}
