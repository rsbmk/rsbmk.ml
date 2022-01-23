import * as Icon from 'components/icons'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

export function SocialLinks () {
  return (
    <aside className={styles.social}>
      <Link href="https://twitter.com/rsbmk" target="_blank">
        <a target="_blank">
          <Icon.Twitter />
        </a>
      </Link>
      <Link href="https://www.linkedin.com/in/rsbmk/">
        <a target="_blank">
          <Icon.LinkedIn />
        </a>
      </Link>
      <Link href="https://www.instagram.com/rsbmk/">
        <a target="_blank">
          <Icon.Instagram />
        </a>
      </Link>
      <Link href="http://github.com/rsbmk/">
        <a target="_blank">
          <Icon.Github/>
        </a>
      </Link>
    </aside>
  )
}
