import { useState, useEffect } from 'react'

import { Button } from '@components/Button'
import { CreditCard } from '@components/CreditCard'
import styles from './styles.module.css'

export function CreditCardPage() {
  // const [divs, setDivs] = useState([])
  // const adicionarDiv = () => {
  //   const novaDiv = <div key={divs.length}>Nova Div {divs.length + 1}</div>
  //   setDivs([...divs, novaDiv])
  // }
  const [cartoes, setCartoes] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const consulta = async () => {
      try {
        const resposta = await fetch('http://localhost:8080/api/v1/cartao')
        if (!resposta.ok) {
          throw new Error()
        }
        const dados = await resposta.json() //retorna um array de objetos json
        //carrega os dados na variavel
        setCartoes(dados)
      } catch (error) {
        setErro(error.message)
      }
    }
    consulta()
  }, [])

  return (
    <div className="container">
      <div>
        {cartoes.map((cartao) => (
          <div key={cartao.idCartao}>{CreditCard(cartao)}</div>
        ))}
      </div>
      {erro && (
        <>
          <p>Erro na consulta: {erro} </p>{" "}
        </>
      )}
      {/* <div>
        {divs.map((div, index) => (
          <div key={index}>{CreditCard("")}</div> //implementação
        ))}
      </div> */}
      <div className="row justify-content-center">
        <div className={"col-md-auto" + styles.cartao}>
          <div className={styles.cartao}>
            <Button titulo="Gerar Cartão" tipo="secundario" />
          </div>
        </div>
        <div className="elementos-container"></div>
      </div>
    </div>
  )
}
