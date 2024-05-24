import {HttpErrorResponse, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, tap, throwError} from "rxjs";
import {AlertType} from "../alert/alert.model";
import {inject} from "@angular/core";
import {AlertBroker} from "../alert/alert-broker";


export const httpMiddleware: HttpInterceptorFn = (req, next) => {
  const alertBroker: AlertBroker = inject(AlertBroker);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      alertBroker.add("Internal Server Error", AlertType.ERROR);
      return throwError(()=> error);
    }))
    .pipe(tap((response) => {
      if (response instanceof HttpResponse) {
        if (response.body) {
          // @ts-ignore
          if (response?.body.responseType) {
            // @ts-ignore
            if (response?.body.responseType === 'ui-exception') {
              // @ts-ignore
              console.log(response.body.message, AlertType[response.body.type])
              // @ts-ignore
              alertBroker.add(response.body.message, AlertType[response.body.type]);
              throw new Error("Interceptor consumed error");
            }
          }
        }
      }
    }))
};
