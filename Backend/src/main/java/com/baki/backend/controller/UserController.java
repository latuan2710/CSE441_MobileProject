package com.baki.backend.controller;

import com.baki.backend.dto.LoginRequest;
import com.baki.backend.dto.ProfileDTO;
import com.baki.backend.dto.RegisterRequest;
import com.baki.backend.dto.UserDTO;
import com.baki.backend.model.User;
import com.baki.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestPart RegisterRequest request, @RequestPart("file") MultipartFile file) {
        User newUser = userService.register(request);

        if (file != null) {
            userService.uploadAvatar(newUser.getId(), file);
        }

        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable int id, @RequestPart UserDTO userDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
        User updatedUser = userService.updateUser(id, userDTO, file);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");

        User updatedUser = userService.getUserById(userId);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(HttpSession httpSession, @RequestBody ProfileDTO profileDTO) {
        int userId = (int) httpSession.getAttribute("userId");

        User updatedUser = userService.updateProfile(userId, profileDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/upload")
    public ResponseEntity<Map> upload(HttpSession session, @RequestPart("file") MultipartFile file) {
        try {
            int id = Integer.parseInt(session.getAttribute("userId").toString());
            return userService.uploadAvatar(id, file);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/enable/{id}")
    public ResponseEntity<Map> enableUser(@PathVariable int id) {

        return userService.enabledUser(id);
    }

    @PutMapping("/disable/{id}")
    public ResponseEntity<Map> disableUser(@PathVariable int id) {

        return userService.disableUser(id);
    }
}