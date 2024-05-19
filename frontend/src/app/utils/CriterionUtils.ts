import {CritType} from "../classes/enums/CritType";
import {Condition} from "../classes/enums/Condition";

export class CriterionUtils {
  static getConditionsByType(type: CritType): string[] {
    switch (type) {
      case CritType.AMOUNT:
        return [
          Condition.GREATER_THAN,
          Condition.LESS_THAN,
          Condition.EQUAL_TO
        ];
      case CritType.TITLE:
        return [
          Condition.CONTAINS,
          Condition.STARTS_WITH,
          Condition.ENDS_WITH
        ];
      case CritType.DATE:
        return [
          Condition.BEFORE,
          Condition.AFTER,
        ];
      default:
        return [];
    }
  }
}
