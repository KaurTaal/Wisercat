import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {CriterionType} from "../model/enums/CriterionType";
import {Condition} from "../model/enums/Condition";
import {CriterionUtils} from "../utils/CriterionUtils";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {Filter} from "../model/Filter";
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

  protected readonly CriterionUtils = CriterionUtils;
  protected readonly criterionType = CriterionType;

  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() closableStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveEvent: EventEmitter<Filter> = new EventEmitter<Filter>();

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


  ngOnInit(): void {
    this.addCriterion();
  }

  handleCancel(): void {
    const isModalVisible = false;
    this.closeEvent.emit(isModalVisible);
  }

  handleSave(): void {
    if (this.filterForm.valid) {
      const newFilter: Filter = {
        filterId: null,
        name: this.filterForm.controls['name'].value,
        criterionDTOList: this.criteriaFormArray.value,
      }
      this.saveEvent.emit(newFilter);
      this.clearFormAndHide();
    } else {
      this.validateControls(this.filterForm);
      this.validateControls(this.criteriaFormArray);
    }
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

  oneValueRequiredValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controlList = this.getControlList(group);

      controlList.forEach((control: AbstractControl<any, any> | null) => this.setValueToNullOnEmpty(control));
      const isValueMissing: boolean = controlList.some((control: { value: null; }): boolean => control?.value !== null);

      if (isValueMissing) {
        return null;
      }
      return {oneValueRequired: true};
    };
  }


  handleTypeChange(index: number): void {
    const criterion = this.criteriaFormArray.at(index);
    const newType: CriterionType = criterion.get('type')!.value;

    ['valueAmount', 'valueTitle', 'valueDate'].forEach(controlName => {
      criterion.get(controlName)!.setValue(null);
    });
    criterion.get('condition')!.setValue(CriterionUtils.getConditionsByType(newType)[0]);
    this.markControlAsPristine(index);
  }

  markControlAsPristine(index: number): void {
    let criterion = this.criteriaFormArray.at(index);
    criterion.markAsPristine();
  }

  getControlStatus(index: number): any {
    const control = this.criteriaFormArray.at(index);
    return control.invalid && control.dirty ? 'error' : '';
  }

  getControlValue(index: number) {
    return this.criteriaFormArray.at(index).get("type")?.value;
  }

  addCriterion(): void {
    this.criteriaFormArray.push(this.createCriteriaForm());
  }

  removeCriterion(index: number): void {
    if (this.criteriaFormArray.length > 1) {
      this.criteriaFormArray.removeAt(index);
    }
  }

  private validateControls(form: FormArray | FormGroup): void {
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    })
  }

  private clearFormAndHide(): void {
    this.criteriaFormArray.clear();
    this.addCriterion();
    this.filterForm.reset();

    this.handleCancel();
  }

  private setValueToNullOnEmpty(valueControl: AbstractControl<any, any> | null): void {
    if (valueControl) {
      const isValueEmpty: boolean | null = valueControl.value === '';
      if (isValueEmpty) {
        valueControl.setValue(null, {emitEvent: false});
      }
    }
  }

  private getControlList(group: AbstractControl): any {
    const valueAmountControl = group.get('valueAmount');
    const valueTitleControl = group.get('valueTitle');
    const valueDateControl = group.get('valueDate');

    return [valueAmountControl, valueTitleControl, valueDateControl];
  }
}
