package com.wisercat.backend.app.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ConditionEnum {
    GREATER_THAN("Greater than"),
    LESS_THAN("Less than"),
    EQUAL_TO("Equal to"),
    CONTAINS("Contains"),
    STARTS_WITH("Starts with"),
    ENDS_WITH("Ends with"),
    BEFORE("Before"),
    AFTER("After");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

}
