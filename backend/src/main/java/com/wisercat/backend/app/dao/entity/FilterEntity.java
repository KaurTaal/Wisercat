package com.wisercat.backend.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "filters")
@Entity
@Getter
@Setter
public class FilterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer filterId;

    @Column(name = "name")
    private String name;
}
