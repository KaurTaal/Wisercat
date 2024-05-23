package com.wisercat.backend.web.services.impl;

import com.wisercat.backend.app.dao.entity.CriterionEntity;
import com.wisercat.backend.app.dao.entity.FilterEntity;
import com.wisercat.backend.app.dao.repository.FilterRepository;
import com.wisercat.backend.app.enums.ConditionEnum;
import com.wisercat.backend.app.enums.CriterionTypeEnum;
import com.wisercat.backend.app.exceptions.UiAlertDangerException;
import com.wisercat.backend.app.web.model.dto.CriterionDTO;
import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.impl.FilterServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FilterServiceImplTest {

    @Mock
    private FilterRepository filterRepository;

    @InjectMocks
    FilterServiceImpl sut;

    private FilterEntity filterEntity;
    private CriterionEntity criterionEntity;

    @BeforeEach
    void setup() {
        filterEntity = new FilterEntity();
        filterEntity.setName("Test Filter");

        criterionEntity = new CriterionEntity();
        criterionEntity.setFilterEntity(filterEntity);
        criterionEntity.setType(CriterionTypeEnum.AMOUNT);
        criterionEntity.setCondition(ConditionEnum.EQUAL_TO);
        criterionEntity.setValueAmount(10);

        filterEntity.setCriterions(Collections.singletonList(criterionEntity));
    }

    @Test
    void testGetAllFilters() {
        when(filterRepository.findAll()).thenReturn(Collections.singletonList(filterEntity));

        List<FilterDTO> result = sut.getAllFilters();
        FilterDTO filterDTO = result.get(0);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Filter", filterDTO.getName());
        assertEquals(1, filterDTO.getCriterionDTOList().size());

        verify(filterRepository, times(1)).findAll();
    }

    @Test
    void testCreateFilter() {
        FilterEntity savedFilter = new FilterEntity();
        savedFilter.setName("Saved filter");
        savedFilter.setCriterions(Collections.singletonList(criterionEntity));

        when(filterRepository.save(any(FilterEntity.class))).thenReturn(savedFilter);

        FilterDTO filter = sut.createFilter(FilterDTO.map(savedFilter));
        CriterionDTO criterionDTO = filter.getCriterionDTOList().get(0);

        assertNotNull(filter);
        assertEquals("Saved filter", filter.getName());
        assertEquals(1, savedFilter.getCriterions().size());

        assertEquals(CriterionTypeEnum.AMOUNT, criterionDTO.getType());
        assertEquals(ConditionEnum.EQUAL_TO, criterionDTO.getCondition());
        assertEquals(10, criterionDTO.getValueAmount());
        assertNull(criterionDTO.getValueDate());
        assertNull(criterionDTO.getValueTitle());

        verify(filterRepository, times(1)).save(any(FilterEntity.class));
    }

    @Test
    void testDeleteFilter() {
        Long filterId = 1L;
        when(filterRepository.findById(filterId)).thenReturn(Optional.of(new FilterEntity()));
        sut.deleteFilter(filterId);
        verify(filterRepository, times(1)).deleteById(filterId);
    }

    @Test
    void testThrowErrorDeleteMissingFilter() {
        Long filterId = 1L;
        when(filterRepository.findById(filterId)).thenReturn(Optional.empty());
        assertThrows(UiAlertDangerException.class, () -> sut.deleteFilter(filterId));
    }


    @Test
    void testThrowErrorOnNoName() {
        CriterionDTO criterionDTO = new CriterionDTO();
        FilterDTO filterDTO = new FilterDTO(null, null, Collections.singletonList(criterionDTO));

        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnNoCriterionList() {
        FilterDTO filterDTO = new FilterDTO(null, "Sniff", null);

        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnEmptyCriterionList() {
        List<CriterionDTO> emptyList = new ArrayList<>();
        FilterDTO filterDTO = new FilterDTO(null, "Sniff", emptyList);

        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnNoCriterionType() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(null);

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnNoCriterionCondition() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(null);

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnNoValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(null);
        criterionDTO.setValueTitle(null);
        criterionDTO.setValueDate(null);

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnMultipleValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(10);
        criterionDTO.setValueTitle("Mü");
        criterionDTO.setValueDate(new Date());

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnTitleAndDateValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(null);
        criterionDTO.setValueTitle("Mü");
        criterionDTO.setValueDate(new Date());

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnTitleAndAmountValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(10);
        criterionDTO.setValueTitle("Mü");
        criterionDTO.setValueDate(null);

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

    @Test
    void testThrowErrorOnDateAndAmountValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(10);
        criterionDTO.setValueTitle(null);
        criterionDTO.setValueDate(new Date());

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }


    @Test
    void testThrowErrorOnAmountAndTitleValues() {
        CriterionDTO criterionDTO = new CriterionDTO();
        criterionDTO.setType(CriterionTypeEnum.AMOUNT);
        criterionDTO.setCondition(ConditionEnum.EQUAL_TO);
        criterionDTO.setValueAmount(10);
        criterionDTO.setValueTitle("Sniff");
        criterionDTO.setValueDate(null);

        FilterDTO filterDTO = new FilterDTO(null, "Sniff", Collections.singletonList(criterionDTO));
        assertThrows(UiAlertDangerException.class, () -> sut.createFilter(filterDTO));
    }

}
