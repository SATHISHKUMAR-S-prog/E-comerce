package com.project.Eccomerce.Config;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {

    private final SecretKey key = Keys.hmacShaKeyFor(JWT_Constant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        try {
            String authorities = populateAuthorities(auth.getAuthorities());

            String jwt = Jwts.builder()
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime() + 86400000)) // 1 day expiration
                    .claim("email", auth.getName())
                    .claim("authorities", authorities)
                    .signWith(key)
                    .compact();

//            System.out.println("JWT successfully generated: " + jwt);
            return jwt;
        } catch (Exception e) {
            e.printStackTrace();
//            System.out.println("Error generating JWT.");
            return null;
        }
        
        
    }


    public String getEmailFromJwtToken(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt.substring(7))
                .getBody();

        return String.valueOf(claims.get("email"));
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> roles = new HashSet<>();
        authorities.forEach(auth -> roles.add(auth.getAuthority()));
        return String.join(",", roles);
    }
}
