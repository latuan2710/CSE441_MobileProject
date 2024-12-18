package com.baki.backend.dto;

import lombok.Data;

@Data
public class OrderDTO {
    private String receiverName;
    private String receiverAddress;
    private String receiverPhone;
}
