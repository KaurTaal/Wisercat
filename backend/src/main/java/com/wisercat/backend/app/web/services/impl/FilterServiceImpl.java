package com.wisercat.backend.app.web.services.impl;


import com.wisercat.backend.app.dao.entity.CriterionEntity;
import com.wisercat.backend.app.dao.entity.FilterEntity;
import com.wisercat.backend.app.dao.repository.FilterRepository;
import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.FilterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FilterServiceImpl implements FilterService {

    private final FilterRepository filterRepository;

    @Override
    public List<FilterDTO> getAllFilters() {
        List<FilterEntity> allFilters = filterRepository.findAll();
        return FilterDTO.mapList(allFilters);
    }

    @Override
    public FilterDTO createFilter(FilterDTO filterDTO) {
        FilterEntity filterEntity = new FilterEntity();
        filterEntity.setName(filterDTO.getName());
        filterEntity.setCriterions(getFilterCriterionEntities(filterDTO, filterEntity));

//        filterRepository.save(filterEntity);
        return FilterDTO.map(filterEntity);
    }






    private List<CriterionEntity> getFilterCriterionEntities(FilterDTO filterDTO, FilterEntity filterEntity) {
        List<CriterionEntity> criterionEntities = new ArrayList<>();

        filterDTO.getCriterionDTOList().forEach(criterionDTO -> {
            CriterionEntity criterionEntity = new CriterionEntity();
            criterionEntity.setFilterEntity(filterEntity);
            criterionEntity.setType(criterionDTO.getType());
            criterionEntity.setCondition(criterionDTO.getCondition());
            criterionEntity.setValueDate(criterionDTO.getValueDate());
            criterionEntity.setValueAmount(criterionDTO.getValueAmount());
            criterionEntity.setValueTitle(criterionDTO.getValueTitle());
            criterionEntities.add(criterionEntity);
        });
        return criterionEntities;
    }
}
