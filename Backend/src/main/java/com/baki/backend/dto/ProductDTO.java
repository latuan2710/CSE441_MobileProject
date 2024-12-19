package com.baki.backend.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private int brandId;
    private int subcategoryId;
    private double price;
    private int stockQuantity;
}
