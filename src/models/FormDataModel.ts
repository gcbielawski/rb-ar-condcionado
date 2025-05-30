import { MaterialField } from "./MaterialField";

export interface FormDataModel {
  name: string;
  address: string;
  date: string;
  clientProvides: string;
  subject: string;
  totalSpent: number;
  laborCost: number;
  totalValue: number;
  materials: MaterialField[];
}
