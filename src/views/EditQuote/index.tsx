import { useContext } from "react"
import { useParams } from "react-router-dom"
import QuoteContext from "../../contexts/QuoteContext"
import styles from "./styles.module.css"
import Form from "../../components/Form"

export default function EditQuote() {
  const { id } = useParams()
  const { quotes } = useContext(QuoteContext)
  const quote = quotes.find(quote => quote.id === id)

  return (
    <section className={styles.container}>
      <div className={styles.quotes}>
        <div className={styles.title}>
          <h2>Detalhes do Orçamento</h2>
        </div>
        <Form label="update" initialData={quote} />
      </div>
    </section>
  )
}