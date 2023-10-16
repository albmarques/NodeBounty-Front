import { useState, useEffect } from 'react';
import { Button } from '@components/Button'
import { CreditCard } from '@components/CreditCard'
import styles from './styles.module.css'

export function GerarCartao(onCartaoGerado){
  const url = 'http://localhost:8090/api/v1/cartoes/gerar';
  console.log('Tentando gerar cartão...');
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Se seus dados estiverem no formato JSON
      // Outros cabeçalhos personalizados, se necessário
    },
 // Converte seus dados em formato JSON
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação POST');
    }
    return response.json(); // Converte a resposta em JSON
  })
  .then(data => {
    console.log('Resposta do servidor:', data);
    window.location.reload(false);
  })
  .catch(error => {
    console.error('Erro ao fazer o POST:', error);
  });
}

const handleCartaoGerado = () => {
  // Após gerar um novo cartão, atualize a lista de cartões
  consulta();
};

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
    <button onClick={handleDelete}>Deletar</button>
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
            <DeleteButton id={cartao.idCartao} onDelete={handleDelete} />
          </div>
        ))}
      </div>
      {erro && (
        <p>Erro na consulta: {erro}</p>
      )}

      <div className="row justify-content-center">
        <div className={"col-md-auto" + styles.cartao}>
          <div className={styles.cartao}>
            <Button titulo="Gerar Cartão" onClick={() => GerarCartao(handleCartaoGerado)} tipo="secundario" />
          </div>
        </div>
        <div className="elementos-container"></div>
      </div>
    </div>
  );
}

export default CreditCardPage;
