package com.wisercat.backend.app.web.controllers.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/health")
public class HealthController {

    @GetMapping(path = "/check")
    public @ResponseBody String check() {
        return "Backend up and running!";
    }
}
