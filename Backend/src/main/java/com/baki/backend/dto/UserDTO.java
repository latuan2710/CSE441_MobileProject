package com.baki.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserDTO {
    private int id;
    private String phone;
    private String address;
    private Boolean status;
}