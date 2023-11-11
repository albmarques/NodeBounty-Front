import axios from 'axios'

import { AppError } from '@utils/AppError'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080',
})

// Interceptando respostas do back-end para verificar se devo jogar um erro customizado (Pois foi erro por parte do usuário) ou um erro padrão do Axios (Pois foi erro do servidor, ou o erro recebido não possui mensagem)
api.registerInterceptTokenManager = (signOut) => {
  api.interceptors.response.use(
    (response) => response, // Nenhum erro na resposta, nada a ser feito,
    async (requestError) => {
      // Verificando se é um erro 403 (Unhautorized). Possível problema com token, deslogar usuário
      if (
        requestError.response?.status === 403 ||
        requestError.response?.data?.message ===
          'Cliente não encontrado no sistema'
      ) {
        signOut()
        return Promise.reject(requestError)
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )
}
