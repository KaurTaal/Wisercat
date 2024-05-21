package com.wisercat.backend.app.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UiAlertEnum {
    FILTER_SAVE_ERROR("Failed to save filter");

    private final String name;
}
