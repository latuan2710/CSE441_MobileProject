package com.baki.backend.controller;

import com.baki.backend.dto.CartDTO;
import com.baki.backend.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.clearCart(userId));
    }

    @PostMapping("/cart_detail")
    public ResponseEntity<?> addToCart(HttpSession httpSession, @RequestBody CartDTO cartDTO) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.addToCart(cartDTO, userId));
    }

    @PutMapping("/cart_detail")
    public ResponseEntity<?> updateCartItem(HttpSession httpSession, @RequestBody CartDTO cartDTO) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.updateCartItemQuantity(userId, cartDTO));
    }

    @DeleteMapping("/cart_detail/{id}")
    public ResponseEntity<?> removeCartItem(HttpSession httpSession, @PathVariable int id) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.removeCartItem(userId, id));
    }
}
