import { Arrow } from 'components/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styles from 'styles/Home.module.css'

export function Nav () {
  const router = useRouter()
  const handleClickBackHome = useCallback(() => router.back(), [])

  return (
    <nav className={styles.nav}>
      <button className={styles.btnArrowBack} onClick={handleClickBackHome}>
        <Arrow />
      </button>
      <Link href="/">
        <a className={styles.homeName}>&#123; rsbmk &#125;</a>
      </Link>
    </nav>
  )
}
