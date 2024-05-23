import {CriterionType} from "./enums/CriterionType";
import {Condition} from "./enums/Condition";

export interface Criterion {
  critId: number | null;
  type: CriterionType;
  condition: Condition;
  valueAmount: number | null;
  valueTitle: string | null;
  valueDate: Date | null;
}
