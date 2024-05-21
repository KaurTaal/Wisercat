export interface Alert {
  type: AlertType;
  icon: boolean;
  dismissible: boolean;
  content: string;
  dismissAfterSeconds?: number;
  classes?: string[]
}

export enum AlertType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}
