package com.wisercat.backend.app.exceptions;

import com.wisercat.backend.app.web.model.UiAlert;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UiAlertException extends RuntimeException {
    private transient UiAlert alert;
}