import { useContext, useEffect } from "react"
import styles from "./styles.module.css"
import { useFieldArray, useForm } from "react-hook-form"
import QuoteContext from "../../contexts/QuoteContext"
import { useNavigate } from "react-router-dom"
import { Quote } from "../../models/Quote"

export default function Form({ label, initialData }: { label: string, initialData?: Quote }) {
  const { register, handleSubmit, watch, control, reset } = useForm<Quote>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials"  
  })
  const clientProvides = watch("clientProvides")

  useEffect(() => {
    if (clientProvides === "yes") {
      remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientProvides])

  useEffect(() => {
    if (label === "update" && initialData) {
      reset(initialData)
    }
  }, [label, initialData, reset])

  const { addQuote, updateQuote, removeQuote } = useContext(QuoteContext)
  const navigate = useNavigate()

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => {
      if (label === "update") {
        updateQuote(data)
        navigate("/")
      } else {
        addQuote(data)
        reset()
      }
    })}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome: </label>
        <input type="text" {...register("name")} id="name" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Endereço: </label>
        <input type="text" {...register("address")} id="address" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Data do serviço: </label>
        <input type="date" {...register("date")} id="date" required />
      </div>
      <div className={styles.formGroup}>
        <label>O cliente fornecerá materiais: </label>

        <label htmlFor="clientProvidesYes">
          <input
            type="radio"
            id="clientProvidesYes"
            {...register("clientProvides")}
            value="yes"
            required
          />
          Sim
        </label>

        <label htmlFor="clientProvidesNo" style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            id="clientProvidesNo"
            {...register("clientProvides")}
            value="no"
            required
          />
          Não
        </label>
      </div>

      {clientProvides === "no" && (
        <div className={styles.materials}>
          <label htmlFor="materials">Materiais: </label>
          { fields.map((item, index) => (
            <div key={item.id}>
              <input type="text" className={styles.materialInput} {...register(`materials.${index}.material`)} required defaultValue={item.material} />
              <button className={styles.btnRemoveMaterial} type="button" onClick={() => remove(index)}>Remover</button>
            </div>
          )) }
          <button 
            type="button" 
            className={styles.btnAddMaterial}
            onClick={() => append({ material: "" })}
          >Adicionar material
          </button>
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="subject">Assunto: </label>
        <input type="text" {...register("subject")} id="subject" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="totalSpent">Valor total gasto: </label>
        <input type="number" {...register("totalSpent")} id="totalSpent" required />

        <label htmlFor="laborCost">Valor de mão de obra: </label>
        <input type="number" {...register("laborCost")} id="laborCost" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="totalValue">Valor total: </label>
        <input type="number" {...register("totalValue")} id="totalValue" required />
      </div>

      <div className={styles.btnForm}>
        <button type="button" className={styles.btnCancel} onClick={() => navigate("/")}>Cancelar</button>
        { label === "update" &&
          <button type="button" className={styles.btnCancel} onClick={() => {
            if (initialData) {
              removeQuote(initialData.id)
              navigate("/")
            }
          }}>Excluir</button>
        }
        <button className={styles.btnSave} type="submit">Salvar</button>
      </div>
    </form>
  )
}