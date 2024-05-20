import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HealthCheck} from "../classes/HealthCheck";

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) {
  }


  getHealthCheck(): Observable<HealthCheck> {
    return this.http.get<HealthCheck>("api/health/check");
  }
}
