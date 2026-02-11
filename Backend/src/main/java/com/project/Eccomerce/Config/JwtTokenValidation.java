package com.project.Eccomerce.Config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidation extends OncePerRequestFilter {

	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String jwt = request.getHeader("Authorization"); // avoiding any spell mistake we create a class "jwt constant"
		
		if(jwt != null) {
			jwt = jwt.substring(7); //the jwt token starts from 7th place because of in front of jwt token there was a key is there (barer)
			
			try {
			    // Use a secret key to validate and parse the JWT
                SecretKey key = Keys.hmacShaKeyFor(JWT_Constant.SECRET_KEY.getBytes());

                // Parse the JWT to extract its claims
                Claims claims = Jwts.parserBuilder()
                                    .setSigningKey(key) // Set the signing key to verify the JWT signature
                                    .build()            // Build the parser
                                    .parseClaimsJws(jwt) // Parse the JWT
                                    .getBody();         // Get the claims (payload) from the JWT

                // Extract the email (or username) from the claims
                String email = String.valueOf(claims.get("email"));

                // Extract authorities (roles/permissions) as a string from the claims
                String authorities = String.valueOf(claims.get("authorities"));

                // Convert the authorities string (comma-separated roles) into a list of GrantedAuthority objects
                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                // Create an Authentication object to represent the authenticated user
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

                // Set the authentication object in the SecurityContext, making the user authenticated
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
			}catch (Exception e) {
				throw new BadCredentialsException("jwt token invaild...");
			}
			
		}
		
		filterChain.doFilter(request, response);
	}


}
