package com.wisercat.backend.app.web.controllers.health;

import com.wisercat.backend.app.web.model.dto.HealthCheckDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping()
public class HealthController {

    @GetMapping(path = "/check")
    public @ResponseBody HealthCheckDTO check() {
        return new HealthCheckDTO();
    }
}
