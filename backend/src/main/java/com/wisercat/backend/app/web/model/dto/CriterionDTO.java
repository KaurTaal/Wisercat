package com.wisercat.backend.app.web.model.dto;


import com.wisercat.backend.app.dao.entity.CriterionEntity;
import com.wisercat.backend.app.enums.ConditionEnum;
import com.wisercat.backend.app.enums.CriterionTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriterionDTO {

    private Long critId;
    private Long filterId;
    private CriterionTypeEnum type;
    private ConditionEnum condition;
    private Integer valueAmount;
    private String valueTitle;
    private Date valueDate;


    public static List<CriterionDTO> mapList(List<CriterionEntity> criterionEntityList) {
        List<CriterionDTO> criterionDTOList = new ArrayList<>();
        criterionEntityList.forEach(criterionEntity -> criterionDTOList.add(CriterionDTO.map(criterionEntity)));
        return criterionDTOList;
    }


    public static CriterionDTO map(CriterionEntity criterion) {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setCritId(criterion.getCritId());
        criterionDTO.setFilterId(criterion.getFilterEntity().getFilterId());
        criterionDTO.setType(criterion.getType());
        criterionDTO.setCondition(criterion.getCondition());
        criterionDTO.setValueAmount(criterion.getValueAmount());
        criterionDTO.setValueTitle(criterion.getValueTitle());
        criterionDTO.setValueDate(criterion.getValueDate());
        return criterionDTO;
    }
}
