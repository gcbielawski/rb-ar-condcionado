import Form from "../../components/Form"
import styles from "./styles.module.css"

export default function Quotes() {
  return (
  <section className={styles.container}>
    <div className={styles.quotes}>
      <div className={styles.title}>
        <h2>Detalhes do Orçamento</h2>
      </div>
      <Form label="create" />
    </div>
  </section>
  )
}