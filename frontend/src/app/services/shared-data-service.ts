import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Filter} from "../model/Filter";

@Injectable({
  providedIn: 'root'
})

export class SharedDataService {

  showNonModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private filterCreatedSubject: Subject<Filter> = new Subject<Filter>();
  filterCreated$: Observable<Filter> = this.filterCreatedSubject.asObservable();

  setShowNonModal(status: boolean): void {
    this.showNonModal.next(status);
  }

  emitFilterCreated(filter: Filter): void {
    this.filterCreatedSubject.next(filter);
  }
}
