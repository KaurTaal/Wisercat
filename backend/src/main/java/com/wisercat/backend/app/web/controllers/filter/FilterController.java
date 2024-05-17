package com.wisercat.backend.app.web.controllers.filter;

import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/filters")
@RequiredArgsConstructor
public class FilterController {

    private final FilterService filterService;

    @GetMapping(path = "/getAllFilters")
    public @ResponseBody List<FilterDTO> getAllFilters() {
        return filterService.getAllFilters();
    }
}
