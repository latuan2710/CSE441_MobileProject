package com.baki.backend.config;

import com.baki.backend.security.CustomAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html").permitAll()

                        .requestMatchers(
                                "/api/users/profile",
                                "/api/users/upload",
                                "/api/service/carts/**",
                                "/api/service/orders/user/**",
                                "/api/service/orders/checkout",
                                "/api/service/orders/detail/{orderId}").authenticated()

                        .requestMatchers(HttpMethod.GET,
                                "/api/service/products/**",
                                "/api/service/brands",
                                "/api/service/categories",
                                "api/service/subcategories").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers(
                                "/api/admin/profile",
                                "/api/admin/upload",
                                "/api/users/**",
                                "/api/service/products/**",
                                "/api/service/brands/**",
                                "/api/service/categories/**",
                                "/api/service/subcategories/**",
                                "/api/service/orders/**").hasAnyAuthority("ADMIN", "STAFF")
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() {
        return new CustomAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}