package com.baki.backend.controller;

import com.baki.backend.dto.OrderDTO;
import com.baki.backend.model.EOrderStatus;
import com.baki.backend.model.Order;
import com.baki.backend.model.OrderDetail;
import com.baki.backend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Order> getOrderById(@PathVariable int orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PutMapping("/{orderId}/{status}")
    public ResponseEntity<Order> changeOrderStatus(@PathVariable int orderId, @PathVariable EOrderStatus status) {
        return ResponseEntity.ok(orderService.changeOrderStatus(orderId, status));
    }

    @GetMapping("/detail/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailByOrderId(@PathVariable int orderId) {
        return ResponseEntity.ok(orderService.getOrderDetailByOrderId(orderId));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getOwnOrder(HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/user/{status}")
    public ResponseEntity<List<Order>> getOwnOrdersByStatus(
            HttpSession httpSession, @PathVariable EOrderStatus status) {
        int userId = (int) httpSession.getAttribute("userId");
        return ResponseEntity.ok(orderService.getOrdersByUserIdAndStatus(userId, status));
    }

    @GetMapping("/user/cancel/{orderId}")
    public ResponseEntity<Order> cancelOwnOrder(@PathVariable int orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutOrder(@RequestBody OrderDTO orderDTO, HttpSession httpSession) {
        int userId = (int) httpSession.getAttribute("userId");
        try {
            orderService.checkoutOrder(orderDTO, userId);

            Map<String, String> res = new HashMap<>();
            res.put("status", "success");
            res.put("message", "Checkout successfully!");
            return ResponseEntity.status(200).body(res);
        } catch (RuntimeException e) {
            Map<String, String> res = new HashMap<>();
            res.put("status", "error");
            res.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }

    }
}
