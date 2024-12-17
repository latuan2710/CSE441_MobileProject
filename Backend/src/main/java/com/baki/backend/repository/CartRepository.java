package com.baki.backend.repository;


import com.baki.backend.model.Cart;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository {
    Optional<Cart> findByName(String name);
}
