import { Quote } from "../../models/Quote";

export function generatePdf(quote: Quote) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).api.generatePdf(JSON.stringify(quote));
}
