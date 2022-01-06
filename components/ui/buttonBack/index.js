import { Arrow } from 'components/icons/arrow'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styles from 'styles/Home.module.css'

export function ButtonBack () {
  const router = useRouter()
  const handleClickBackHome = useCallback(() => router.back(), [])

  return (
    <button className={styles.btnArrowBack} onClick={handleClickBackHome}>
      <Arrow />
    </button>
  )
}
