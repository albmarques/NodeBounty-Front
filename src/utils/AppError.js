// Igual no Spring, aqui eu basicamente crio um erro customizado, chamando o construtor padrão de erro. Assim eu posso gerenciar melhor os diferentes tipos de erro com o axios. Este por exemplo, será usado para detectar erros causados por parte do usuário.

export class AppError {
  constructor(message) {
    this.message = message
  }
}
