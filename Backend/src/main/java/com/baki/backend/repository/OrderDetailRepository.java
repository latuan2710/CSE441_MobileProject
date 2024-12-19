package com.baki.backend.repository;


import com.baki.backend.model.EOrderStatus;
import com.baki.backend.model.Order;
import com.baki.backend.model.OrderDetail;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT od FROM OrderDetail od WHERE od.order.user.id = :userId AND od.order.status = :status ORDER BY od.id DESC")
    List<OrderDetail> getOrdersByUserIdAndStatus(int userId, EOrderStatus status);

    @Query("select od from OrderDetail od where od.order.id = :orderId")
    List<OrderDetail> getOrderDetailByOrderId(int orderId);
}
