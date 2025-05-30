import { FormDataModel } from "./FormDataModel";
import { Quote } from "./Quote";

export interface QuoteContextModel {
  quotes: Quote[];
  addQuote: (quote: FormDataModel) => void;
  updateQuote: (data: Quote) => void;
  removeQuote: (id: string) => void;
}
