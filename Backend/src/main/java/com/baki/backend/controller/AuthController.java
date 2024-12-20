package com.baki.backend.controller;

import com.baki.backend.dto.LoginRequest;
import com.baki.backend.dto.RegisterRequest;
import com.baki.backend.model.Staff;
import com.baki.backend.model.User;
import com.baki.backend.service.StaffService;
import com.baki.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private StaffService staffService;
    @Autowired
    private UserService userService;

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request, HttpSession session) {
        try {
            Staff staff = staffService.login(request);

            // Store user info in session
            session.setAttribute("userId", staff.getId());
            session.setAttribute("type", "staff");

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("username", staff.getUsername());
            response.put("email", staff.getEmail());
            response.put("role", staff.getRole());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            session.invalidate();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity.ok(user);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            User user = userService.login(request);

            // Store user info in session
            session.setAttribute("userId", user.getId());
            session.setAttribute("type", "user");

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            session.invalidate();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok(Map.of("message", "Session is active"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Session is not active"));
        }
    }
} 
        