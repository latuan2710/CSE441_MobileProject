
package com.baki.backend.security;

import com.baki.backend.model.ERole;
import com.baki.backend.model.Staff;
import com.baki.backend.model.User;
import com.baki.backend.service.StaffService;
import com.baki.backend.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class CustomAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private StaffService staffService;
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        logger.debug("Processing request: {}", request.getRequestURI());

        if (session == null) {
            logger.debug("No session found");
            filterChain.doFilter(request, response);
            return;
        }

        Integer userId = (Integer) session.getAttribute("userId");
        String type = (String) session.getAttribute("type");

        if (type.equals("user")) {
            User user = userService.getUserById(userId);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    null,
                    Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
            return;
        }

        logger.debug("Session found - UserId: {}", userId);

        if (userId != null) {
            Staff staff = staffService.getUserById(userId);
            ERole role = staff.getRole();
            String username = staff.getUsername();

            // Ensure role has ROLE_ prefix
            logger.debug("Setting authentication with role: {}", role);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority(role.name())));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Authentication set in SecurityContext");
        }

        filterChain.doFilter(request, response);
    }
}
