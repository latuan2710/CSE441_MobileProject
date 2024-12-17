package com.baki.backend.config;

import com.baki.backend.model.ERole;
import com.baki.backend.model.Staff;
import com.baki.backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Check if admin exists
        if (!staffRepository.existsByUsername("admin")) {
            Staff admin = new Staff();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@example.com");
            admin.setPhone("1234567890");
            admin.setRole(ERole.ADMIN);
            admin.setStatus(true);
            staffRepository.save(admin);
            System.out.println("Admin user created successfully");
        }
    }
}