package com.baki.backend.service;

import com.baki.backend.dto.*;
import com.baki.backend.model.ERole;
import com.baki.backend.model.Staff;
import com.baki.backend.repository.StaffRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class StaffService {

    private static final Logger log = LoggerFactory.getLogger(StaffService.class);

    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Email validation regex pattern
    private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
            "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    public Staff create(Staff staff, MultipartFile file) {
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        staff.setRole(ERole.STAFF);
        staff.setStatus(true);

        if (file != null)
            staff.setAvatar(cloudinaryService.uploadFile(file, "staffAvatar"));

        return staffRepository.save(staff);
    }

    public Staff login(LoginRequest request) {
        if (request.getUsernameOrEmail() == null || request.getUsernameOrEmail().trim().isEmpty()) {
            throw new RuntimeException("Username/Email cannot be empty");
        }

        String usernameOrEmail = request.getUsernameOrEmail().trim();
        log.info("Attempting login with: {}", usernameOrEmail);

        // Try to find user
        Optional<Staff> user = staffRepository.findByUsername(usernameOrEmail);
        if (user.isEmpty()) {
            user = staffRepository.findByEmail(usernameOrEmail);
        }

        if (user.isPresent()) {
            log.info("User found: {}", user.get().getUsername());
            if (passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
                return user.get();
            } else {
                throw new RuntimeException("Invalid password");
            }
        }

        throw new RuntimeException("User not found with username/email: " + usernameOrEmail);
    }

    public List<Staff> getAllUsers() {
        return staffRepository.findAll();
    }

    public Staff getUserById(int id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Staff updateUser(int id, StaffDTO staffDTO, MultipartFile file) {
        Staff staff = getUserById(id);

        if (staffDTO.getPhone() != null) {
            staff.setPhone(staffDTO.getPhone());
        }
        if (staffDTO.getAddress() != null) {
            staff.setAddress(staffDTO.getAddress());
        }
        if (file != null)
            staff.setAvatar(cloudinaryService.uploadFile(file, "staffAvatar"));

        return staffRepository.save(staff);
    }

    public Staff updateUserRole(int id, UpdateStaffRoleRequest request) {
        Staff staff = getUserById(id);

        // Validate role
//        if (!ERole.valueOf(request.getRole()) {
//            throw new RuntimeException("Invalid role. Must be ADMIN, STAFF, or USER");
//        }

        staff.setRole(ERole.valueOf(request.getRole()));
        return staffRepository.save(staff);
    }

    public void fireStaff(int id) {
        staffRepository.deleteById(id);
    }

    public Staff updateProfile(int id, ProfileDTO profileDTO) {
        Staff staff = getUserById(id);

        if (profileDTO.getEmail() != null) {
            staff.setEmail(profileDTO.getEmail());
        }
        if (profileDTO.getPhone() != null) {
            staff.setPhone(profileDTO.getPhone());
        }
        if (profileDTO.getAddress() != null) {
            staff.setAddress(profileDTO.getAddress());
        }


        return staffRepository.save(staff);
    }

    public ResponseEntity<Map> uploadAvatar(int id, MultipartFile file) {
        try {
            Staff staff = getUserById(id);
            staff.setAvatar(cloudinaryService.uploadFile(file, "staffAvatar"));
            staffRepository.save(staff);
            String data = staff.getAvatar().toString();
            return ResponseEntity.ok().body(Map.of("staff", staff
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }
}
