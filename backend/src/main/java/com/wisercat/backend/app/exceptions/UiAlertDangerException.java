package com.wisercat.backend.app.exceptions;

import com.wisercat.backend.app.web.model.UiAlert;
import lombok.Getter;

@Getter
public class UiAlertDangerException extends UiAlertException {
    public UiAlertDangerException(String message) {
        setAlert(new UiAlert(message, UiAlert.AlertType.ERROR));
    }
}
