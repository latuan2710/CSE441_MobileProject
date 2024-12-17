package com.baki.backend.dto;
import lombok.Data;

@Data
public class StaffDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private String role;
    private Boolean status;
}
