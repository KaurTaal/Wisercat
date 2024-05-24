package com.wisercat.backend.app.web.controllers.filter;

import com.wisercat.backend.app.web.model.dto.FilterDTO;
import com.wisercat.backend.app.web.services.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/filter")
@RequiredArgsConstructor
public class FilterController {

    private final FilterService filterService;

    @GetMapping(path = "/getAllFilters")
    public @ResponseBody List<FilterDTO> getAllFilters() {
        return filterService.getAllFilters();
    }

    @PostMapping(path = "/createFilter", consumes = "application/json")
    public @ResponseBody FilterDTO createFilter(@RequestBody FilterDTO filterDTO) {
        return filterService.createFilter(filterDTO);
    }

    @DeleteMapping(path = "/deleteFilter/{filterId}")
    public void deleteFilterById(@PathVariable Long filterId) {
        this.filterService.deleteFilter(filterId);
    }
}
