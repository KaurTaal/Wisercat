import {Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';
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
import {CritType} from "../classes/enums/CritType";
import {Condition} from "../classes/enums/Condition";
import {Criterion} from "../classes/Criterion";
import {CriterionUtils} from "../utils/CriterionUtils";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {Filter} from "../classes/Filter";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {ResizeUtils} from "../utils/ResizeUtils";

@Component({
  selector: 'app-filter-form',
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
  styleUrl: './filter-form.component.css'
})
export class FilterFormComponent implements OnInit {

  protected readonly CriterionUtils = CriterionUtils;
  protected readonly CritType = CritType;

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
  criterionTypeList: CritType[] = [CritType.AMOUNT, CritType.TITLE, CritType.DATE];
  criteriaList: Criterion[] = [];
  activeCriterionIndex: number = 0;

  maxHeight: number = window.innerHeight * 0.5;
  minHeight: number = window.innerHeight * 0.2;
  currentHeight: number = 200;
  draggingCorner: boolean = false;

  private previousOffsetY: number | null = null;
  isMouseMovingUp: boolean = false;

  constructor(private renderer: Renderer2,
              private formBuilder: NonNullableFormBuilder) {

  }


  ngOnInit(): void {
    this.addCriterion();
    this.updateHeightLimits();
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

  handleTypeSelect(selectedType: CritType): void {
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
    const defaultNewCriterion: Criterion = new Criterion(null, CritType.AMOUNT, Condition.EQUAL_TO, null, null, null);
    this.criteriaList.push(defaultNewCriterion);
  }

  removeCriterion(index: number): void {
    if (this.criteriaList.length > 1) {
      this.criteriaList.splice(index, 1);
    }
  }

  onCornerClick(event: MouseEvent): void {
    this.draggingCorner = true;
    event.preventDefault();
    event.stopPropagation();
  }


  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateHeightLimits();
  }

  updateHeightLimits(): void {
    this.maxHeight = window.innerHeight * 0.5;
    this.minHeight = window.innerHeight * 0.2;
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(): void {
    this.draggingCorner = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent): void {
    if (!this.draggingCorner) {
      this.renderer.setStyle(document.body, 'cursor', 'auto');
      this.closableStatusChange.emit(true);
      return;
    }
    this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
    this.closableStatusChange.emit(false);
    this.setDragDirection(event.clientY);
    this.currentHeight = ResizeUtils.setNewModalHeight(10, this.currentHeight, this.maxHeight, this.minHeight, this.isMouseMovingUp);
  }


  private setDragDirection(offsetY: number): void {
    if (this.previousOffsetY !== null) {
      this.isMouseMovingUp = offsetY < this.previousOffsetY;
    }
    this.previousOffsetY = offsetY;
  }

}
