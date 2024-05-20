import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {SharedDataService} from "../../services/shared-data-service";
import {FilterFormComponent} from "../../forms/filter-form.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgStyle,
    DashboardComponent,
    NgClass,
    NgIf,
    NzIconDirective,
    FilterFormComponent
  ],
  templateUrl: './side-modal.component.html',
  styleUrl: './side-modal.component.css'
})
export class SideModalComponent implements OnInit {

  modalStyle: string = 'close-modal';

  constructor(
              private sharedDataService: SharedDataService,) {
  }

  ngOnInit(): void {
    this.sharedDataService.showNonModal.subscribe(status => {
      this.modalStyle = status ? 'open-modal' : 'close-modal';
    })
  }

  closeModal(): void {
    this.sharedDataService.setShowNonModal(false);
  }

}
