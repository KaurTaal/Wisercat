import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private http: HttpClient) {
  }


  getHealthCheck(): Observable<string> {
    return this.http.get<string>("api/health/check");
  }
}
