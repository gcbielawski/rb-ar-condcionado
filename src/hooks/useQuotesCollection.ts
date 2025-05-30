import { useEffect, useState } from "react";
import { Quote } from "../models/Quote";
import { FormDataModel } from "../models/FormDataModel";

export default function useQuotesCollection() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (window as any).api.getQuotes();
      setQuotes(result);
    })();
  }, []);

  const addQuote = (quote: FormDataModel) => {
    const id = crypto.randomUUID();
    const newQuote: Quote = {
      id,
      ...quote,
    };

    console.log(newQuote);

    setQuotes((prevQuotes) => {
      const savedQuotes = [newQuote, ...prevQuotes];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).api.insertQuote(JSON.stringify(savedQuotes));
      return savedQuotes;
    });
    // console.log(quotes);
  };

  const updateQuote = (data: Quote) => {
    const index = quotes.findIndex((quote) => quote.id === data.id);

    if (index !== -1) {
      const updatedQuotes = [...quotes];
      updatedQuotes[index] = data;
      setQuotes(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).api.updateQuote(JSON.stringify(updatedQuotes));
        return updatedQuotes;
      });
    }
  };

  const removeQuote = (id: string) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id);
    setQuotes(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).api.removeQuote(JSON.stringify(updatedQuotes));
      return updatedQuotes;
    });
  };

  return { quotes, addQuote, updateQuote, removeQuote };
}
