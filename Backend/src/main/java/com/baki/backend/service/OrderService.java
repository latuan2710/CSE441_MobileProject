package com.baki.backend.service;

import com.baki.backend.dto.OrderDTO;
import com.baki.backend.model.*;
import com.baki.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createAt"));
    }

    public List<Order> getOrdersByUserIdAndStatus(int userId, EOrderStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));
        return orderRepository.findByUserAndStatus(user, status, Sort.by(Sort.Direction.DESC, "createAt"));
    }

    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
    }

    public List<Order> getOrdersByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }

    public void changeOrderStatus(int orderId, EOrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));

        order.setStatus(status);
        orderRepository.save(order);
    }

    public Order checkoutOrder(OrderDTO orderDTO, int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found!"));

        double totalPrice = cart.getCartDetails().stream()
                .mapToDouble(cartDetail -> cartDetail.getQuantity() * cartDetail.getProduct().getPrice())
                .sum();

        Order order = new Order();
        order.setUser(user);
        order.setReceiverName(orderDTO.getReceiverName());
        order.setReceiverAddress(orderDTO.getReceiverAddress());
        order.setReceiverPhone(orderDTO.getReceiverPhone());
        order.setTotalPrice(totalPrice);
        order.setStatus(EOrderStatus.PENDING);

        order = orderRepository.save(order);

        for (CartDetail cartDetail : cart.getCartDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProduct(cartDetail.getProduct());
            orderDetail.setQuantity(cartDetail.getQuantity());
            orderDetail.setPrice(cartDetail.getProduct().getPrice());
            orderDetailRepository.save(orderDetail);

            Product product = cartDetail.getProduct();
            product.setStockQuantity(product.getStockQuantity() - cartDetail.getQuantity());
            productRepository.save(product);
        }

        cart.getCartDetails().clear();
        cartRepository.save(cart);

        return order;
    }
}
