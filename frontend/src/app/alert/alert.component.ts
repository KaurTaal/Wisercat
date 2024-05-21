import {Component} from '@angular/core';
import {AlertBroker} from './alert-broker';
import {NzAlertComponent} from "ng-zorro-antd/alert";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'wc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    NzAlertComponent,
    NzIconDirective
  ],
  standalone: true
})
export class AlertComponent {

  constructor(public alertBroker: AlertBroker,
  ) {
  }

}
