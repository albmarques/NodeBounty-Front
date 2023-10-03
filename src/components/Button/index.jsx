import styles from './styles.module.css'

export function Button({ tipo, titulo, ...rest }) {
  return (
    <button
      className={`${styles.button} ${
        tipo === 'primario' ? styles.buttonPrimary : styles.buttonSecondary
      }`}
      {...rest}
    >
      {titulo}
    </button>
  )
}
