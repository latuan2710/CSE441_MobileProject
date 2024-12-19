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
        return orderRepository.getOrdersByUserIdAndStatus(userId, status);
    }

    public Order getOrderById(int orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
    }

    public List<OrderDetail> getOrderDetailByOrderId(int orderId) {
        return orderDetailRepository.getOrderDetailByOrderId(orderId);
    }

    public List<Order> getOrdersByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order changeOrderStatus(int orderId, EOrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));

        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void checkoutOrder(OrderDTO orderDTO, int userId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found!"));

        if (cart.getCartDetails().isEmpty()) {
            throw new RuntimeException("There is no item in cart!");
        }

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
    }

    public Order cancelOrder(int orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));

        order.setStatus(EOrderStatus.CANCELLED);
        return orderRepository.save(order);
    }
}
