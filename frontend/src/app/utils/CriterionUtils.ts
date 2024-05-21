import {CriterionType} from "../classes/enums/CriterionType";
import {Condition} from "../classes/enums/Condition";

export class CriterionUtils {
  static getConditionsByType(type: CriterionType): string[] {
    switch (type) {
      case CriterionType.AMOUNT:
        return [
          Condition.GREATER_THAN,
          Condition.LESS_THAN,
          Condition.EQUAL_TO
        ];
      case CriterionType.TITLE:
        return [
          Condition.CONTAINS,
          Condition.STARTS_WITH,
          Condition.ENDS_WITH
        ];
      case CriterionType.DATE:
        return [
          Condition.BEFORE,
          Condition.AFTER,
        ];
      default:
        return [];
    }
  }
}
