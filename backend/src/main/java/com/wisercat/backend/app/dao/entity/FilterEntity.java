package com.wisercat.backend.app.dao.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "filters")
@Entity
@Getter
@Setter
public class FilterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long filterId;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "critId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CriterionEntity> criterions;
}
