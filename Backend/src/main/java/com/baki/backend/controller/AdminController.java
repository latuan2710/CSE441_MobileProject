
package com.baki.backend.controller;

import com.baki.backend.dto.ProfileDTO;
import com.baki.backend.dto.StaffDTO;
import com.baki.backend.model.Staff;
import com.baki.backend.service.StaffService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173/baki-admin/", allowCredentials = "true")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/")
    public ResponseEntity<List<Staff>> getAllStaffs() {
        return ResponseEntity.ok(staffService.getAllUsers());
    }
    @PostMapping
    public ResponseEntity<Staff> createStaff(HttpSession session,@RequestBody Staff staffDTO) {
        Long adminId = Long.parseLong(session.getAttribute("userId").toString());
        return ResponseEntity.ok(staffService.create(staffDTO,adminId));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id, @RequestBody StaffDTO staffDTO) {
        return ResponseEntity.ok(staffService.updateUser(id, staffDTO));
    }
   
    @PutMapping("/profile")
    public ResponseEntity<Staff> updateProfile(HttpSession httpSession, @RequestBody ProfileDTO profileDTO) {
        Long userId = (Long) httpSession.getAttribute("userId");

        Staff updatedStaff = staffService.updateProfile(userId, profileDTO);
        return ResponseEntity.ok(updatedStaff);
    }

    @PutMapping("/upload")
    public ResponseEntity<Map> upload(HttpSession session, @RequestPart("file") MultipartFile file) {
        try {
            Long id = Long.parseLong(session.getAttribute("userId").toString());
            return staffService.uploadAvatar(id, file);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/profile")
    public ResponseEntity<Staff> getProfile(HttpSession httpSession) {
        Long userId = (Long) httpSession.getAttribute("userId");

        Staff updatedUser = staffService.getUserById(userId);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/fire/{id}")
    public ResponseEntity<?> fireStaff(HttpSession session,@PathVariable Long id) {
        Long adminId = Long.parseLong(session.getAttribute("userId").toString());
        staffService.fireStaff(id,adminId);
        return ResponseEntity.ok().build();
    }
}
