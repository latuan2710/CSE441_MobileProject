
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
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/")
    public ResponseEntity<List<Staff>> getAllStaffs() {
        return ResponseEntity.ok(staffService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(HttpSession session, @RequestBody Staff staffDTO) {
        int adminId = Integer.parseInt(session.getAttribute("userId").toString());
        return ResponseEntity.ok(staffService.create(staffDTO, adminId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable int id) {
        return ResponseEntity.ok(staffService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable int id, @RequestBody StaffDTO staffDTO) {
        return ResponseEntity.ok(staffService.updateUser(id, staffDTO));
    }

    @PutMapping("/profile")
    public ResponseEntity<Staff> updateProfile(HttpSession httpSession, @RequestBody ProfileDTO profileDTO) {
        int userId = (int) httpSession.getAttribute("userId");

        Staff updatedStaff = staffService.updateProfile(userId, profileDTO);
        return ResponseEntity.ok(updatedStaff);
    }

    @PutMapping("/upload")
    public ResponseEntity<Map> upload(HttpSession session, @RequestPart("file") MultipartFile file) {
        try {
            int id = Integer.parseInt(session.getAttribute("userId").toString());
            return staffService.uploadAvatar(id, file);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Staff> getProfile(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");

        Staff updatedUser = staffService.getUserById(userId);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/fire/{id}")
    public ResponseEntity<?> fireStaff(HttpSession session, @PathVariable int id) {
        int adminId = Integer.parseInt(session.getAttribute("userId").toString());
        staffService.fireStaff(id, adminId);
        return ResponseEntity.ok().build();
    }
}
