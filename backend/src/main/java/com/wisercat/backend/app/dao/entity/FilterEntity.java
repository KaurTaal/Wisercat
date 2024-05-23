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
    @Column(name = "filter_id")
    private Long filterId;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "filterEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CriterionEntity> criterions;
}
