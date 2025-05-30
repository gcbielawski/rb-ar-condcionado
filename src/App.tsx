import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import useQuotesCollection from "./hooks/useQuotesCollection";
import QuoteContext from "./contexts/QuoteContext";

export default function App() {
  const { quotes, addQuote, updateQuote, removeQuote } = useQuotesCollection()
  return (
    <QuoteContext.Provider value={{ quotes, addQuote, updateQuote, removeQuote }}>
      <RouterProvider router={router} />
    </QuoteContext.Provider>
  )
}