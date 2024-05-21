package com.wisercat.backend.app.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CriterionTypeEnum {
    AMOUNT("Amount"),
    TITLE("Title"),
    DATE("Date");

    private final String value;

    @JsonValue
    public String getValue() {
        return value;
    }

}
