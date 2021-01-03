package com.example.light_commerce.entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import com.example.light_commerce.entities.Order;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date datePayement;
    private long cardNumber;
    private String cardType;
    
    @OneToOne(mappedBy ="payment")
    @JsonProperty( access = JsonProperty.Access.WRITE_ONLY)
    private Order order;
}
