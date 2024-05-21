package com.wisercat.backend.app.web.model;

import lombok.Getter;

@Getter
public class UiAlert {
    private final String responseType = "ui-exception";
    private final String message;
    private final AlertType type;


    public UiAlert(String message, AlertType type) {
        this.message = message;
        this.type = type;
    }

    public enum AlertType {
        WARNING,
        ERROR
    }
}
