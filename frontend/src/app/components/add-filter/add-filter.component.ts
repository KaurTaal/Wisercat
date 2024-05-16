import {Component} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-add-filter',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective,
  ],
  providers: [NzModalService],
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.css'
})
export class AddFilterComponent {

  isVisible: boolean = false;


  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

}
