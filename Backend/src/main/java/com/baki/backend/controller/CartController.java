package com.baki.backend.controller;

import com.baki.backend.dto.CartDTO;
import com.baki.backend.model.Cart;
import com.baki.backend.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/service/carts")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @DeleteMapping
    public ResponseEntity<Cart> clearCart(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.clearCart(userId));
    }

    @PostMapping("/cart_detail")
    public ResponseEntity<Cart> addToCart(HttpSession httpSession, @RequestBody CartDTO cartDTO) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.addToCart(cartDTO, userId));
    }

    @PutMapping("/cart_detail")
    public ResponseEntity<Cart> updateCartItem(HttpSession httpSession, @RequestBody CartDTO cartDTO) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(cartService.updateCartItemQuantity(userId, cartDTO));
    }

    @DeleteMapping("/cart_detail/{id}")
    public ResponseEntity<?> removeCartItem(@PathVariable int id) {
        cartService.removeCartItem(id);

        Map<String, String> res = new HashMap<>();
        res.put("status", "success");
        res.put("message", "Delete cart item successfully!");
        return ResponseEntity.status(200).body(res);
    }
}
