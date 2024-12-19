package com.baki.backend.service;

import com.baki.backend.dto.*;
import com.baki.backend.model.User;
import com.baki.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CloudinaryService cloudinaryService;
    private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
            "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public User register(RegisterRequest request) {
        // Validate email format
        if (!Pattern.compile(EMAIL_PATTERN).matcher(request.getEmail()).matches()) {
            throw new RuntimeException("Invalid email format");
        }
        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setStatus(true);

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        if (request.getUsernameOrEmail() == null || request.getUsernameOrEmail().trim().isEmpty()) {
            throw new RuntimeException("Username/Email cannot be empty");
        }

        String usernameOrEmail = request.getUsernameOrEmail().trim();
        log.info("Attempting login with: {}", usernameOrEmail);


        Optional<User> user = userRepository.findByUsername(usernameOrEmail);
        if (user.isEmpty()) {
            user = userRepository.findByEmail(usernameOrEmail);
        }

        if (user.isPresent()) {
            log.info("User found: {}", user.get().getUsername());
            if (passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
                if (user.get().getStatus()) {
                    return user.get();
                }
                throw new RuntimeException("User is not activated");
            } else {
                throw new RuntimeException("Invalid password");
            }
        }

        throw new RuntimeException("User not found with username/email: " + usernameOrEmail);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(int id, UserDTO userDTO, MultipartFile file) {
        User user = getUserById(id);

        if (userDTO.getPhone() != null) {
            user.setPhone(userDTO.getPhone());
        }
        if (userDTO.getAddress() != null) {
            user.setAddress(userDTO.getAddress());
        }
        if (file != null) {
            user.setAvatar(cloudinaryService.uploadFile(file, "avatar"));
        }

        user.setStatus(userDTO.getStatus());

        return userRepository.save(user);
    }

    public ResponseEntity<Map> enabledUser(int id) {
        User user = getUserById(id);
        user.setStatus(true);
        userRepository.save(user);
        return ResponseEntity.ok().body(Map.of("user", user.getUsername(), "message", "User has been enabled"));
    }

    public ResponseEntity<Map> disableUser(int id) {
        User user = getUserById(id);
        user.setStatus(false);
        userRepository.save(user);
        return ResponseEntity.ok().body(Map.of("user", user.getUsername(), "message", "User has been disabled"));
    }

    public User updateProfile(int id, ProfileDTO profileDTO) {
        User user = getUserById(id);

        if (profileDTO.getEmail() != null) {
            user.setEmail(profileDTO.getEmail());
        }
        if (profileDTO.getPhone() != null) {
            user.setPhone(profileDTO.getPhone());
        }
        if (profileDTO.getAddress() != null) {
            user.setAddress(profileDTO.getAddress());
        }


        return userRepository.save(user);
    }

    public ResponseEntity<Map> uploadAvatar(int id, MultipartFile file) {
        try {
            User user = getUserById(id);
            user.setAvatar(cloudinaryService.uploadFile(file, "avatar"));
            userRepository.save(user);
            String data = user.getAvatar().toString();

            return ResponseEntity.ok().body(Map.of("user", user
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }


}