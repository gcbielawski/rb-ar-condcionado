import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css"
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Quote } from "../../models/Quote";
import QuoteContext from "../../contexts/QuoteContext";
import { Link } from "react-router-dom";

export default function Home() {
  const next = () => {
    setPage(current => current + cardsPerPage)
    setIndex(current => current + 1)
  }

  const prev = () => {
    setPage(current => current - cardsPerPage)
    setIndex(current => current - 1)
  }

  const { quotes } = useContext(QuoteContext)

  const cardsPerPage = 4

  const lastPage = Math.ceil(quotes.length / cardsPerPage)

  const [visibleCards, setVisibleCards] = useState<Quote[]>(() => {
    return quotes.slice(0, cardsPerPage)
  })

  const [index, setIndex] = useState(1)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setVisibleCards(quotes.slice(page, page + cardsPerPage))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, page])

  return (
    <section className={styles.container}>
      <div className={styles.home}>
        <div className={styles.title}>
          <h2>Agendamentos</h2>
        </div>
        { visibleCards.length > 0 ? (
          <div className={styles.cards}>
            { visibleCards.map(card => (
              <Link key={card.id} to={`quotes/${card.id}/edit`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className={styles.card}>
                  <p>Nome: {card.name}</p>
                  <p>Assunto: {card.subject}</p>
                  <p>Endereço: {card.address}</p>
                  <p>Data: {card.date}</p>
                </div>
              </Link>
            )) }
          </div>
          ) : (<span>Nenhum agendamento cadastrado.</span>)}
        <div className={styles.arrows}>
          { index > 1 ? <GoArrowLeft size={40} color="#000066" style={{ cursor: 'pointer' }} onClick={prev} /> : <span></span> }
          { index < lastPage ? <GoArrowRight size={40} color="#000066" style={{ cursor: 'pointer' }} onClick={next} /> : <span></span> }
        </div>
      </div>
    </section>
  )
}