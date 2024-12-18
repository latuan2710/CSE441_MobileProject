package com.baki.backend.controller;

import com.baki.backend.dto.OrderDTO;
import com.baki.backend.model.EOrderStatus;
import com.baki.backend.model.Order;
import com.baki.backend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        return orderService.getOrderById(orderId);
    }

    @PutMapping("/{orderId}/{status}")
    public void changeOrderStatus(@PathVariable int orderId, @PathVariable EOrderStatus status) {
        orderService.changeOrderStatus(orderId, status);
    }

    @GetMapping("/user")
    public List<Order> getOrdersByUserId(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/user/{status}")
    public List<Order> getOrdersByUserIdAndStatus(HttpSession httpSession, @PathVariable EOrderStatus status) {
        int userId = (int) httpSession.getAttribute("userId");
        return orderService.getOrdersByUserIdAndStatus(userId, status);
    }

    @PostMapping("/checkout")
    public Order checkoutOrder(@RequestBody OrderDTO orderDTO, HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return orderService.checkoutOrder(orderDTO, userId);
    }
}
