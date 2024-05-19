import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Filter} from "../../classes/Filter";

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  constructor(private http: HttpClient) {

  }

  getAllFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>("api/filter/getAllFilters");
  }

  createFilter(newFilter: Filter): Observable<Filter> {
    return this.http.post<Filter>("api/filter/createFilter", newFilter);
  }
}
