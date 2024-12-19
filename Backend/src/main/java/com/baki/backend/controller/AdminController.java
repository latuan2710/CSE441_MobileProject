
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

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaffs() {
        return ResponseEntity.ok(staffService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable int id) {
        return ResponseEntity.ok(staffService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestPart Staff staffDTO, @RequestPart MultipartFile file) {
        return ResponseEntity.ok(staffService.create(staffDTO, file));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(
            @PathVariable int id, @RequestPart StaffDTO staffDTO, @RequestPart(required = false) MultipartFile file) {
        return ResponseEntity.ok(staffService.updateUser(id, staffDTO, file));
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
    public ResponseEntity<?> fireStaff( @PathVariable int id) {
        staffService.fireStaff(id);
        return ResponseEntity.ok().build();
    }
}
