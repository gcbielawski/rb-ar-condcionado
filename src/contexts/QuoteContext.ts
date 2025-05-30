import { createContext } from "react";
import { QuoteContextModel } from "../models/QuoteContextModel";

const QuoteContext = createContext<QuoteContextModel>({ quotes: [], addQuote: () => {}, updateQuote: () => {}, removeQuote: () => {} });

export default QuoteContext;
