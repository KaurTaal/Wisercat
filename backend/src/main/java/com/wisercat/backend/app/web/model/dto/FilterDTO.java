package com.wisercat.backend.app.web.model.dto;

import com.wisercat.backend.app.dao.entity.FilterEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterDTO {

    private Long filterId;
    private String name;
    private List<CriterionDTO> criterionDTOList;


    public static List<FilterDTO> mapList(List<FilterEntity> filterEntities) {
        List<FilterDTO> filterDTOS = new LinkedList<>();
        filterEntities.forEach(filter -> filterDTOS.add(FilterDTO.map(filter)));
        return filterDTOS;
    }

    public static FilterDTO map(FilterEntity filter) {
        FilterDTO filterDTO = new FilterDTO();
        filterDTO.setFilterId(filter.getFilterId());
        filterDTO.setName(filter.getName());
        filterDTO.setCriterionDTOList(CriterionDTO.mapList(filter.getCriterions()));
        return filterDTO;
    }
}
