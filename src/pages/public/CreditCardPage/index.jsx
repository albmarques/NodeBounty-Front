import { useState, useEffect } from 'react';
import { Button } from '@components/Button'
import { CreditCard } from '@components/CreditCard'
import styles from './styles.module.css'

export function GerarCartao(onCartaoGerado) {
  const url = 'http://localhost:8090/api/v1/cartoes/gerar'; // Certifique-se de que esta URL está correta

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        // Se a resposta for bem-sucedida (status 201), não há dados JSON para analisar
        onCartaoGerado(); // Chama a função de callback para indicar que o cartão foi gerado com sucesso
      } else {
        // Se a resposta indicar erro (status 500), você pode lidar com o erro aqui
        console.error('Erro ao fazer o POST:', response.status);
      }
    })
    .catch(error => {
      console.error('Erro ao fazer o POST:', error);
    });
}

function DeleteButton({ id, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:8090/api/v1/cartoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Chama a função onDelete quando a exclusão for bem-sucedida
          onDelete(id);
        } else {
          // Lidar com erros aqui
        }
      })
      .catch((error) => {
        console.error('Erro ao fazer a requisição DELETE:', error);
      });
  };

  return (
    <Button titulo="Excluir cartão" onClick={handleDelete}>Deletar</Button>
  );
}

export function CreditCardPage() {
  const [cartoes, setCartoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const consulta = async () => {
      try {
        const resposta = await fetch('http://localhost:8090/api/v1/cartoes');
        if (!resposta.ok) {
          throw new Error();
        }
        const dados = await resposta.json();
        setCartoes(dados);
      } catch (error) {
        setErro(error.message);
      }
    }
    consulta();
  }, []);

  const handleCartaoGerado = () => {
    // Após gerar um novo cartão, atualize a lista de cartões
    const consulta = async () => {
      try {
        const resposta = await fetch('http://localhost:8090/api/v1/cartoes');
        if (!resposta.ok) {
          throw new Error();
        }
        const dados = await resposta.json();
        setCartoes(dados);
      } catch (error) {
        setErro(error.message);
      }
    }
    consulta();
  };

  const handleDelete = (id) => {
    // Atualiza o estado para remover o cartão com o ID correspondente
    setCartoes((cartoes) => cartoes.filter(cartao => cartao.idCartao !== id));
  };

  return (
    <div className="container">
      <div>
        {cartoes.map((cartao) => (
          <div key={cartao.idCartao}>
            {CreditCard(cartao)}

            <div class="row justify-content-center mt-1">
              <div class="col-2 text-left">
                <DeleteButton id={cartao.idCartao} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {erro && (
        <p>Erro na consulta: {erro}</p>
      )}

      <div className="row justify-content-center mt-2">
        <div className={"col-md-auto" + styles.cartao}>
          <div className={styles.cartao}>
            <Button titulo="Gerar novo cartão" onClick={() => GerarCartao(handleCartaoGerado)} tipo="secundario" />
          </div>
        </div>
        <div className="elementos-container"></div>
      </div>
    </div>
  );
}

export default CreditCardPage;
