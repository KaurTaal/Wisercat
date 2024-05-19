package com.wisercat.backend.app.web.services;

import com.wisercat.backend.app.web.model.dto.FilterDTO;

import java.util.List;

public interface FilterService {

    List<FilterDTO> getAllFilters();

    FilterDTO createFilter(FilterDTO filterDTO);
}
