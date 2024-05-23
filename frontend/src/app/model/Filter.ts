import {Criterion} from "./Criterion";

export interface Filter {
  filterId: number | null;
  name: string | null;
  criterionDTOList: Criterion[] | null;
}
