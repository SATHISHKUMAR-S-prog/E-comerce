package com.project.Eccomerce.Config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class AppConfig {
	
	@Value("${frontend.url}")
	private String frontend_url;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				 .authorizeHttpRequests(auth -> auth
				            .requestMatchers("/api/**").fullyAuthenticated()
				            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				            .requestMatchers("/api/products/*/reviews").permitAll()
				            .anyRequest().permitAll())
				 .addFilterBefore(new JwtTokenValidation(), BasicAuthenticationFilter.class)
				 .csrf(csrf -> csrf.disable())
				 .cors(cors -> cors.configurationSource(corsConfigurationSource()))
				 .exceptionHandling(exception -> exception
						            .authenticationEntryPoint((req, res, ex) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage())))
				 .build();
	}
	




	private CorsConfigurationSource corsConfigurationSource() {
		return new CorsConfigurationSource() {
			
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				
				CorsConfiguration cfg = new CorsConfiguration();
				cfg.setAllowedOrigins(Collections.singletonList(frontend_url));
				cfg.setAllowedMethods(Collections.singletonList("*"));
			    cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")); // Allow HTTP methods
			    cfg.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
				cfg.setAllowCredentials(true);
//				cfg.setAllowedHeaders(Collections.singletonList("Authorization","Content-Type"));
				cfg.setMaxAge(360l);
				return cfg;
		
			}
		};
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
