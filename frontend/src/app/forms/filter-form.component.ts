import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {CriterionType} from "../classes/enums/CriterionType";
import {Condition} from "../classes/enums/Condition";
import {CriterionUtils} from "../utils/CriterionUtils";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {Filter} from "../classes/Filter";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";

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
    ReactiveFormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzTooltipDirective
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {

  @ViewChild('#inputNumberControl') inputNumberControl: any;

  protected readonly CriterionUtils = CriterionUtils;
  protected readonly criterionType = CriterionType;

  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() closableStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveEvent: EventEmitter<Filter> = new EventEmitter<Filter>();

  filter: Filter = new Filter(null, null, []);
  criterionTypeList: CriterionType[] = [CriterionType.AMOUNT, CriterionType.TITLE, CriterionType.DATE];

  criteriaFormArray: FormArray;
  filterForm: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder) {
    this.filterForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      criteriaList: this.formBuilder.array([])
    });

    this.criteriaFormArray = this.filterForm.get('criteriaList') as FormArray;
  }


  createCriteriaForm(): FormGroup {
    return this.formBuilder.group({
      type: [CriterionType.AMOUNT, Validators.required],
      condition: [Condition.EQUAL_TO, Validators.required],
      valueAmount: [null],
      valueTitle: [null],
      valueDate: [null]
    }, {validators: this.oneValueRequiredValidator()});
  }

  // TODO notify user
  oneValueRequiredValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const valueAmount = group.get('valueAmount')?.value;
      const valueTitle = group.get('valueTitle')?.value;
      const valueDate = group.get('valueDate')?.value;

      if (valueAmount !== null || valueTitle !== null || valueDate !== null) {
        return null;
      }
      return {oneValueRequired: true};
    };
  }

  handleTypeChange(index: number): void {
    const criterion = this.criteriaFormArray.at(index);
    const newType: CriterionType = criterion.get('type')!.value;
    criterion.get('valueAmount')!.setValue(null);
    criterion.get('valueTitle')!.setValue(null);
    criterion.get('valueDate')!.setValue(null);
    criterion.get('condition')!.setValue(CriterionUtils.getConditionsByType(newType)[0]);
  }


  ngOnInit(): void {
    this.addCriterion();
  }

  handleCancel(): void {
    const isModalVisible = false;
    this.closeEvent.emit(isModalVisible);
  }

  handleSave(): void {
    if (this.filterForm.valid) {
      this.filter.name = this.filterForm.controls['name'].value;
      this.filter.criterionDTOList = this.criteriaFormArray.value;
    } else {
      Object.values(this.filterForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
    }
  }


  addCriterion(): void {
    this.criteriaFormArray.push(this.createCriteriaForm());
  }

  removeCriterion(index: number): void {
    if (this.criteriaFormArray.length > 1) {
      this.criteriaFormArray.removeAt(index);
    }
  }

}
