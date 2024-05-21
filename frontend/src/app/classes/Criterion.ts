import {CriterionType} from "./enums/CriterionType";
import {Condition} from "./enums/Condition";

export class Criterion {

  critId: number | null;
  type: CriterionType;
  condition: Condition;
  valueAmount: number | null;
  valueTitle: string | null;
  valueDate: Date | null;

  constructor(critId: number | null, type: CriterionType, condition: Condition, valueAmount: number | null, valueTitle: string | null, valueDate: Date | null) {
    this.critId = critId;
    this.type = type;
    this.condition = condition;
    this.valueAmount = valueAmount;
    this.valueTitle = valueTitle;
    this.valueDate = valueDate;
  }
}
