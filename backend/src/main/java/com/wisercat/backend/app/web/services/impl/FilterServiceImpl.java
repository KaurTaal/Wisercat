package com.wisercat.backend.app.web.services.impl;


import com.wisercat.backend.app.dao.entity.FilterEntity;
import com.wisercat.backend.app.dao.repository.FilterRepository;
import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.FilterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
}
