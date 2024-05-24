package com.wisercat.backend.app.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UiAlertEnum {
    FILTER_SAVE_ERROR("Failed to save filter"),
    INVALID_CRITERION("Invalid criteria added"),
    NO_FILTER_FOUND("No filter present with given id");

    private final String name;
}
