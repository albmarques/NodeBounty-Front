import { Link } from 'react-router-dom'
import { List } from 'phosphor-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import Logo from '@assets/logo-preta.svg'
import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <img src={Logo} alt="Logo do Node Bounty" />

        <nav className={styles.nav}>
          <Link to="/">Node Invest +</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Abrir conta</Link>
          <Link to="/">Acesso</Link>

          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger className={styles.hamburguerMenu}>
              <List size={32} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.dropdownMenuContent} sideOffset={4}>
                <DropdownMenu.Item>
                  <Link to="/">Node Invest +</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link to="/">Sobre</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link to="/">Abrir conta</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link to="/">Acesso</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      </div>
    </header>
  )
}