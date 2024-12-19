package com.baki.backend.service;

import com.baki.backend.dto.CartDTO;
import com.baki.backend.model.Cart;
import com.baki.backend.model.CartDetail;
import com.baki.backend.model.Product;
import com.baki.backend.model.User;
import com.baki.backend.repository.CartDetailRepository;
import com.baki.backend.repository.CartRepository;
import com.baki.backend.repository.ProductRepository;
import com.baki.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartDetailRepository cartDetailRepository;

    public Cart getCartByUserId(int userId) {
        return cartRepository.findByUserId(userId)
                .orElse(null);
    }

    public Cart addToCart(CartDTO cartDTO, int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return newCart;
                });

        Product product = productRepository.findById(cartDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found! "));

        Optional<CartDetail> existingDetail = cart.getCartDetails().stream()
                .filter(detail -> detail.getProduct().getId() == cartDTO.getProductId())
                .findFirst();

        if (existingDetail.isPresent()) {
            CartDetail cartDetail = existingDetail.get();
            cartDetail.setQuantity(cartDetail.getQuantity() + cartDTO.getQuantity());
        } else {
            CartDetail newDetail = new CartDetail();
            newDetail.setProduct(product);
            newDetail.setQuantity(cartDTO.getQuantity());
            newDetail.setCart(cart);
            cart.getCartDetails().add(newDetail);
        }

        return cartRepository.save(cart);
    }

    public Cart updateCartItemQuantity(int userId, CartDTO cartDTO) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found! "));

        CartDetail cartDetail = cart.getCartDetails().stream()
                .filter(detail -> detail.getProduct().getId() == cartDTO.getProductId())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        if (cartDTO.getQuantity() > 0) {
            cartDetail.setQuantity(cartDTO.getQuantity());
        } else {
            cart.getCartDetails().remove(cartDetail);
        }

        return cartRepository.save(cart);
    }

    public void removeCartItem(int cartDetailId) {
        cartDetailRepository.deleteById(cartDetailId);
    }

    public Cart clearCart(int userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found!"));

        cart.getCartDetails().clear();
        return cartRepository.save(cart);
    }
}