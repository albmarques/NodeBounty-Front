import styles from './styles.module.css'

export function Button({type, title, ...rest}) {
  return (
    <button className={
      `${styles.button} ${type === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}`}
      {...rest}
    >
      {title}
    </button>
  )
}
