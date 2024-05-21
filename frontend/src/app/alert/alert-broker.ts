import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertBroker {

  private alerts: Alert[] = [];

  getAllAlerts(): Alert[] {
    return this.alerts;
  }

  add(content: string, type: AlertType, dismissAfterSeconds?: number): void {
    this.addAlert({
      type: type,
      icon: true,
      dismissible: true,
      content: content,
      dismissAfterSeconds: dismissAfterSeconds ?? AlertBroker.resolveDefaultTimeoutSeconds(type),
    });
  }

  dismiss(alert: Alert): void {
    const alertIndex = this.alerts.indexOf(alert);
    if (alertIndex > -1) {
      this.alerts.splice(alertIndex, 1);
    }
  }

  private addAlert(alert: Alert): void {
    this.alerts.push(alert);
    if (alert.dismissAfterSeconds) {
      setTimeout(() => this.dismiss(alert), alert.dismissAfterSeconds * 1000);
    }
  }

  private static resolveDefaultTimeoutSeconds(alertType: AlertType): number {
    switch (alertType) {
      case AlertType.SUCCESS:
      case AlertType.WARNING:
      case AlertType.INFO:
      case AlertType.ERROR:
      default:
        return 3;
    }
  }
}
