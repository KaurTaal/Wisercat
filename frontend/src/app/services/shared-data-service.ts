import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SharedDataService {

  showNonModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isNonModalActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setShowNonModal(status: boolean): void {
    this.showNonModal.next(status);
  }

  setIsNonModalActive(status: boolean): void {
    this.isNonModalActive.next(status);
  }

}
