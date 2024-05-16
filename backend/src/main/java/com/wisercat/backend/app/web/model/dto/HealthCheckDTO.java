package com.wisercat.backend.app.web.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthCheckDTO {

    private String status = "Server is Running!";
}
