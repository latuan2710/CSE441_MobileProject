package com.baki.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false, length = 100)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(length = 100)
    private String phone;

    @Column(length = 100)
    private String address;

    private String avatar;

    @Column(nullable = false)
    private Boolean status = false;

    private LocalDateTime create_at;

    @PrePersist
    protected void onCreate() {
        create_at = LocalDateTime.now();
    }
}