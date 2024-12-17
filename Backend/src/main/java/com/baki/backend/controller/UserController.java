package com.baki.backend.controller;

import com.baki.backend.dto.LoginRequest;
import com.baki.backend.dto.ProfileDTO;
import com.baki.backend.dto.RegisterRequest;
import com.baki.backend.dto.UserDTO;
import com.baki.backend.model.User;
import com.baki.backend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173/baki-admin/", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) throws MessagingException {
        User newUser = userService.register(request);
        return ResponseEntity.ok(newUser);
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest request) {
        User loggedInUser = userService.login(request);
        return ResponseEntity.ok(loggedInUser);
    }

    // Get All Users
    @GetMapping("/activeUsers")
    public ResponseEntity<List<User>> getAllActiveUsers() {
        List<User> users = userService.getAllActiveUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/disableUsers")
    public ResponseEntity<List<User>> getAllDisableUsers() {
        List<User> users = userService.getAllDisableUsers();
        return ResponseEntity.ok(users);
    }
    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Update User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // Get User Profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(HttpSession httpSession) {
        Long userId = (Long) httpSession.getAttribute("userId");

        User updatedUser = userService.getUserById(userId);
        return ResponseEntity.ok(updatedUser);
    }

    // Update User Profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(HttpSession httpSession, @RequestBody ProfileDTO profileDTO) {
        Long userId = (Long) httpSession.getAttribute("userId");

        User updatedUser = userService.updateProfile(userId, profileDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/upload")
    public ResponseEntity<Map> upload(HttpSession session, @RequestPart("file") MultipartFile file) {
        try {
            Long id = Long.parseLong(session.getAttribute("userId").toString());
            return userService.uploadAvatar(id, file);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @CrossOrigin(origins = "http://localhost:5173/baki-admin/", allowCredentials = "true")
    @PutMapping("/enable/{id}")
    public ResponseEntity<Map> enableUser(@PathVariable Long id) {

        return userService.enabledUser(id);
    }

    @CrossOrigin(origins = "http://localhost:5173/baki-admin/", allowCredentials = "true")
    @PutMapping("/disable/{id}")
    public ResponseEntity<Map> disableUser(@PathVariable Long id) {

        return userService.disableUser(id);
    }
}