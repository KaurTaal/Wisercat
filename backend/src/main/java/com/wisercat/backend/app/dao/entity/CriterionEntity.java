package com.wisercat.backend.app.dao.entity;


import com.wisercat.backend.app.enums.ConditionEnum;
import com.wisercat.backend.app.enums.CriterionTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Table(name = "criterions")
@Entity
@Getter
@Setter
public class CriterionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crit_id")
    private Long critId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "filter_id", nullable = false)
    private FilterEntity filterEntity;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private CriterionTypeEnum type;

    @Column(name = "condition")
    @Enumerated(EnumType.STRING)
    private ConditionEnum condition;

    @Column(name = "value_amount")
    private Integer valueAmount;

    @Column(name = "value_title")
    private String valueTitle;

    @Column(name = "value_date")
    private Date valueDate;
}
