package com.wisercat.backend.app.web.services.impl;


import com.wisercat.backend.app.dao.entity.CriterionEntity;
import com.wisercat.backend.app.dao.entity.FilterEntity;
import com.wisercat.backend.app.dao.repository.FilterRepository;
import com.wisercat.backend.app.enums.UiAlertEnum;
import com.wisercat.backend.app.exceptions.UiAlertDangerException;
import com.wisercat.backend.app.web.model.dto.CriterionDTO;
import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.FilterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FilterServiceImpl implements FilterService {

    private final FilterRepository filterRepository;

    @Override
    public List<FilterDTO> getAllFilters() {
        log.info("Retrieving all filters");
        List<FilterEntity> allFilters = filterRepository.findAll();
        log.info("Retrieved {} filters", allFilters.size());
        return FilterDTO.mapList(allFilters);
    }

    @Override
    public FilterDTO createFilter(FilterDTO filterDTO) {
        this.validateFilterDTO(filterDTO);
        filterDTO.getCriterionDTOList().forEach(this::validateCriterionDTO);

        FilterEntity filterEntity = new FilterEntity();
        filterEntity.setName(filterDTO.getName());
        filterEntity.setCriterions(getFilterCriterionEntities(filterDTO, filterEntity));

        filterRepository.save(filterEntity);
        log.info("Saved filter: {}", filterEntity);
        return FilterDTO.map(filterEntity);
    }

    @Override
    public void deleteFilter(Long filterId) {
        Optional<FilterEntity> byId = this.filterRepository.findById(filterId);
        if (byId.isEmpty()) {
            throw new UiAlertDangerException(UiAlertEnum.NO_FILTER_FOUND.getName());
        }
        log.info("Deleted filter: {}", byId.get());
        this.filterRepository.deleteById(filterId);
    }

    private void validateFilterDTO(FilterDTO filterDTO) {
        if (filterDTO.getCriterionDTOList() == null) {
            throw new UiAlertDangerException(UiAlertEnum.FILTER_SAVE_ERROR.getName());
        }

        boolean isNameNotPresent = filterDTO.getName() == null;
        boolean isCriterionListEmpty = filterDTO.getCriterionDTOList().isEmpty();
        if (isNameNotPresent) {
            throw new UiAlertDangerException(UiAlertEnum.FILTER_SAVE_ERROR.getName());
        }
        if (isCriterionListEmpty) {
            throw new UiAlertDangerException(UiAlertEnum.FILTER_SAVE_ERROR.getName());
        }
    }

    private void validateCriterionDTO(CriterionDTO criterionDTO) {
        boolean isTypeValid = criterionDTO.getType() != null;
        if (!isTypeValid) {
            throw new UiAlertDangerException(UiAlertEnum.INVALID_CRITERION.getName());
        }
        boolean isConditionValid = criterionDTO.getCondition() != null;
        if (!isConditionValid) {
            throw new UiAlertDangerException(UiAlertEnum.INVALID_CRITERION.getName());
        }
        boolean isOnlyOneValuePresent = isOnlyOneValuePresent(criterionDTO);
        if (!isOnlyOneValuePresent) {
            throw new UiAlertDangerException(UiAlertEnum.INVALID_CRITERION.getName());
        }
    }

    private static boolean isOnlyOneValuePresent(CriterionDTO criterionDTO) {
        Integer valueAmount = criterionDTO.getValueAmount();
        String valueTitle = criterionDTO.getValueTitle();
        Date valueDate = criterionDTO.getValueDate();

        boolean isValuePresent = valueDate != null || valueAmount != null || valueTitle != null;
        if (!isValuePresent) {
            throw new UiAlertDangerException(UiAlertEnum.INVALID_CRITERION.getName());
        }
        boolean isAmount = valueDate == null && valueTitle == null;
        boolean isDate = valueAmount == null && valueTitle == null;
        boolean isTitle = valueDate == null && valueAmount == null;

        return isAmount || isDate || isTitle;
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
