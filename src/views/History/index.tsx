import { useContext, useState } from "react";
import styles from "./styles.module.css"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import QuoteContext from "../../contexts/QuoteContext";
import { generatePdf } from "../../utils/pdf/generatePdf";

export default function History() {
  const [startDate, setStartDate] = useState(() => {
    const storedDate = localStorage.getItem('startDate');
    return storedDate ? new Date(storedDate) : new Date();
  });
  const [endDate, setEndDate] = useState(() => {
    const storedDate = localStorage.getItem('endDate');
    return storedDate ? new Date(storedDate) : new Date();
  });

  const { quotes } = useContext(QuoteContext)

  const toDateOnly = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  const filteredQuotes = quotes.filter(quote => {
    const quoteDate = new Date(quote.date)
    quoteDate.setHours(quoteDate.getHours() + 3)

    const localQuoteDate = toDateOnly(quoteDate)
    const localStartDate = toDateOnly(startDate)
    const localEndDate = toDateOnly(endDate)

    return localQuoteDate >= localStartDate && localQuoteDate <= localEndDate
  })

  const totalLaborCost = filteredQuotes.reduce((accum, quote) => accum + +quote.laborCost, 0)
  const totalSpent = filteredQuotes.reduce((accum, quote) => accum + +quote.totalSpent, 0)

  return (
    <section className={styles.container}>
      <div className={styles.customers}>
        <div className={styles.title}>
          <h2>
              Clientes de{' '}
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setStartDate(() => {
                      localStorage.removeItem('startDate');
                      localStorage.setItem('startDate', date.toISOString());
                      return date
                    });
                  }
                }}
                dateFormat="dd/MM/yyyy"
              />{' '}
              a{' '}
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (date) {
                    setEndDate(() => {
                      localStorage.removeItem('endDate');
                      localStorage.setItem('endDate', date.toISOString());
                      return date
                    });
                  }
                }}
                dateFormat="dd/MM/yyyy"
              />
            </h2>
        </div>
        <div className={styles.cards}>
          { filteredQuotes.length > 0 ? (
            filteredQuotes.map(card => (
              <div className={styles.card} key={card.id}>
                <p>Nome: {card.name}</p>
                <p>Assunto: {card.subject}</p>
                <p>Endereço: {card.address}</p>
                <p>Data: {card.date}</p>
                <button className={styles.btnSave} type="submit" onClick={() => generatePdf(card)}>Gerar PDF</button>
              </div>
            ))
          ) : <p>Nenhum orçamento encontrado no período selecionado.</p> }
          <span style={{ visibility: 'hidden' }}>.</span>
        </div>
      </div>
      <div className={styles.values}>
        <div className={styles.title}>
          <h2>
              Valores de{' '}
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date) {
                    setStartDate(() => {
                      localStorage.removeItem('startDate');
                      localStorage.setItem('startDate', date.toISOString());
                      return date
                    });
                  }
                }}
                dateFormat="dd/MM/yyyy"
              />{' '}
              a{' '}
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  if (date) {
                    setEndDate(() => {
                      localStorage.removeItem('endDate');
                      localStorage.setItem('endDate', date.toISOString());
                      return date
                    });
                  }
                }}
                dateFormat="dd/MM/yyyy"
              />
            </h2>
        </div>
        <div className={styles.informations}>
          <p>Valores do período de {startDate ? startDate.toLocaleDateString('pt-BR') : ''} a {endDate ? endDate.toLocaleDateString('pt-BR') : ''}</p>
          <p>Valor total de mão de obra: R$ {totalLaborCost.toFixed(2)}</p>
          <p>Valor total gasto: R$ {totalSpent.toFixed(2)}</p>
        </div>
      </div>
    </section>
  )
}