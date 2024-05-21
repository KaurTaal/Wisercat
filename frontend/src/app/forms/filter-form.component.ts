import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {CriterionType} from "../classes/enums/CriterionType";
import {Condition} from "../classes/enums/Condition";
import {Criterion} from "../classes/Criterion";
import {CriterionUtils} from "../utils/CriterionUtils";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {Filter} from "../classes/Filter";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";

@Component({
  selector: 'wc-filter-form',
  standalone: true,
  imports: [
    NzIconDirective,
    NzButtonComponent,
    NzInputDirective,
    FormsModule,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzInputNumberComponent,
    NzDatePickerComponent,
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    ReactiveFormsModule
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {

  protected readonly CriterionUtils = CriterionUtils;
  protected readonly CritType = CriterionType;

  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() closableStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveEvent: EventEmitter<Filter> = new EventEmitter<Filter>();


  criteriaForm: FormGroup<{
    name: FormControl<string>;
  }> = this.formBuilder.group({
    name: ['', [Validators.required]],
  })

  filter: Filter = new Filter(null, null, []);
  criterionTypeList: CriterionType[] = [CriterionType.AMOUNT, CriterionType.TITLE, CriterionType.DATE];
  criteriaList: Criterion[] = [];
  activeCriterionIndex: number = 0;

  constructor(
              private formBuilder: NonNullableFormBuilder) {
  }


  ngOnInit(): void {
    this.addCriterion();
  }

  handleCancel(): void {
    const isModalVisible = false;
    this.closeEvent.emit(isModalVisible);
  }

  handleSave(): void {
    if (this.criteriaForm.valid) {
      this.filter.name = this.criteriaForm.controls.name.value;
      this.filter.criterionDTOList = this.criteriaList;
      this.saveEvent.emit(this.filter);
    } else {
      Object.values(this.criteriaForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({onlySelf: true});
        }
      })
    }
  }

  handleTypeSelect(selectedType: CriterionType): void {
    this.criteriaList[this.activeCriterionIndex].type = selectedType;
    this.criteriaList[this.activeCriterionIndex].condition = CriterionUtils.getConditionsByType(selectedType)[0];
  }

  handleConditionSelect(selectedCondition: Condition): void {
    this.criteriaList[this.activeCriterionIndex].condition = selectedCondition;
  }

  setActiveCriterionIndex(index: number): void {
    this.activeCriterionIndex = index;
  }

  addCriterion(): void {
    const defaultNewCriterion: Criterion = new Criterion(null, CriterionType.AMOUNT, Condition.EQUAL_TO, null, null, null);
    this.criteriaList.push(defaultNewCriterion);
  }

  removeCriterion(index: number): void {
    if (this.criteriaList.length > 1) {
      this.criteriaList.splice(index, 1);
    }
  }

}
