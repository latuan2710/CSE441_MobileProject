package com.baki.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_detail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(nullable = false, name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(nullable = false, name = "product_id")
    private Product product;
}
