import {Criterion} from "./Criterion";

export class Filter {

  filterId: number | null;
  name: string | null;
  criterionDTOList: Criterion[] | null;

  constructor(filterId: number | null, name: string | null, criteria: Criterion[] | null) {
    this.filterId = filterId;
    this.name = name;
    this.criterionDTOList = criteria;
  }
}
