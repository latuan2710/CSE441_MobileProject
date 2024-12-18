package com.baki.backend.repository;


import com.baki.backend.model.Cart;
import com.baki.backend.model.EOrderStatus;
import com.baki.backend.model.Order;
import com.baki.backend.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByUserId(int userId);

    List<Order> findByUserAndStatus(User user, EOrderStatus status, Sort createAt);
}
